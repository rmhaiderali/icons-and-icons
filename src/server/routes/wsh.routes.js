import express from "express";
import { main, save } from "../controllers/wsh.controllers.js";

const router = express.Router();

router.get("/:year?/:month?", main);
router.post("/save", save);

export default router;
