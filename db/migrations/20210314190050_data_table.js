exports.up = function (knex) {
  return knex.schema.createTable("data", (t) => {
    t.increments("id").unsigned().primary().notNullable();
    t.integer("summ");
    t.timestamp("date", { useTz: true });
    t.string("comment");
    t.integer("category").notNullable();
    t.uuid("user_uuid").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("data");
};
