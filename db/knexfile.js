﻿require("dotenv").config();
const dbSocketPath = process.env.DB_SOCKET_PATH || "/cloudsql";
const dbSocketAddr = process.env.DB_HOST
  ? process.env.DB_HOST.split(":")
  : null;
const host = dbSocketAddr && dbSocketAddr[0];
const port = dbSocketAddr && dbSocketAddr[1];
const cloudHost = `${dbSocketPath}/${process.env.CLOUD_SQL_CONNECTION_NAME}`;

module.exports = {
  development: {
    client: "postgres",
    connection: {
      host: 'db',
      database: 'postgres',
      user: 'postgres',
      password: 'postgres',
      timezone: "UTC",
    },
    pool: {
      min: 0,
      max: 5,
      createTimeoutMillis: 3000,
      acquireTimeoutMillis: 30000,
      idleTimeoutMillis: 30000,
      reapIntervalMillis: 1000,
      createRetryIntervalMillis: 100,
      propagateCreateError: false,
    },
    migrations: {
      directory: "../migrations",
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
      min: 0,
      max: 5,
      createTimeoutMillis: 3000,
      acquireTimeoutMillis: 30000,
      idleTimeoutMillis: 30000,
      reapIntervalMillis: 1000,
      createRetryIntervalMillis: 100,
      propagateCreateError: false,
    },
    migrations: {
      directory: "../migrations",
    },
  },
};
