"use strict";
import "dotenv/config.js";
import "./utils/ensureEnv.js";
import "./utils/cronJobs.js";
import "./config/database.js";

import express from "express";
import TBLRoutes from "./routes/tbl.routes.js";
import THFRoutes from "./routes/thf.routes.js";
import WSHRoutes from "./routes/wsh.routes.js";

const app = express.Router();

app.use(express.json());

app.use("/api/v1/tbl", TBLRoutes);
app.use("/api/v1/thf", THFRoutes);
app.use("/api/v1/wsh", WSHRoutes);

export default app;
