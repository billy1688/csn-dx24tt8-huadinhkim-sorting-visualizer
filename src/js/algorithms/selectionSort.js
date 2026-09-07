(function exposeSelectionSort(global) {
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
   * Chuyển Selection Sort thành danh sách bước để giao diện phát lại.
   * Hàm không thay đổi mảng đầu vào.
   *
   * @param {number[]} inputArray
   * @returns {Array<object>}
   */
  function selectionSortSteps(inputArray) {
    const array = [...inputArray];
    const steps = [];
    const n = array.length;

    if (n === 0) {
      return steps;
    }

    for (let i = 0; i < n - 1; i += 1) {
      let minIndex = i;

      steps.push(
        createStep("select", array, {
          indices: [minIndex],
          codeLine: 2,
          description: `Chọn ${array[minIndex]} làm giá trị nhỏ nhất tạm thời.`,
        }),
      );

      for (let j = i + 1; j < n; j += 1) {
        steps.push(
          createStep("compare", array, {
            indices: [minIndex, j],
            codeLine: 4,
            comparisonsDelta: 1,
            description: `So sánh ${array[j]} với giá trị nhỏ nhất ${array[minIndex]}.`,
          }),
        );

        if (array[j] < array[minIndex]) {
          minIndex = j;
          steps.push(
            createStep("select", array, {
              indices: [minIndex],
              codeLine: 5,
              description: `${array[minIndex]} trở thành giá trị nhỏ nhất mới.`,
            }),
          );
        }
      }

      if (minIndex !== i) {
        const firstValue = array[i];
        const minimumValue = array[minIndex];
        [array[i], array[minIndex]] = [array[minIndex], array[i]];

        steps.push(
          createStep("swap", array, {
            indices: [i, minIndex],
            codeLine: 7,
            swapsDelta: 1,
            description: `Đổi chỗ ${firstValue} và ${minimumValue}.`,
          }),
        );
      }

      steps.push(
        createStep("markSorted", array, {
          indices: [i],
          codeLine: 8,
          description: `${array[i]} đã ở đúng vị trí.`,
        }),
      );
    }

    steps.push(
      createStep("markSorted", array, {
        indices: [n - 1],
        codeLine: 8,
        description: `${array[n - 1]} đã ở đúng vị trí.`,
      }),
    );
    steps.push(
      createStep("complete", array, {
        description: `Hoàn tất: [${array.join(", ")}].`,
      }),
    );

    return steps;
  }

  global.SortingAlgorithms = {
    ...(global.SortingAlgorithms || {}),
    selectionSortSteps,
  };
})(window);
