import date from "date-and-time";
import {
  format,
  activateToken,
  toLocaleStringPK,
  mergeByProperties,
} from "../utils/tbf.utils.js";
import {
  orderSort,
  millisecondsToNextMidnight,
} from "../utils/common.utils.js";
import proxies from "../utils/proxies.js";
import remote from "../utils/remote.js";
import TBL from "../models/tbl.models.js";
import THF from "../models/thf.models.js";
import { regions, order, line } from "../constants/tbf.constants.js";

const models = { TBL, THF };

async function getItems(model, start, end) {
  // aggregate alternate => find({}, { projection: { _id: 0, JPG: 0, Dark: 0 } })

  return await models[model].aggregate([
    {
      $match: {
        startsAt: { $gte: start, $lt: end },
      },
    },
    {
      $project: {
        _id: 0,
        type: 1,
        animation: 1,
        pausesAt: 1,
        // hashmoji: 1,
        hashfetti: 1,
        startsAt: 1,
        endsAt: 1,
        hashtags: 1,
      },
    },
  ]);
}

async function getYears(model) {
  const distinctYears = await models[model].aggregate([
    {
      $project: {
        year: { $year: "$startsAt" },
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

async function getMonths(model, start, end) {
  const distinctMonths = await models[model].aggregate([
    {
      $match: {
        startsAt: { $gte: start, $lt: end },
      },
    },
    {
      $project: {
        month: { $month: "$startsAt" },
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
    const { model, regions } = item;
    delete item.model;
    delete item.regions;

    let insert, afterInsert;

    if (model == "TBL") {
      insert = { ...item, animation: item.animation.slice(32) };
      afterInsert = { regions, pausesAt: 20 };
    }
    if (model == "THF") {
      insert = { ...item, hashfetti: item.hashfetti.slice(32) };
      afterInsert = { regions };
    }

    const res = await models[model].updateOne(
      insert,
      { $setOnInsert: afterInsert },
      { upsert: true }
    );

    (res.upsertedCount == 1
      ? itemsCategorised.new
      : itemsCategorised.existing
    ).push({
      ...item,
      hashtags: JSON.stringify(item.hashtags),
      regions: JSON.stringify(regions),
      startsAt: toLocaleStringPK(new Date(item.startsAt)),
      endsAt: toLocaleStringPK(new Date(item.endsAt)),
    });
  }
  return itemsCategorised;
}

async function main(req, res) {
  if (process.env.TBF_LOG.charAt(0) === "Y") remote(req, 1);

  if (process.env.NODE_ENV === "production") {
    // res.set(
    //   "Cache-Time-Left",
    //   new Date(millisecondsToNextMidnight("Etc/GMT+0"))
    //     .toISOString()
    //     .substring(11, 19)
    // );

    res.set(
      "Cache-Control",
      "public, max-age=" +
        millisecondsToNextMidnight("Etc/GMT+0").toString().slice(0, -3)
    );

    // res.set(
    //   "Cache-Control",
    //   "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
    // );
  }

  const model = req.originalUrl.split("/")[3].toUpperCase();
  const isValidMonth = date.isValid(req.params.month ?? "", "M");
  const isValidYear = date.isValid(req.params.year ?? "", "YYYY");

  if (isValidYear) {
    const startYear = new Date(req.params.year, 0);
    const endYear = date.addYears(startYear, 1);

    if (model === "TBL") {
      const result = await getItems(model, startYear, endYear);
      if (result.length) return res.send({ type: "items", result });
    }

    if (isValidMonth) {
      const startMonth = new Date(req.params.year, req.params.month - 1);
      const endMonth = date.addMonths(startMonth, 1);

      const result = await getItems(model, startMonth, endMonth);
      if (result.length) return res.send({ type: "items", result });
    }

    const result = await getMonths(model, startYear, endYear);
    if (result.length) return res.send({ type: "months", result });
  }

  res.send({ type: "years", result: await getYears(model) });
}

async function save(req, res) {
  if (req.headers.key !== process.env.KEY) {
    return res.send({ resonse: "unauthorized access" });
  }

  const token = await activateToken();

  const count = new Proxy([], {
    set: function (target, property, value, receiver) {
      target[property] = value;

      if (property === "length" && target.length === regions.length) {
        countComplete();
      }

      return true;
    },
  });

  const countComplete = async () => {
    const arraysOfItems = { likes: [], hashfettis: [] };

    const orderedArray = orderSort(order, count, "0");

    orderedArray.forEach((a) => {
      a[1].forEach((b) => {
        b.animations?.forEach((animation) =>
          arraysOfItems.likes.push({
            model: "TBL",
            animation: animation.asset_url,
            hashmoji: b.asset_url ? b.asset_url : null,
            hashtags: [b.hashtag],
            startsAt: b.starting_timestamp_ms,
            endsAt: b.ending_timestamp_ms,
            regions: [a[0]],
          })
        );
        if (b.is_hashfetti_enabled == true)
          arraysOfItems.hashfettis.push({
            model: "THF",
            hashfetti: b.asset_url,
            hashtags: [b.hashtag],
            startsAt: b.starting_timestamp_ms,
            endsAt: b.ending_timestamp_ms,
            regions: [a[0]],
          });
      });
    });

    const msgs = [];
    for (const [type, items] of Object.entries(arraysOfItems)) {
      if (items.length) {
        //
        const result = await saveItems(mergeByProperties(items));
        msgs.push(...format(result, type));
        //
      } else msgs.push(["no branded " + property + " found."]);
    }
    if (process.env.TBF_LOG.charAt(1) === "Y")
      for (const e in msgs) await remote(msgs[e].join("\n" + line + "\n"));
    res.send({ resonse: msgs.map((e) => e[0]).join(" ") });
  };

  regions.forEach((region) => {
    const fun = proxies[region.service];
    const started = Date.now();
    fun(token, region).then((result) => {
      count.push([region.location, result]);

      const service = region.service + " (" + region.location + "): ";
      console.log(service + (Date.now() - started) / 1000);
    });
  });
}

export { main, save };
