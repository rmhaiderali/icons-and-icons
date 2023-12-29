import { DateTime } from "luxon";

function millisecondsToNextDay(tz, offsetms = 0) {
  const now = DateTime.now().setZone(tz).plus({ milliseconds: -offsetms });
  const tomorrow = now.plus({ days: 1 }).startOf("day");
  return tomorrow.diff(now).as("milliseconds");
}

function orderSort(order, array, property) {
  return array.sort((a, b) =>
    order.includes(a[property], b[property])
      ? order.indexOf(b[property]) - order.indexOf(a[property])
      : 1
  );
}

export { millisecondsToNextDay, orderSort };
