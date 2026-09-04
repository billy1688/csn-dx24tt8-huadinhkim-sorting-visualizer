(function exposeBubbleSort(global) {
  "use strict";

  function createStep(type, array, options) {
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
   * Chuyển Bubble Sort thành danh sách bước để giao diện phát lại.
   * Hàm không thay đổi mảng đầu vào.
   *
   * @param {number[]} inputArray
   * @returns {Array<object>}
   */
  function bubbleSortSteps(inputArray) {
    const array = [...inputArray];
    const steps = [];
    const n = array.length;

    if (n === 0) {
      return steps;
    }

    if (n === 1) {
      steps.push(
        createStep("markSorted", array, {
          indices: [0],
          codeLine: 6,
          description: "Mảng chỉ có một phần tử nên đã được sắp xếp.",
        }),
      );
      steps.push(
        createStep("complete", array, {
          description: "Hoàn tất sắp xếp.",
        }),
      );
      return steps;
    }

    let lastUnsortedIndex = n - 1;

    for (let i = 0; i < n - 1; i += 1) {
      let swappedInPass = false;

      for (let j = 0; j < n - i - 1; j += 1) {
        steps.push(
          createStep("compare", array, {
            indices: [j, j + 1],
            codeLine: 3,
            comparisonsDelta: 1,
            description: `So sánh ${array[j]} và ${array[j + 1]}.`,
          }),
        );

        if (array[j] > array[j + 1]) {
          const leftValue = array[j];
          const rightValue = array[j + 1];

          [array[j], array[j + 1]] = [array[j + 1], array[j]];
          swappedInPass = true;

          steps.push(
            createStep("swap", array, {
              indices: [j, j + 1],
              codeLine: 4,
              swapsDelta: 1,
              description: `${leftValue} lớn hơn ${rightValue}, đổi chỗ hai phần tử.`,
            }),
          );
        }
      }

      lastUnsortedIndex = n - i - 1;
      steps.push(
        createStep("markSorted", array, {
          indices: [lastUnsortedIndex],
          codeLine: 5,
          description: `${array[lastUnsortedIndex]} đã ở đúng vị trí.`,
        }),
      );

      // Tối ưu: nếu cả lượt không có hoán đổi thì phần còn lại đã tăng dần.
      if (!swappedInPass) {
        const remainingIndices = Array.from(
          { length: lastUnsortedIndex },
          (_, index) => index,
        );

        if (remainingIndices.length > 0) {
          steps.push(
            createStep("markSorted", array, {
              indices: remainingIndices,
              codeLine: 6,
              description: "Không có hoán đổi trong lượt này; phần còn lại đã được sắp xếp.",
            }),
          );
        }
        break;
      }
    }

    steps.push(
      createStep("markSorted", array, {
        indices: [0],
        codeLine: 6,
        description: `${array[0]} đã ở đúng vị trí.`,
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
    bubbleSortSteps,
  };
})(window);
