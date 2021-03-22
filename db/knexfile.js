module.exports = {
  development: {
    client: "postgresql",
    connection: {
      database: "finance-data",
      user: "postgres",
      password: "financeAccess",
      timezone: "UTC",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: "./migrations",
    },
  },
  production: {
    client: "postgresql",
    connection: {
      database: "finance-data",
      user: "postgres",
      password: "financeAccess",
      timezone: "UTC",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: "./migrations",
    },
  },
};
