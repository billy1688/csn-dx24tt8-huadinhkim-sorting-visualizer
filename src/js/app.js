(function initializeApp() {
  "use strict";

  const DEFAULT_ARRAY = [42, 18, 76, 31, 55, 12, 68, 24];
  const MIN_ITEMS = 5;
  const MAX_ITEMS = 30;
  const MIN_VALUE = 1;
  const MAX_VALUE = 100;

  const elements = {
    arrayInput: document.querySelector("#arrayInput"),
    applyInputBtn: document.querySelector("#applyInputBtn"),
    inputMessage: document.querySelector("#inputMessage"),
    algorithmSelect: document.querySelector("#algorithmSelect"),
    sizeRange: document.querySelector("#sizeRange"),
    sizeOutput: document.querySelector("#sizeOutput"),
    speedRange: document.querySelector("#speedRange"),
    speedOutput: document.querySelector("#speedOutput"),
    randomBtn: document.querySelector("#randomBtn"),
    startBtn: document.querySelector("#startBtn"),
    pauseBtn: document.querySelector("#pauseBtn"),
    pauseButtonText: document.querySelector("#pauseButtonText"),
    stepBtn: document.querySelector("#stepBtn"),
    resetBtn: document.querySelector("#resetBtn"),
    statusBadge: document.querySelector("#statusBadge"),
    barsContainer: document.querySelector("#barsContainer"),
    pseudocode: document.querySelector("#pseudocode"),
    stepDescription: document.querySelector("#stepDescription"),
    elementCount: document.querySelector("#elementCount"),
    stepCount: document.querySelector("#stepCount"),
    comparisonCount: document.querySelector("#comparisonCount"),
    swapCount: document.querySelector("#swapCount"),
    elapsedTime: document.querySelector("#elapsedTime"),
  };

  const visualizer = new window.SortingVisualizer({
    container: elements.barsContainer,
    pseudocode: elements.pseudocode,
    description: elements.stepDescription,
  });

  const state = {
    originalArray: [...DEFAULT_ARRAY],
    currentArray: [...DEFAULT_ARRAY],
    steps: [],
    currentStep: 0,
    comparisons: 0,
    swaps: 0,
    status: "idle",
    elapsedAccumulated: 0,
    activeSince: 0,
    playbackTimer: null,
    clockTimer: null,
  };

  const statusContent = {
    idle: "Sẵn sàng",
    running: "Đang chạy",
    paused: "Đã tạm dừng",
    completed: "Hoàn thành",
  };

  function parseArrayInput(rawValue) {
    const normalized = rawValue.trim();

    if (!normalized) {
      return { error: "Hãy nhập một danh sách số." };
    }

    const parts = normalized.split(/[\s,;]+/).filter(Boolean);

    if (parts.length < MIN_ITEMS || parts.length > MAX_ITEMS) {
      return {
        error: `Mảng phải có từ ${MIN_ITEMS} đến ${MAX_ITEMS} phần tử.`,
      };
    }

    const array = parts.map(Number);
    const hasInvalidValue = array.some(
      (value) =>
        !Number.isInteger(value) || value < MIN_VALUE || value > MAX_VALUE,
    );

    if (hasInvalidValue) {
      return {
        error: `Mỗi phần tử phải là số nguyên từ ${MIN_VALUE} đến ${MAX_VALUE}.`,
      };
    }

    return { array };
  }

  function createRandomArray(length) {
    return Array.from(
      { length },
      () => Math.floor(Math.random() * (MAX_VALUE - 7)) + 8,
    );
  }

  function formatArray(array) {
    return array.join(", ");
  }

  function getPlaybackDelay() {
    const speed = Number(elements.speedRange.value);
    return 1050 - speed * 100;
  }

  function setInputMessage(message, type = "error") {
    elements.inputMessage.textContent = message;
    elements.inputMessage.classList.toggle("success", type === "success");
  }

  function setStatus(status) {
    state.status = status;
    elements.statusBadge.dataset.status = status;
    elements.statusBadge.textContent = statusContent[status];
    updateControls();
  }

  function updateControls() {
    const isActive = state.status === "running" || state.status === "paused";
    const isPaused = state.status === "paused";

    elements.arrayInput.disabled = isActive;
    elements.applyInputBtn.disabled = isActive;
    elements.algorithmSelect.disabled = isActive;
    elements.sizeRange.disabled = isActive;
    elements.randomBtn.disabled = isActive;
    elements.startBtn.disabled = isActive;
    elements.pauseBtn.disabled = !isActive;
    elements.pauseButtonText.textContent = isPaused ? "Tiếp tục" : "Tạm dừng";
    elements.startBtn.lastChild.textContent =
      state.status === "completed" ? " Chạy lại" : " Bắt đầu";
  }

  function updateStatistics() {
    elements.elementCount.textContent = String(state.currentArray.length);
    elements.stepCount.textContent = String(state.currentStep);
    elements.comparisonCount.textContent = String(state.comparisons);
    elements.swapCount.textContent = String(state.swaps);
    elements.elapsedTime.textContent = String(Math.round(getElapsedTime()));
  }

  function getElapsedTime() {
    if (state.status === "running") {
      return state.elapsedAccumulated + (performance.now() - state.activeSince);
    }
    return state.elapsedAccumulated;
  }

  function startClock() {
    stopClock();
    state.clockTimer = window.setInterval(updateStatistics, 50);
  }

  function stopClock() {
    if (state.clockTimer !== null) {
      window.clearInterval(state.clockTimer);
      state.clockTimer = null;
    }
  }

  function commitActiveTime() {
    if (state.status === "running") {
      state.elapsedAccumulated += performance.now() - state.activeSince;
    }
  }

  function clearPlaybackTimer() {
    if (state.playbackTimer !== null) {
      window.clearTimeout(state.playbackTimer);
      state.playbackTimer = null;
    }
  }

  function clearRunState() {
    clearPlaybackTimer();
    stopClock();
    state.steps = [];
    state.currentStep = 0;
    state.comparisons = 0;
    state.swaps = 0;
    state.elapsedAccumulated = 0;
    state.activeSince = 0;
  }

  function applyArray(array, message) {
    clearRunState();
    state.originalArray = [...array];
    state.currentArray = [...array];
    elements.arrayInput.value = formatArray(array);
    elements.sizeRange.value = String(array.length);
    elements.sizeOutput.value = String(array.length);
    visualizer.setArray(array);
    visualizer.setDescription(message);
    visualizer.updateAccessibleLabel(array, message);
    setStatus("idle");
    updateStatistics();
  }

  function prepareRun() {
    clearRunState();
    state.currentArray = [...state.originalArray];
    state.steps = window.SortingAlgorithms.bubbleSortSteps(state.originalArray);
    visualizer.setArray(state.originalArray);
    visualizer.setDescription("Bắt đầu duyệt mảng từ trái sang phải.");
    updateStatistics();
  }

  function scheduleNextStep() {
    clearPlaybackTimer();

    if (state.status !== "running") {
      return;
    }

    state.playbackTimer = window.setTimeout(
      () => executeNextStep(false),
      getPlaybackDelay(),
    );
  }

  function executeNextStep(manualMode) {
    if (state.currentStep >= state.steps.length) {
      finishRun();
      return;
    }

    const operationStartedAt = performance.now();
    const step = state.steps[state.currentStep];

    visualizer.applyStep(step);
    state.currentArray = [...step.array];
    state.comparisons += step.comparisonsDelta;
    state.swaps += step.swapsDelta;
    state.currentStep += 1;

    if (manualMode) {
      state.elapsedAccumulated += performance.now() - operationStartedAt;
    }

    updateStatistics();

    if (step.type === "complete" || state.currentStep >= state.steps.length) {
      finishRun();
      return;
    }

    if (!manualMode) {
      scheduleNextStep();
    }
  }

  function startRun() {
    prepareRun();
    state.activeSince = performance.now();
    setStatus("running");
    startClock();
    executeNextStep(false);
  }

  function pauseRun() {
    if (state.status !== "running") {
      return;
    }

    commitActiveTime();
    clearPlaybackTimer();
    stopClock();
    setStatus("paused");
    updateStatistics();
  }

  function resumeRun() {
    if (state.status !== "paused") {
      return;
    }

    state.activeSince = performance.now();
    setStatus("running");
    startClock();
    scheduleNextStep();
  }

  function togglePause() {
    if (state.status === "running") {
      pauseRun();
    } else if (state.status === "paused") {
      resumeRun();
    }
  }

  function runSingleStep() {
    if (state.status === "running") {
      pauseRun();
    }

    if (state.status === "idle" || state.status === "completed") {
      prepareRun();
      setStatus("paused");
    }

    executeNextStep(true);
  }

  function finishRun() {
    commitActiveTime();
    clearPlaybackTimer();
    stopClock();
    setStatus("completed");
    updateStatistics();
  }

  function resetRun() {
    applyArray(
      state.originalArray,
      "Đã đặt lại mảng. Chọn Bắt đầu hoặc Từng bước để quan sát thuật toán.",
    );
    setInputMessage("");
  }

  function handleManualInput() {
    const result = parseArrayInput(elements.arrayInput.value);

    if (result.error) {
      setInputMessage(result.error);
      elements.arrayInput.focus();
      return;
    }

    applyArray(result.array, "Đã áp dụng mảng nhập tay.");
    setInputMessage(`Đã nhận ${result.array.length} phần tử.`, "success");
  }

  function handleRandomArray() {
    const length = Number(elements.sizeRange.value);
    const array = createRandomArray(length);
    applyArray(array, `Đã tạo ngẫu nhiên ${length} phần tử.`);
    setInputMessage("");
  }

  elements.applyInputBtn.addEventListener("click", handleManualInput);
  elements.arrayInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      handleManualInput();
    }
  });

  elements.sizeRange.addEventListener("input", () => {
    elements.sizeOutput.value = elements.sizeRange.value;
  });

  elements.speedRange.addEventListener("input", () => {
    elements.speedOutput.value = elements.speedRange.value;

    if (state.status === "running") {
      scheduleNextStep();
    }
  });

  elements.randomBtn.addEventListener("click", handleRandomArray);
  elements.startBtn.addEventListener("click", startRun);
  elements.pauseBtn.addEventListener("click", togglePause);
  elements.stepBtn.addEventListener("click", runSingleStep);
  elements.resetBtn.addEventListener("click", resetRun);

  visualizer.setArray(DEFAULT_ARRAY);
  updateControls();
  updateStatistics();
})();
