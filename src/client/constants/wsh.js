export const wallpaperSize =
  localStorage.getItem("wallpaperSize") ||
  navigator.userAgent.match(/(Android|iPhone)/)
    ? "1080x1920"
    : "1920x1080";
