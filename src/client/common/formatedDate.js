import date from "date-and-time";
const format = date.format;

export default function (start, end) {
  //
  start = new Date(start ?? 0);
  end = new Date(end ?? 0);
  //
  if (format(start, "YYYY") !== format(end, "YYYY"))
    return format(start, "D MMM YYYY") + " to " + format(end, "D MMM YYYY");
  //
  else if (format(start, "MMM") !== format(end, "MMM"))
    return format(start, "D MMM") + " to " + format(end, "D MMM YYYY");
  //
  else if (+format(start, "D") + 1 === +format(end, "D"))
    return format(start, "D") + " & " + format(end, "D MMM YYYY");
  //
  else if (format(start, "D") !== format(end, "D"))
    return format(start, "D") + " to " + format(end, "D MMM YYYY");
  //
  else return format(start, "D MMM YYYY");
}
