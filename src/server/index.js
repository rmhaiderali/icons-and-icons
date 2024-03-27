import express from "express";
import app from "./app.js";
import getViteConfig from "./utils/getViteConfig.js";
import { expressMiddleware as multipageFallback } from "multipage-fallback";

const server = express();

server.use(app, express.static("dist"), multipageFallback());

const viteConfig = await getViteConfig();
const PORT = process.env.PORT || viteConfig.server.port;

server.listen(PORT, () =>
  console.log("server started: http://localhost:" + PORT)
);
