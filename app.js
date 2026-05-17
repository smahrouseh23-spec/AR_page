const viewer = document.querySelector("#componentViewer");
const statusText = document.querySelector("#modelStatus");
const progressBar = document.querySelector(".model-progress-bar");
const modelSelect = document.querySelector("#modelSelect");

const setStatus = (message, state) => {
  statusText.textContent = message;
  statusText.classList.remove("is-ready", "is-warning");

  if (state) {
    statusText.classList.add(state);
  }
};

viewer.addEventListener("progress", (event) => {
  const progress = event.detail.totalProgress || 0;
  progressBar.style.width = `${Math.round(progress * 100)}%`;
});

viewer.addEventListener("load", () => {
  progressBar.style.width = "100%";
  setStatus("Model loaded. Rotate, zoom, or launch AR on a supported device.", "is-ready");
});

viewer.addEventListener("error", () => {
  setStatus("The selected Kontron model could not be loaded.", "is-warning");
});

viewer.addEventListener("ar-status", (event) => {
  if (event.detail.status === "session-started") {
    setStatus("AR session started.", "is-ready");
  }

  if (event.detail.status === "failed") {
    setStatus("AR is available on supported mobile browsers and devices.", "is-warning");
  }
});

modelSelect.addEventListener("change", () => {
  progressBar.style.width = "0";
  viewer.src = modelSelect.value;
  setStatus(`Loading ${modelSelect.options[modelSelect.selectedIndex].text}...`);
});
