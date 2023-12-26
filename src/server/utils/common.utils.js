function changeTimezone(date, ianatz) {
  const invdate = new Date(date.toLocaleString("en-US", { timeZone: ianatz }));
  // two min behind actual time
  const diff = date.getTime() - (invdate.getTime() - 120000);
  return new Date(date.getTime() - diff);
}

function millisecondsToNextMidnight(tz) {
  const now = changeTimezone(new Date(), tz),
    then = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
  // milliseconds left = 86400000 - difference
  return 86400000 - (now.getTime() - then.getTime());
}

function orderSort(order, array, property) {
  return array.sort((a, b) =>
    order.includes(a[property], b[property])
      ? order.indexOf(b[property]) - order.indexOf(a[property])
      : 1
  );
}

export { millisecondsToNextMidnight, orderSort };
