const config = {
  appConfig: {
    port: process.env.APP_PORT,
  },
  dbConfig: {
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    authentication: process.env.DB_AUTHENTICATION,
    dbname: process.env.DB_NAME,
  },
};

module.exports = config;
