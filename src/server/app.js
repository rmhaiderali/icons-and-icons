import express from "express";
import router from "./router.js";
import { expressMiddleware as multipageFallback } from "multipage-fallback";

const app = express();

app.use(router, express.static("dist"), multipageFallback());

export default app;
