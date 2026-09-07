(function initializeApp() {
  "use strict";

  const DEFAULT_ARRAY = [42, 18, 76, 31, 55, 12, 68, 24];
  const MIN_ITEMS = 5;
  const MAX_ITEMS = 30;
  const MIN_VALUE = 1;
  const MAX_VALUE = 100;

  const ALGORITHM_CATALOG = {
    bubble: {
      name: "Bubble Sort",
      stepFactory: "bubbleSortSteps",
      introduction: "Bắt đầu duyệt mảng từ trái sang phải.",
      operationLabel: "Hoán đổi",
      complexity: {
        best: "O(n)",
        average: "O(n²)",
        worst: "O(n²)",
        space: "O(1)",
      },
      pseudocode: [
        "for i ← 0 to n - 2",
        "  for j ← 0 to n - i - 2",
        "    if A[j] > A[j + 1]",
        "      swap(A[j], A[j + 1])",
        "  mark A[n - i - 1] as sorted",
        "mark A[0] as sorted",
      ],
    },
    selection: {
      name: "Selection Sort",
      stepFactory: "selectionSortSteps",
      introduction: "Bắt đầu tìm phần tử nhỏ nhất của đoạn chưa sắp xếp.",
      operationLabel: "Hoán đổi",
      complexity: {
        best: "O(n²)",
        average: "O(n²)",
        worst: "O(n²)",
        space: "O(1)",
      },
      pseudocode: [
        "for i ← 0 to n - 2",
        "  minIndex ← i",
        "  for j ← i + 1 to n - 1",
        "    if A[j] < A[minIndex]",
        "      minIndex ← j",
        "  if minIndex ≠ i",
        "    swap(A[i], A[minIndex])",
        "  mark A[i] as sorted",
      ],
    },
    insertion: {
      name: "Insertion Sort",
      stepFactory: "insertionSortSteps",
      introduction: "Bắt đầu chèn từng phần tử vào đoạn bên trái đã sắp xếp.",
      operationLabel: "Dịch chuyển",
      complexity: {
        best: "O(n)",
        average: "O(n²)",
        worst: "O(n²)",
        space: "O(1)",
      },
      pseudocode: [
        "for i ← 1 to n - 1",
        "  key ← A[i]",
        "  j ← i - 1",
        "  while j ≥ 0 and A[j] > key",
        "    A[j + 1] ← A[j]",
        "    j ← j - 1",
        "  A[j + 1] ← key",
        "mark all elements as sorted",
      ],
    },
  };

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
    visualTitle: document.querySelector("#visual-title"),
    codeAlgorithmTitle: document.querySelector("#codeAlgorithmTitle"),
    complexityPill: document.querySelector("#complexityPill"),
    barsContainer: document.querySelector("#barsContainer"),
    pseudocode: document.querySelector("#pseudocode"),
    stepDescription: document.querySelector("#stepDescription"),
    elementCount: document.querySelector("#elementCount"),
    stepCount: document.querySelector("#stepCount"),
    comparisonCount: document.querySelector("#comparisonCount"),
    operationLabel: document.querySelector("#operationLabel"),
    swapCount: document.querySelector("#swapCount"),
    elapsedTime: document.querySelector("#elapsedTime"),
    bestComplexity: document.querySelector("#bestComplexity"),
    averageComplexity: document.querySelector("#averageComplexity"),
    worstComplexity: document.querySelector("#worstComplexity"),
    spaceComplexity: document.querySelector("#spaceComplexity"),
    complexityTable: document.querySelector(".complexity-table"),
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

  function getSelectedAlgorithm() {
    return ALGORITHM_CATALOG[elements.algorithmSelect.value];
  }

  function renderAlgorithmDetails() {
    const algorithm = getSelectedAlgorithm();
    const codeFragment = document.createDocumentFragment();

    algorithm.pseudocode.forEach((lineContent, index) => {
      const line = document.createElement("li");
      const code = document.createElement("code");

      line.dataset.line = String(index + 1);
      code.textContent = lineContent;
      line.append(code);
      codeFragment.append(line);
    });

    elements.pseudocode.replaceChildren(codeFragment);
    elements.pseudocode.setAttribute("aria-label", `Mã giả ${algorithm.name}`);
    elements.visualTitle.textContent = algorithm.name;
    elements.codeAlgorithmTitle.textContent = algorithm.name;
    elements.complexityPill.textContent = algorithm.complexity.worst;
    elements.operationLabel.textContent = algorithm.operationLabel;
    elements.bestComplexity.textContent = algorithm.complexity.best;
    elements.averageComplexity.textContent = algorithm.complexity.average;
    elements.worstComplexity.textContent = algorithm.complexity.worst;
    elements.spaceComplexity.textContent = algorithm.complexity.space;
    elements.complexityTable.setAttribute(
      "aria-label",
      `Độ phức tạp ${algorithm.name}`,
    );
  }

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
    const algorithm = getSelectedAlgorithm();
    const createSteps = window.SortingAlgorithms[algorithm.stepFactory];

    clearRunState();
    state.currentArray = [...state.originalArray];
    state.steps = createSteps(state.originalArray);
    visualizer.setArray(state.originalArray);
    visualizer.setDescription(algorithm.introduction);
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

  function handleAlgorithmChange() {
    const algorithm = getSelectedAlgorithm();

    clearRunState();
    state.currentArray = [...state.originalArray];
    renderAlgorithmDetails();
    visualizer.setArray(state.originalArray);
    visualizer.setDescription(`Đã chọn ${algorithm.name}. ${algorithm.introduction}`);
    visualizer.updateAccessibleLabel(state.originalArray, algorithm.introduction);
    setStatus("idle");
    updateStatistics();
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
  elements.algorithmSelect.addEventListener("change", handleAlgorithmChange);
  elements.startBtn.addEventListener("click", startRun);
  elements.pauseBtn.addEventListener("click", togglePause);
  elements.stepBtn.addEventListener("click", runSingleStep);
  elements.resetBtn.addEventListener("click", resetRun);

  renderAlgorithmDetails();
  visualizer.setArray(DEFAULT_ARRAY);
  updateControls();
  updateStatistics();
})();
