exports.up = function (knex) {
  return knex.schema
    .createTable("categories", (t) => {
      t.string("type");
      t.string("name");
      t.integer("category").notNullable();
      t.string("color");
    })
    .then(() => {
      return knex("categories").insert([
        {
          type: "clothes",
          name: "одежда",
          category: 0,
          color: "#75D1E5",
        },
        {
          type: "leisure",
          name: "досуг",
          category: 1,
          color: "#9975E5",
        },
        {
          type: "study",
          name: "учеба",
          category: 2,
          color: "#C768D2",
        },
        {
          type: "home",
          name: "дом",
          category: 3,
          color: "#ff9833",
        },
        {
          type: "presents",
          name: "подарки",
          category: 4,
          color: "#E75258",
        },
        {
          type: "cosmetics",
          name: "косметика",
          category: 5,
          color: "#E57599",
        },
        {
          type: "debt",
          name: "долг",
          category: 6,
          color: "#ef5d28",
        },
        {
          type: "other",
          name: "другое",
          category: 7,
          color: "#1a3177",
        },
        {
          type: "supermarket",
          name: "супермаркет",
          category: 8,
          color: "#99E575",
        },
        {
          type: "restaurant",
          name: "ресторан",
          category: 9,
          color: "#E59975",
        },
        {
          type: "medicine",
          name: "медицина",
          category: 10,
          color: "#7599E5",
        }
      ]);
    });
};

exports.down = function (knex) {
  return knex.schema.dropTable("categories");
};
