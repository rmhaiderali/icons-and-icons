import express from "express";
import router from "../src/server/router.js";

const app = express();

app.use(router);

export default app;
