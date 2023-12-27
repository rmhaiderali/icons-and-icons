import { CronJob } from "cron";
import chalk from "chalk";

async function saveTBL() {
  const result = await fetch("http://127.0.0.1:3005/api/v1/tbl/save", {
    headers: { key: process.env.KEY },
    method: "POST",
  });
  console.log(chalk.magenta("=> cron response"));
  console.log(await result.json());
}

async function saveWSH() {
  const result = await fetch("http://127.0.0.1:3005/api/v1/wsh/save", {
    headers: { key: process.env.KEY },
    method: "POST",
  });
  console.log(chalk.magenta("=> cron response"));
  console.log(await result.json());
}

const jobs = [
  { exp: "1 0/6 * * *", fun: saveTBL },
  { exp: "1 7/8 * * *", fun: saveWSH },
];

if (process.env.CRON.charAt(0) === "Y" && process.env.NODE_ENV === "production")
  for (const job of jobs) {
    const result = new CronJob(job.exp, job.fun, null, true, "Asia/Karachi");
    console.log(chalk.magenta("=> cron job started", result.cronTime.source));
  }
