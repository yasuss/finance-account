const dbSocketPath = process.env.DB_SOCKET_PATH || "/cloudsql";
const dbSocketAddr = process.env.DB_HOST.split(":");
const host = dbSocketAddr[0];
const port = dbSocketAddr[1];
const cloudHost = `${dbSocketPath}/${process.env.CLOUD_SQL_CONNECTION_NAME}`;

module.exports = {
  development: {
    client: "postgresql",
    connection: {
      host: process.env.DB_HOST ? host : cloudHost,
      port: process.env.DB_HOST ? port : "",
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
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
      host: process.env.DB_HOST ? host : cloudHost,
      port: process.env.DB_HOST ? port : "",
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
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
