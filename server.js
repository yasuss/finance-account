require("dotenv").config();
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const { v4: uuidv4 } = require("uuid");
const { secret } = require("./config");
const authMiddleware = require("./middleware/authMiddleware");

const db = require("./db/db");

const app = express();
const port = process.env.PORT || 5000;

const generateAccessToken = (id, username) => {
  const payload = { id, username };
  return jwt.sign(payload, secret, { expiresIn: "24h" });
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: secret,
  })
);

app.post(
  "/signup",
  [
    check("username", "Имя пользователя не может быть пустым").notEmpty(),
    check(
      "password",
      "Пароль должен быть длиннее 4 и меньше 10 символов"
    ).isLength({ min: 4, max: 10 }),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: "Ошибка при регистрации" });
    }

    const { username, password } = req.body;

    const user = db("users")
      .where("username", username)
      .then((rows) => {
        if (rows.length === 0) {
          const hashPassword = bcrypt.hashSync(password, 7);
          const userUuid = uuidv4();
          return db("users")
            .insert({
              username,
              password: hashPassword,
              uuid: userUuid,
            })
            .then((resp) => ({ uuid: userUuid, username }));
        } else {
          return res
            .status(400)
            .json({ message: "Пользователь с таким именем уже существует" });
        }
      });

    user
      .then((result) => {
        const { uuid, username } = result;
        const token = generateAccessToken(uuid, username);

        req.jwt = token;
        req.session = req.session ? req.session : {};
        req.session.jwt = token;

        res.json({ uuid, message: "Пользователь успешно зарегестрирован" });
      })
      .catch((error) => {
        res.status(500);
      });
  }
);

app.post("/signin", (req, res) => {
  const { username, password } = req.body;
  console.log("{ username, password }", { username, password });

  const user = db("users").where("username", username).select();

  user
    .then((result) => {
      const findUser = result[0];

      if (result.length === 0) {
        return res
          .status(400)
          .json({ message: `Пользователь ${username} не найден` });
      }

      const {
        username: selectUsername,
        password: hashPassword,
        uuid,
      } = findUser;

      const validPassword = bcrypt.compareSync(password, hashPassword);
      if (!validPassword) {
        return res.status(400).json({ message: "Введен неверный пароль" });
      }

      const token = generateAccessToken(uuid, selectUsername);
      req.jwt = token;
      req.session = req.session ? req.session : {};
      req.session.jwt = token;

      return res.json({ token, uuid, selectUsername });
    })
    .catch((error) => {
      console.log('error', error);
      res.status(401).json({ message: error });
    });
});

app.get("/users", authMiddleware, (req, res) => {
  const user = req.user;
  const users = db("users").select();

  users.then((result) => res.json(result));
});

app.post("/data", authMiddleware, (req, res) => {
  const { uuid, startDate, endDate } = req.body;
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const data = db.raw(
    `SELECT id, summ, comment, category, date AT TIME ZONE '${timeZone}' AS date, (select C.color from categories C where C.category = D.category) as color, (select C.name from categories C where C.category = D.category) as label from data D where user_uuid = '${uuid}' and date between '${startDate}' and '${endDate}' order by date desc;`
  );

  data
    .then((result) => {
      const data = result.rows;
      res.send({ message: "Данные получены", data });
    })
    .catch((error) => {
      res
        .status(500)
        .json({ message: "Произошла ошибка при получении данных" });
    });
});

app.post("/dataByCategory", authMiddleware, (req, res) => {
  const { uuid, startDate, endDate } = req.body;

  const data = db.raw(
    `select category, sum(summ) as summ, (select C.name from categories C where C.category = D.category) as label, (select C.color from categories C where C.category = D.category) as color from data D where user_uuid = '${uuid}' and date between '${startDate}' and '${endDate}' group by category`
  );

  data
    .then((result) => {
      const data = result.rows;
      res.send({ message: "get data", data });
    })
    .catch((error) => res.status(500));
});

app.post("/addItem", (req, res) => {
  const { summ, date, comment, category, uuid: user_uuid } = req.body;
  const data = db("data").insert({
    summ,
    date,
    comment,
    category,
    user_uuid,
  });
  data
    .then((result) => {
      res.send({ message: "OK", data: result });
    })
    .catch((error) => res.sendStatus(500));
});

app.post("/editItem", (req, res) => {
  const { summ, date, comment, category, id, uuid: user_uuid } = req.body;
  const data = db("data")
    .where("id", "=", Number(id))
    .update({ summ, date, comment, category, user_uuid });
  data
    .then((result) => {
      res.send({ message: "OK", data: result });
    })
    .catch((error) => {
      res.sendStatus(500);
    });
});

app.get("/categories", (req, res) => {
  const data = db.select().from("categories");
  data
    .then((result) => {
      res.send({ message: "get data", data: result });
    })
    .catch((error) => res.sendStatus(500));
});

app.post("/deleteItem", (req, res) => {
  const { id } = req.body;
  const data = db("data").where("id", id).del();
  data
    .then((resp) => {
      res.send({ message: "delete item" });
    })
    .catch((error) => res.sendStatus(500));
});

app.listen(port, () => console.log(`Listening on port ${port}`));

