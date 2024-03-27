export default function (file) {
  const reader = new FileReader();
  reader.readAsText(file, "utf-8");
  return new Promise(
    (resolve) => (reader.onload = (e) => resolve(e.target.result))
  );
}
