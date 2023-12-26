import express from "express";
import { main, save } from "../controllers/tbf.controllers.js";

const router = express.Router();

router.get("/:year?/:month?", main);
router.post("/save", save);

export default router;
