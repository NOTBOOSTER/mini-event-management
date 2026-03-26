import initDb from "./src/db/initDb.js";
import { PORT } from "./src/config/envLoader.js";
import Logger from "./src/utils/logger.js";
import app from "./src/app.js";

const logger = new Logger("Server");

try {
  await initDb();
} catch (error) {
  logger.error(`Failed to initialize database: ${error.message}`);
  process.exit(1);
}

app
  .listen(PORT, () => {
    logger.success(`Server is running on port ${PORT}`);
  })
  .on("error", (err) => {
    logger.error(`Failed to start server: ${err.message}`);
    process.exit(1);
  });
