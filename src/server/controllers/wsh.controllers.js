import Promise from "bluebird";
import date from "date-and-time";
import remote from "../utils/remote.js";
import WSH from "../models/wsh.models.js";
import { format, mergeByProperties } from "../utils/wsh.utils.js";
import { orderSort, millisecondsToNextDay } from "../utils/common.utils.js";
import { order, userAgent, allCountries } from "../constants/wsh.constants.js";
import formatString from "../utils/formatString.js";

async function getItems(start, end) {
  // aggregate alternate => find({}, { projection: { _id: 0, JPG: 0, SVG: 0 } })

  return await WSH.aggregate([
    {
      $match: {
        Date: { $gte: start, $lt: end },
      },
    },
    {
      $project: {
        _id: 0,
        Date: 1,
        IOTD: 1,
        Title: 1,
        Caption: 1,
        Query: 1,
        JPG: 1,
        SVG: 1,
        // Likes: 1,
      },
    },
  ]);
}

async function getYears() {
  const distinctYears = await WSH.aggregate([
    {
      $project: {
        year: { $year: "$Date" },
      },
    },
    {
      $group: {
        _id: null,
        years: { $addToSet: "$year" },
      },
    },
  ]);

  return distinctYears[0]?.years.sort((x, y) => x - y) || [];
}

async function getMonths(start, end) {
  const distinctMonths = await WSH.aggregate([
    {
      $match: {
        Date: { $gte: start, $lt: end },
      },
    },
    {
      $project: {
        month: { $month: "$Date" },
      },
    },
    {
      $group: {
        _id: null,
        months: { $addToSet: "$month" },
      },
    },
  ]);

  return distinctMonths[0]?.months.sort((x, y) => x - y) || [];
}

async function saveItems(items) {
  const itemsCategorised = { new: [], existing: [] };

  for (const item of items) {
    const { Regions } = item;
    delete item.Regions;

    const res = await WSH.updateOne(
      item,
      { $setOnInsert: { Regions } },
      { upsert: true }
    );

    (res.upsertedCount === 1
      ? itemsCategorised.new
      : itemsCategorised.existing
    ).push(item);
  }
  return itemsCategorised;
}

async function main(req, res) {
  if (process.env.WSH_LOG.charAt(0) === "Y") remote(req, 1);

  if (process.env.NODE_ENV === "production") {
    const mstonextdayplus2m = millisecondsToNextDay("Etc/GMT-14", 12e4);

    // res.set(
    //   "Cache-Time-Left",
    //   Math.floor(mstonextdayplus2m / 864e5) +
    //     "d " +
    //     new Date(mstonextdayplus2m).toISOString().substring(11, 19)
    // );

    res.set(
      "Cache-Control",
      "public, max-age=" + mstonextdayplus2m.toString().slice(0, -3)
    );

    // res.set(
    //   "Cache-Control",
    //   "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
    // );
  }

  const isValidMonth = date.isValid(req.params.month ?? "", "M");
  const isValidYear = date.isValid(req.params.year ?? "", "YYYY");

  if (isValidYear) {
    const startYear = new Date(req.params.year, 0);
    const endYear = date.addYears(startYear, 1);

    if (isValidMonth) {
      const startMonth = new Date(req.params.year, req.params.month - 1);
      const endMonth = date.addMonths(startMonth, 1);

      const result = await getItems(startMonth, endMonth);
      if (result.length) return res.send({ type: "items", result });
    }

    const result = await getMonths(startYear, endYear);
    if (result.length) return res.send({ type: "months", result });
  }

  res.send({ type: "years", result: await getYears() });
}

function save(req, res) {
  if (req.headers.authorization !== "Bearer " + process.env.CRON_SECRET)
    return res.send({ response: "unauthorized access" });

  const countries = req.headers.countries
    ? JSON.parse(req.headers.countries)
    : allCountries;

  const requestDate = (
    req.headers.yesterday === "Y" ? new Date(Date.now() - 79200000) : new Date()
  ).toLocaleString("en-PK", { timeZone: "Etc/GMT-14" }); // DD/MM/YYYY

  const concurrency = req.headers.concurrency?.match(/^\d+$/)
    ? +req.headers.concurrency
    : allCountries.length;

  const count = new Proxy([], {
    set: function (target, property, value, receiver) {
      target[property] = value;

      if (property === "length" && target.length === countries.length)
        countComplete();

      return true;
    },
  });

  const countComplete = async () => {
    const orderedArray = orderSort(order, count, "Regions");
    orderedArray.forEach((e) => (e.Regions = [e.Regions]));
    const result = await saveItems(mergeByProperties(orderedArray));
    const msgs = format(result);
    if (process.env.WSH_LOG.charAt(1) === "Y")
      for (const e in msgs) await remote(msgs[e]);
    res.send({ response: msgs.join(" ") });
  };

  const url =
    "https://www.bing.com/DSB?clientDateTime={0}%2F{1}%2F{2}&cc={3}&dsbschemaversion=1.1";

  async function download(day, month, year, country) {
    console.log("start " + country);
    console.time(country);

    const result = await fetch(formatString(url, month, day, year, country), {
      headers: { "User-Agent": userAgent },
    });

    const data = await result.json();
    const cc = data.ContentCollection[0];
    const fs = cc.Data[0].Cards[0].FieldsStore;

    count.push({
      Date: date.parse(cc.Date, "YYYYMMDD", true),
      IOTD: cc.Name.includes("IOTD:"),
      Title: fs.Title,
      Caption: fs.Caption || null,
      Query: fs.ClickThroughUrl.includes("q=")
        ? fs.ClickThroughUrl.split("q=")[1].split("&")[0]
        : fs.ClickThroughUrl,
      JPG: fs.Thumbnail.ThumbnailId.includes("1920x1080.jpg")
        ? fs.Thumbnail.ThumbnailId.slice(4, -14)
        : null,
      SVG: { Light: fs.LightGleamId, Dark: fs.DarkGleamId },
      Regions: country,
    });

    console.timeEnd(country);
  }

  Promise.map(
    countries,
    (country) =>
      download(
        requestDate.slice(0, 2),
        requestDate.slice(3, 5),
        requestDate.slice(6, 10),
        country
      ),
    { concurrency }
  );
}

export { main, save };
