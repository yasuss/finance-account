module.exports = {
  development: {
    client: "postgresql",
    connection: {
      host: process.env.DB_HOST || '127.0.0.1',
      database: process.env.DB_NAME || "finance-data",
      user: process.env.DB_USER || "postgres",
      password: process.env.DB_PASSWORD || "financeAccess",
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
      host: process.env.DB_HOST || '34.70.116.130',
      database: process.env.DB_NAME || "finance-data",
      user: process.env.DB_USER || "postgres",
      password: process.env.DB_PASSWORD || "financeAccess",
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
