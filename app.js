const viewer = document.querySelector("#componentViewer");
const statusText = document.querySelector("#modelStatus");
const modelSelect = document.querySelector("#modelSelect");

const setStatus = (message, state) => {
  statusText.textContent = message;
  statusText.classList.remove("is-ready", "is-warning");

  if (state) {
    statusText.classList.add(state);
  }
};

viewer.addEventListener("load", () => {
  setStatus("Model ready.", "is-ready");
});

viewer.addEventListener("error", () => {
  setStatus("Model load failed.", "is-warning");
});

viewer.addEventListener("ar-status", (event) => {
  if (event.detail.status === "session-started") {
    setStatus("AR session active.", "is-ready");
  }

  if (event.detail.status === "failed") {
    setStatus("AR is not available on this device or browser.", "is-warning");
  }
});

modelSelect.addEventListener("change", () => {
  viewer.src = modelSelect.value;
  setStatus(`Loading: ${modelSelect.options[modelSelect.selectedIndex].text}`);
});
