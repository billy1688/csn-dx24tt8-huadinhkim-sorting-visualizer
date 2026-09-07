(function exposeMergeSort(global) {
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
   * Chuyển Merge Sort thành danh sách bước để giao diện phát lại.
   * swapsDelta được dùng để đếm số lần ghi giá trị vào mảng chính.
   * Hàm không thay đổi mảng đầu vào.
   *
   * @param {number[]} inputArray
   * @returns {Array<object>}
   */
  function mergeSortSteps(inputArray) {
    const array = [...inputArray];
    const steps = [];

    function merge(left, middle, right) {
      const leftPart = array.slice(left, middle + 1);
      const rightPart = array.slice(middle + 1, right + 1);
      let leftIndex = 0;
      let rightIndex = 0;
      let writeIndex = left;

      while (leftIndex < leftPart.length && rightIndex < rightPart.length) {
        const leftValue = leftPart[leftIndex];
        const rightValue = rightPart[rightIndex];

        steps.push(
          createStep("compare", array, {
            indices: [left + leftIndex, middle + 1 + rightIndex],
            codeLine: 7,
            comparisonsDelta: 1,
            description: `So sánh ${leftValue} của nửa trái với ${rightValue} của nửa phải.`,
          }),
        );

        if (leftValue <= rightValue) {
          array[writeIndex] = leftValue;
          leftIndex += 1;
        } else {
          array[writeIndex] = rightValue;
          rightIndex += 1;
        }

        steps.push(
          createStep("overwrite", array, {
            indices: [writeIndex],
            codeLine: 8,
            swapsDelta: 1,
            description: `Ghi ${array[writeIndex]} vào vị trí ${writeIndex + 1}.`,
          }),
        );
        writeIndex += 1;
      }

      while (leftIndex < leftPart.length) {
        array[writeIndex] = leftPart[leftIndex];
        steps.push(
          createStep("overwrite", array, {
            indices: [writeIndex],
            codeLine: 9,
            swapsDelta: 1,
            description: `Chép ${leftPart[leftIndex]} còn lại từ nửa trái.`,
          }),
        );
        leftIndex += 1;
        writeIndex += 1;
      }

      while (rightIndex < rightPart.length) {
        array[writeIndex] = rightPart[rightIndex];
        steps.push(
          createStep("overwrite", array, {
            indices: [writeIndex],
            codeLine: 9,
            swapsDelta: 1,
            description: `Chép ${rightPart[rightIndex]} còn lại từ nửa phải.`,
          }),
        );
        rightIndex += 1;
        writeIndex += 1;
      }
    }

    function sort(left, right) {
      if (left >= right) {
        return;
      }

      const middle = Math.floor((left + right) / 2);

      steps.push(
        createStep("range", array, {
          indices: Array.from(
            { length: right - left + 1 },
            (_, index) => left + index,
          ),
          codeLine: 3,
          description: `Chia đoạn từ vị trí ${left + 1} đến ${right + 1} tại vị trí ${middle + 1}.`,
        }),
      );

      sort(left, middle);
      sort(middle + 1, right);
      merge(left, middle, right);
    }

    if (array.length > 0) {
      sort(0, array.length - 1);
      steps.push(
        createStep("markSorted", array, {
          indices: Array.from({ length: array.length }, (_, index) => index),
          codeLine: 9,
          description: "Các đoạn đã được trộn thành một mảng tăng dần.",
        }),
      );
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
    mergeSortSteps,
  };
})(window);
