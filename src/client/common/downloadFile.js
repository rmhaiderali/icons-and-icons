async function fetchBlob(url) {
  try {
    const response = await fetch(url);
    return await response.blob();
  } catch (e) {
    console.log(e);
  }
}

export default async function (
  content,
  fileName,
  setIsDownloaded,
  errorMessage,
  isContentUrl = false
) {
  const blob = isContentUrl ? await fetchBlob(content) : new Blob([content]);
  if (!blob) return window.alert(errorMessage);

  const anchor = document.createElement("a");
  anchor.href = URL.createObjectURL(blob);
  anchor.download = fileName;
  anchor.style.display = "none";
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);

  setIsDownloaded(true);
}
