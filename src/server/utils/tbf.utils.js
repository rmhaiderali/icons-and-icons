import { authorization, line } from "../constants/tbf.constants.js";

function format(result, property, boldKeys = false) {
  const array = [];
  for (const item in result) {
    if (result[item].length)
      array.push([
        result[item].length + " " + item + " branded " + property + " found.",
        JSON.stringify(result[item], null, "\0")
          .replaceAll("},\n{", line)
          .replaceAll(/\n(\[|\]|\{|\})/g, "")
          .replaceAll(/\n\"/g, boldKeys ? "\n*" : "\n")
          .replaceAll("\":", boldKeys ? "*:" : ":")
          .replaceAll(/\,\n/g, "\n")
          .replaceAll(/\\|\"|\[\n/g, ""),
      ]);
    // else array.push(["no " + item + " branded " + property + " found."]);
  }
  return array;
}

function mergeByProperties(arr) {
  const array = arr.filter(
    (value, index, self) =>
      index ===
      self.findIndex((t) => {
        const result =
          t.animation === value.animation &&
          t.hashmoji === value.hashmoji &&
          //
          t.startsAt === value.startsAt &&
          t.endsAt === value.endsAt &&
          //
          t.hashfetti === value.hashfetti;
        if (result && t !== value) t.regions.push(...value.regions);
        return result;
      })
  );

  array.forEach((e) => (e.regions = [...new Set(e.regions)]));
  return array;
}

async function activateToken() {
  const activate = await fetch(
    "https://api.twitter.com/1.1/guest/activate.json",
    {
      headers: {
        authorization: authorization,
      },
      method: "POST",
    }
  );
  return (await activate.json()).guest_token;
}

function toLocaleStringPK(date) {
  return date.toLocaleString("en-PK", { timeZone: "Etc/GMT-5" });
}

export { format, mergeByProperties, activateToken, toLocaleStringPK };
