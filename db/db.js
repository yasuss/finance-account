const knex = require("knex");
const knexfile = require("./knexfile");

const createTcpPool = config => {
  const dbSocketAddr = process.env.DB_HOST.split(':');
  console.log('dbSocketAddr', dbSocketAddr);
  console.log('process', process.env);
  return knex({
    client: 'postgresql',
    connection: {
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      host: dbSocketAddr[0],
      port: dbSocketAddr[1],
    },
    ...config,
  });
};

const createUnixSocketPool = config => {
  const dbSocketPath = process.env.DB_SOCKET_PATH || '/cloudsql';

  return knex({
    client: 'postgresql',
    connection: {
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD, 
      database: process.env.DB_NAME || "finance-data",
      host: `${dbSocketPath}/${process.env.CLOUD_SQL_CONNECTION_NAME}`,
    },
    ...config,
  });
};

const createPool = () => {
  const config = {pool: {}};
  config.pool.max = 5;
  config.pool.min = 5;
  config.pool.acquireTimeoutMillis = 60000;
  config.createTimeoutMillis = 30000;
  config.idleTimeoutMillis = 600000;
  config.createRetryIntervalMillis = 200;

  if (process.env.DB_HOST) {
    return createTcpPool(config);
  } else {
    return createUnixSocketPool(config);
  }
};

const db = createPool();
module.exports = db;
