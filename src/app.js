import express from "express";
import cors from "cors";
import routes from "./routes/routing.js";
import errorHandler from "./middleware/errorHandler.js";
import swaggerUi from "swagger-ui-express";
import YAML from "yaml";
import fs from "fs";

const app = express();

const swaggerFile = fs.readFileSync("swagger.yml", "utf8");

const swaggerDoc = YAML.parse(swaggerFile);

app.use(cors());
app.use(express.json());

app.use("/api", routes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} not found`,
  });
});


app.use(errorHandler);

export default app;
