module.exports = {
  development: {
    client: "postgresql",
    connection: {
      database: "postgres",
      user: "postgres",
      password: process.env.financeAccess,
      timezone: "UTC",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};
