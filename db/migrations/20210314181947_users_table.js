
exports.up = function(knex) {
  return knex.schema.createTable('users', (t) => {
    t.increments('id').unsigned().primary().notNullable();
    t.string("username").notNullable();
    t.string("password").notNullable();
    t.uuid("uuid").notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
