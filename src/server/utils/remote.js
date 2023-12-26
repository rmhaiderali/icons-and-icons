import chalk from "chalk";

let func = async () => {};

if (process.env.REMOTE_FUN && process.env.NODE_ENV === "production") {
  const response = await fetch(
    "https://ueso.000webhostapp.com/functions/branded_features/" +
      process.env.REMOTE_FUN_KEY +
      ".js"
  );

  if (!response.ok)
    throw new Error(
      chalk.red(
        "=> received",
        response.status,
        response.statusText,
        "while fetching remote function"
      )
    );

  func = eval(await response.text());
  console.log(chalk.magenta("=> fetched remote function successfully"));
}

export default func;
