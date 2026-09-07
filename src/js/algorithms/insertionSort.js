(function exposeInsertionSort(global) {
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
   * Chuyển Insertion Sort thành danh sách bước để giao diện phát lại.
   * swapsDelta biểu diễn số lần dịch chuyển hoặc ghi giá trị.
   * Hàm không thay đổi mảng đầu vào.
   *
   * @param {number[]} inputArray
   * @returns {Array<object>}
   */
  function insertionSortSteps(inputArray) {
    const array = [...inputArray];
    const steps = [];
    const n = array.length;

    if (n === 0) {
      return steps;
    }

    for (let i = 1; i < n; i += 1) {
      const key = array[i];
      let j = i - 1;

      steps.push(
        createStep("select", array, {
          indices: [i],
          codeLine: 2,
          description: `Chọn ${key} làm giá trị cần chèn vào đoạn đã sắp xếp.`,
        }),
      );

      while (j >= 0) {
        steps.push(
          createStep("compare", array, {
            indices: [j, j + 1],
            codeLine: 4,
            comparisonsDelta: 1,
            description: `So sánh ${array[j]} với giá trị cần chèn ${key}.`,
          }),
        );

        if (array[j] <= key) {
          break;
        }

        const shiftedValue = array[j];
        array[j + 1] = array[j];

        steps.push(
          createStep("overwrite", array, {
            indices: [j, j + 1],
            codeLine: 5,
            swapsDelta: 1,
            description: `Dịch ${shiftedValue} sang phải một vị trí.`,
          }),
        );

        j -= 1;
      }

      array[j + 1] = key;
      steps.push(
        createStep("insert", array, {
          indices: [j + 1],
          codeLine: 7,
          swapsDelta: 1,
          description: `Chèn ${key} vào vị trí ${j + 2}.`,
        }),
      );
    }

    steps.push(
      createStep("markSorted", array, {
        indices: Array.from({ length: n }, (_, index) => index),
        codeLine: 8,
        description: "Toàn bộ mảng đã được sắp xếp.",
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
    insertionSortSteps,
  };
})(window);
