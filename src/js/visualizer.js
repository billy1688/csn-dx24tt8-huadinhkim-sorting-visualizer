(function exposeVisualizer(global) {
  "use strict";

  class SortingVisualizer {
    /**
     * @param {{
     *   container: HTMLElement,
     *   pseudocode: HTMLElement,
     *   description: HTMLElement
     * }} elements
     */
    constructor(elements) {
      this.container = elements.container;
      this.pseudocode = elements.pseudocode;
      this.description = elements.description;
      this.sortedIndices = new Set();
      this.barElements = [];
      this.currentLength = 0;
    }

    setArray(array) {
      this.sortedIndices.clear();
      this.ensureBars(array.length);
      this.updateBars(array, [], "default");
      this.highlightCodeLine(0);
    }

    ensureBars(length) {
      if (length === this.currentLength) {
        return;
      }

      this.container.replaceChildren();
      this.barElements = [];
      this.currentLength = length;

      for (let index = 0; index < length; index += 1) {
        const slot = document.createElement("div");
        const bar = document.createElement("div");
        const value = document.createElement("span");

        slot.className = "bar-slot";
        bar.className = "bar";
        value.className = "bar-value";

        bar.append(value);
        slot.append(bar);
        this.container.append(slot);
        this.barElements.push({ bar, value });
      }
    }

    applyStep(step) {
      if (step.type === "markSorted") {
        step.indices.forEach((index) => this.sortedIndices.add(index));
      }

      if (step.type === "complete") {
        step.array.forEach((_, index) => this.sortedIndices.add(index));
      }

      this.ensureBars(step.array.length);
      this.updateBars(step.array, step.indices, step.type);
      this.highlightCodeLine(step.codeLine);
      this.setDescription(step.description);
      this.updateAccessibleLabel(step.array, step.description);
    }

    updateBars(array, activeIndices, activeType) {
      const maxValue = Math.max(...array, 1);
      const minVisualHeight = 8;

      array.forEach((number, index) => {
        const item = this.barElements[index];
        const height = Math.max((number / maxValue) * 88, minVisualHeight);

        item.bar.style.height = `${height}%`;
        item.value.textContent = String(number);
        item.bar.setAttribute("aria-label", `Vị trí ${index + 1}, giá trị ${number}`);
        item.bar.className = "bar";

        if (this.sortedIndices.has(index)) {
          item.bar.classList.add("sorted");
        }

        if (
          activeIndices.includes(index) &&
          (activeType === "compare" || activeType === "select")
        ) {
          item.bar.classList.remove("sorted");
          item.bar.classList.add("comparing");
        }

        if (
          activeIndices.includes(index) &&
          ["swap", "overwrite", "insert"].includes(activeType)
        ) {
          item.bar.classList.remove("sorted");
          item.bar.classList.add("swapping");
        }
      });
    }

    highlightCodeLine(lineNumber) {
      const lines = this.pseudocode.querySelectorAll("[data-line]");
      lines.forEach((line) => {
        const isActive = Number(line.dataset.line) === Number(lineNumber);
        line.classList.toggle("active", isActive);

        if (isActive) {
          line.setAttribute("aria-current", "step");
        } else {
          line.removeAttribute("aria-current");
        }
      });
    }

    setDescription(message) {
      this.description.textContent = message;
    }

    updateAccessibleLabel(array, message) {
      this.container.setAttribute(
        "aria-label",
        `Mảng hiện tại: ${array.join(", ")}. ${message}`,
      );
    }

    clearActivity(array, message) {
      this.updateBars(array, [], "default");
      this.highlightCodeLine(0);
      this.setDescription(message);
      this.updateAccessibleLabel(array, message);
    }
  }

  global.SortingVisualizer = SortingVisualizer;
})(window);
