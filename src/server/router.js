"use strict";
import "dotenv/config.js";
import "./utils/ensureEnv.js";
import "./utils/cronJobs.js";
import "./config/database.js";

import express from "express";
import TBLRoutes from "./routes/tbl.routes.js";
import THFRoutes from "./routes/thf.routes.js";
import WSHRoutes from "./routes/wsh.routes.js";

const router = express.Router();

router.use(express.json());

router.use("/api/v1/tbl", TBLRoutes);
router.use("/api/v1/thf", THFRoutes);
router.use("/api/v1/wsh", WSHRoutes);

export default router;
