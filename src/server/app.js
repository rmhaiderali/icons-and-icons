import express from "express";
import TBLRoutes from "./routes/tbl.routes.js";
import THFRoutes from "./routes/thf.routes.js";
import WSHRoutes from "./routes/wsh.routes.js";

const app = express();

app.use(express.json());

app.use("/api/v1/tbl", TBLRoutes);
app.use("/api/v1/thf", THFRoutes);
app.use("/api/v1/wsh", WSHRoutes);

export default app;
