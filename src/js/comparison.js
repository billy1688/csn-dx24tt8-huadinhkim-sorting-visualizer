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

  function benchmark(inputArray) {
    if (!Array.isArray(inputArray) || inputArray.length === 0) {
      throw new Error("Dữ liệu so sánh không hợp lệ.");
    }

    return Object.entries(runners).map(([key, sortFunction]) => {
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
    });
  }

  global.SortingComparison = { benchmark };
})(window);
