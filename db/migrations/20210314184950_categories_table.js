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
          name: "clothes",
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
          name: "study",
          category: 2,
          color: "#C768D2",
        },
        {
          type: "home",
          name: "home",
          category: 3,
          color: "#ff9833",
        },
        {
          type: "presents",
          name: "presents",
          category: 4,
          color: "#E75258",
        },
        {
          type: "cosmetics",
          name: "cosmetics",
          category: 5,
          color: "#E57599",
        },
        {
          type: "debt",
          name: "debt",
          category: 6,
          color: "#ef5d28",
        },
        {
          type: "other",
          name: "other",
          category: 7,
          color: "#1a3177",
        },
        {
          type: "supermarket",
          name: "supermarket",
          category: 8,
          color: "#99E575",
        },
        {
          type: "restaurant",
          name: "restaurant",
          category: 9,
          color: "#E59975",
        },
        {
          type: "medicine",
          name: "medicine",
          category: 10,
          color: "#7599E5",
        }
      ]);
    });
};

exports.down = function (knex) {
  return knex.schema.dropTable("categories");
};
