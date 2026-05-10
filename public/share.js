const copyButton = document.querySelector("[data-copy-link]");
const copyStatus = document.querySelector("[data-copy-status]");

copyButton?.addEventListener("click", async () => {
  const link = copyButton.getAttribute("data-copy-link");
  if (!link) return;

  try {
    await navigator.clipboard.writeText(link);
    if (copyStatus) copyStatus.textContent = "Enlace copiado.";
  } catch {
    if (copyStatus) copyStatus.textContent = "No se pudo copiar el enlace automáticamente.";
  }
});
