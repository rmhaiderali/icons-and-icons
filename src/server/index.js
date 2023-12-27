import "dotenv/config.js";
import "./utils/ensureEnv.js";
import "./config/database.js";
import "./utils/cronJobs.js";
import ViteExpress from "vite-express";
import app from "./app.js";

app.use(ViteExpress.static());

const PORT = process.env.PORT || 3005;

const server = app.listen(PORT, () =>
  console.log("server listening on port " + PORT)
);

ViteExpress.bind(app, server);
