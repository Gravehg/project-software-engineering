require("dotenv").config();
const { appConfig, dbConfig } = require("./config");
const connectDb = require("./db/mongodb");

const app = require("./app");

async function initApp(appConfig, dbConfig) {
  try {
    await connectDb(dbConfig);
    app.listen(appConfig.port, () =>
      console.log(`listening on ${appConfig.port} `)
    );
  } catch (e) {
    console.error(e);
    process.exit(0);
  }
}

initApp(appConfig, dbConfig);
