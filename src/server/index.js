import app from "./app.js";
import getViteConfig from "./utils/getViteConfig.js";

const viteConfig = await getViteConfig();
const PORT = process.env.PORT || viteConfig.server.port;

app.listen(PORT, () => console.log("server started: http://localhost:" + PORT));
