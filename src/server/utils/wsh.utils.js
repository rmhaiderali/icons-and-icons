function format(result) {
  const array = [];
  for (const item in result) {
    if (result[item].length)
      array.push(
        result[item].length + " " + item + " search highlights found."
      );
    // else array.push("no " + item + " search highlights found.");
  }
  return array;
}

function mergeByProperties(arr) {
  const array = arr.filter(
    (value, index, self) =>
      index ===
      self.findIndex((t) => {
        const result = t.Light === value.Light && t.Dark === value.Dark;
        if (result && t !== value) t.Regions.push(...value.Regions);
        return result;
      })
  );
  array.forEach(
    (e) =>
      (e.Regions = e.Regions.length < 200 ? [...new Set(e.Regions)] : ["ROW"])
  );
  return array;
}

export { format, mergeByProperties };
