(function exposeQuickSort(global) {
  "use strict";

  function createStep(type, array, options = {}) {
    return {
      type,
      array: [...array],
      indices: options.indices || [],
      codeLine: options.codeLine || 0,
      comparisonsDelta: options.comparisonsDelta || 0,
      swapsDelta: options.swapsDelta || 0,
      description: options.description || "",
    };
  }

  /**
   * Chuyển Quick Sort (phân hoạch Lomuto) thành danh sách bước.
   * Hàm không thay đổi mảng đầu vào.
   *
   * @param {number[]} inputArray
   * @returns {Array<object>}
   */
  function quickSortSteps(inputArray) {
    const array = [...inputArray];
    const steps = [];

    function partition(low, high) {
      const pivot = array[high];
      let smallerIndex = low - 1;

      steps.push(
        createStep("pivot", array, {
          indices: [high],
          codeLine: 2,
          description: `Chọn ${pivot} tại vị trí ${high + 1} làm chốt.`,
        }),
      );

      for (let scanIndex = low; scanIndex < high; scanIndex += 1) {
        steps.push(
          createStep("compare", array, {
            indices: [scanIndex, high],
            codeLine: 5,
            comparisonsDelta: 1,
            description: `So sánh ${array[scanIndex]} với chốt ${pivot}.`,
          }),
        );

        if (array[scanIndex] <= pivot) {
          smallerIndex += 1;

          if (smallerIndex !== scanIndex) {
            const leftValue = array[smallerIndex];
            const rightValue = array[scanIndex];
            [array[smallerIndex], array[scanIndex]] = [
              array[scanIndex],
              array[smallerIndex],
            ];

            steps.push(
              createStep("swap", array, {
                indices: [smallerIndex, scanIndex],
                codeLine: 7,
                swapsDelta: 1,
                description: `Đổi chỗ ${leftValue} và ${rightValue} để đưa ${rightValue} sang phía trái chốt.`,
              }),
            );
          }
        }
      }

      const pivotIndex = smallerIndex + 1;

      if (pivotIndex !== high) {
        const displacedValue = array[pivotIndex];
        [array[pivotIndex], array[high]] = [array[high], array[pivotIndex]];
        steps.push(
          createStep("swap", array, {
            indices: [pivotIndex, high],
            codeLine: 8,
            swapsDelta: 1,
            description: `Đưa chốt ${pivot} vào vị trí ${pivotIndex + 1}, đổi chỗ với ${displacedValue}.`,
          }),
        );
      } else {
        steps.push(
          createStep("pivot", array, {
            indices: [pivotIndex],
            codeLine: 8,
            description: `Chốt ${pivot} đã ở đúng vị trí ${pivotIndex + 1}.`,
          }),
        );
      }

      steps.push(
        createStep("markSorted", array, {
          indices: [pivotIndex],
          codeLine: 8,
          description: `Chốt ${pivot} đã cố định tại vị trí ${pivotIndex + 1}.`,
        }),
      );

      return pivotIndex;
    }

    function sort(low, high) {
      if (low > high) {
        return;
      }

      if (low === high) {
        steps.push(
          createStep("markSorted", array, {
            indices: [low],
            codeLine: 1,
            description: `${array[low]} là phần tử duy nhất của đoạn nên đã đúng vị trí.`,
          }),
        );
        return;
      }

      const pivotIndex = partition(low, high);

      if (low < pivotIndex - 1) {
        steps.push(
          createStep("range", array, {
            indices: Array.from(
              { length: pivotIndex - low },
              (_, index) => low + index,
            ),
            codeLine: 9,
            description: "Tiếp tục sắp xếp đoạn bên trái chốt.",
          }),
        );
      }
      sort(low, pivotIndex - 1);

      if (pivotIndex + 1 < high) {
        steps.push(
          createStep("range", array, {
            indices: Array.from(
              { length: high - pivotIndex },
              (_, index) => pivotIndex + 1 + index,
            ),
            codeLine: 10,
            description: "Tiếp tục sắp xếp đoạn bên phải chốt.",
          }),
        );
      }
      sort(pivotIndex + 1, high);
    }

    if (array.length > 0) {
      sort(0, array.length - 1);
      steps.push(
        createStep("complete", array, {
          description: `Hoàn tất: [${array.join(", ")}].`,
        }),
      );
    }

    return steps;
  }

  global.SortingAlgorithms = {
    ...(global.SortingAlgorithms || {}),
    quickSortSteps,
  };
})(window);
