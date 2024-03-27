export default (target) =>
  typeof target === "string" ? '"' + target + '"' : target;
