(function exposeSortingComparison(global) {
  "use strict";

  const runners = {
    bubble: bubbleSort,
    selection: selectionSort,
    insertion: insertionSort,
    merge: mergeSort,
    quick: quickSort,
  };

  function increase(stats, property, amount = 1) {
    if (stats) {
      stats[property] += amount;
    }
  }

  function bubbleSort(inputArray, stats) {
    const array = [...inputArray];

    for (let i = 0; i < array.length - 1; i += 1) {
      let swapped = false;

      for (let j = 0; j < array.length - i - 1; j += 1) {
        increase(stats, "comparisons");

        if (array[j] > array[j + 1]) {
          [array[j], array[j + 1]] = [array[j + 1], array[j]];
          increase(stats, "operations");
          swapped = true;
        }
      }

      if (!swapped) {
        break;
      }
    }

    return array;
  }

  function selectionSort(inputArray, stats) {
    const array = [...inputArray];

    for (let i = 0; i < array.length - 1; i += 1) {
      let minIndex = i;

      for (let j = i + 1; j < array.length; j += 1) {
        increase(stats, "comparisons");

        if (array[j] < array[minIndex]) {
          minIndex = j;
        }
      }

      if (minIndex !== i) {
        [array[i], array[minIndex]] = [array[minIndex], array[i]];
        increase(stats, "operations");
      }
    }

    return array;
  }

  function insertionSort(inputArray, stats) {
    const array = [...inputArray];

    for (let i = 1; i < array.length; i += 1) {
      const key = array[i];
      let j = i - 1;

      while (j >= 0) {
        increase(stats, "comparisons");

        if (array[j] <= key) {
          break;
        }

        array[j + 1] = array[j];
        increase(stats, "operations");
        j -= 1;
      }

      array[j + 1] = key;
      increase(stats, "operations");
    }

    return array;
  }

  function mergeSort(inputArray, stats) {
    const array = [...inputArray];
    const temporary = new Array(array.length);

    function merge(left, middle, right) {
      let leftIndex = left;
      let rightIndex = middle + 1;
      let temporaryIndex = left;

      while (leftIndex <= middle && rightIndex <= right) {
        increase(stats, "comparisons");

        if (array[leftIndex] <= array[rightIndex]) {
          temporary[temporaryIndex] = array[leftIndex];
          leftIndex += 1;
        } else {
          temporary[temporaryIndex] = array[rightIndex];
          rightIndex += 1;
        }
        temporaryIndex += 1;
      }

      while (leftIndex <= middle) {
        temporary[temporaryIndex] = array[leftIndex];
        leftIndex += 1;
        temporaryIndex += 1;
      }

      while (rightIndex <= right) {
        temporary[temporaryIndex] = array[rightIndex];
        rightIndex += 1;
        temporaryIndex += 1;
      }

      for (let index = left; index <= right; index += 1) {
        array[index] = temporary[index];
        increase(stats, "operations");
      }
    }

    function sort(left, right) {
      if (left >= right) {
        return;
      }

      const middle = Math.floor((left + right) / 2);
      sort(left, middle);
      sort(middle + 1, right);
      merge(left, middle, right);
    }

    sort(0, array.length - 1);
    return array;
  }

  function quickSort(inputArray, stats) {
    const array = [...inputArray];

    function partition(low, high) {
      const pivot = array[high];
      let smallerIndex = low - 1;

      for (let scanIndex = low; scanIndex < high; scanIndex += 1) {
        increase(stats, "comparisons");

        if (array[scanIndex] <= pivot) {
          smallerIndex += 1;

          if (smallerIndex !== scanIndex) {
            [array[smallerIndex], array[scanIndex]] = [
              array[scanIndex],
              array[smallerIndex],
            ];
            increase(stats, "operations");
          }
        }
      }

      const pivotIndex = smallerIndex + 1;
      if (pivotIndex !== high) {
        [array[pivotIndex], array[high]] = [array[high], array[pivotIndex]];
        increase(stats, "operations");
      }

      return pivotIndex;
    }

    function sort(low, high) {
      if (low >= high) {
        return;
      }

      const pivotIndex = partition(low, high);
      sort(low, pivotIndex - 1);
      sort(pivotIndex + 1, high);
    }

    sort(0, array.length - 1);
    return array;
  }

  function getNow() {
    return global.performance?.now ? global.performance.now() : Date.now();
  }

  function measureAverageTime(sortFunction, inputArray) {
    const minimumSampleTime = 12;
    const maximumRepetitions = 32768;
    let repetitions = 32;
    let elapsed = 0;

    for (let warmup = 0; warmup < 8; warmup += 1) {
      sortFunction(inputArray, null);
    }

    while (repetitions <= maximumRepetitions) {
      const startedAt = getNow();

      for (let run = 0; run < repetitions; run += 1) {
        sortFunction(inputArray, null);
      }

      elapsed = getNow() - startedAt;

      if (elapsed >= minimumSampleTime || repetitions === maximumRepetitions) {
        break;
      }

      repetitions = Math.min(repetitions * 2, maximumRepetitions);
    }

    return {
      durationMs: elapsed / repetitions,
      repetitions,
    };
  }

  function isSorted(array) {
    return array.every((value, index) => index === 0 || array[index - 1] <= value);
  }

  function validateInput(inputArray) {
    if (!Array.isArray(inputArray) || inputArray.length === 0) {
      throw new Error("Dữ liệu so sánh không hợp lệ.");
    }
  }

  function benchmarkSingleAlgorithm(key, inputArray) {
    validateInput(inputArray);

    const sortFunction = runners[key];
    if (!sortFunction) {
      throw new Error("Thuật toán được chọn không hợp lệ.");
    }

    const stats = { comparisons: 0, operations: 0 };
    const sortedArray = sortFunction(inputArray, stats);
    const timing = measureAverageTime(sortFunction, inputArray);

    if (!isSorted(sortedArray)) {
      throw new Error(`Thuật toán ${key} trả về kết quả không chính xác.`);
    }

    return {
      key,
      comparisons: stats.comparisons,
      operations: stats.operations,
      durationMs: timing.durationMs,
      repetitions: timing.repetitions,
    };
  }

  function createSeed(array) {
    return array.reduce((seed, value, index) => {
      const mixedValue = (value + 31) * (index + 17);
      return Math.imul(seed ^ mixedValue, 16777619) >>> 0;
    }, 2166136261);
  }

  function createSeededRandom(seed) {
    let currentSeed = seed >>> 0;

    return function random() {
      currentSeed += 0x6d2b79f5;
      let value = currentSeed;
      value = Math.imul(value ^ (value >>> 15), value | 1);
      value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
      return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
    };
  }

  function arraysEqual(firstArray, secondArray) {
    return firstArray.every((value, index) => value === secondArray[index]);
  }

  function createInputOrders(inputArray) {
    validateInput(inputArray);

    const ascending = [...inputArray].sort((first, second) => first - second);
    const descending = [...ascending].reverse();
    const shuffled = [...ascending];
    const random = createSeededRandom(createSeed(ascending));

    for (let index = shuffled.length - 1; index > 0; index -= 1) {
      const randomIndex = Math.floor(random() * (index + 1));
      [shuffled[index], shuffled[randomIndex]] = [
        shuffled[randomIndex],
        shuffled[index],
      ];
    }

    const hasDifferentValues = new Set(ascending).size > 1;
    if (
      hasDifferentValues &&
      (arraysEqual(shuffled, ascending) || arraysEqual(shuffled, descending))
    ) {
      const differentIndex = shuffled.findIndex(
        (value, index) => index > 0 && value !== shuffled[0],
      );

      if (differentIndex > 0) {
        [shuffled[0], shuffled[differentIndex]] = [
          shuffled[differentIndex],
          shuffled[0],
        ];
      }
    }

    return [
      { orderKey: "ascending", label: "Tăng dần", values: ascending },
      { orderKey: "descending", label: "Giảm dần", values: descending },
      { orderKey: "shuffled", label: "Xáo trộn", values: shuffled },
    ];
  }

  function benchmark(inputArray) {
    validateInput(inputArray);

    return Object.keys(runners).map((key) =>
      benchmarkSingleAlgorithm(key, inputArray),
    );
  }

  function benchmarkInputOrders(key, inputArray) {
    return createInputOrders(inputArray).map((inputOrder) => ({
      ...benchmarkSingleAlgorithm(key, inputOrder.values),
      orderKey: inputOrder.orderKey,
      label: inputOrder.label,
      values: inputOrder.values,
    }));
  }

  global.SortingComparison = {
    benchmark,
    benchmarkSingleAlgorithm,
    benchmarkInputOrders,
    createInputOrders,
  };
})(window);
