import chalk from "chalk";
const envs = [
  "KEY",
  "CRON", // Y/N
  "WSH_LOG", // Y/N [0: "items request" 1: "save request"]
  "TBF_LOG", // Y/N [0: "items request" 1: "save request"]
  "REMOTE_FUN", // Y/N
  "REMOTE_FUN_KEY",
  "TBF_DIGITALOCEAN_US_NYC1",
  "TBF_DIGITALOCEAN_UK_LON1",
  "TBF_AMAZON_AP_NORTHEAST_1",
  "TBF_AMAZON_SA_EAST_1",
  "TBF_PROXY",
];

for (const env of envs) {
  if (!process.env.hasOwnProperty(env)) {
    const message = "Add \"" + env + "\" in .env before starting server.";
    throw new Error(chalk.red(message));
  }
}
