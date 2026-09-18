const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');
const { performance } = require('node:perf_hooks');

const root = path.resolve(__dirname, '..');
const src = path.join(root, 'src');
const scripts = [
  'algorithms/bubbleSort.js',
  'algorithms/selectionSort.js',
  'algorithms/insertionSort.js',
  'algorithms/mergeSort.js',
  'algorithms/quickSort.js',
  'comparison.js',
];
const algorithmKeys = ['bubble', 'selection', 'insertion', 'merge', 'quick'];

function visitJsFiles(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) return visitJsFiles(file);
    return entry.isFile() && entry.name.endsWith('.js') ? [file] : [];
  });
}

function loadAlgorithms() {
  const context = vm.createContext({ window: { performance } });
  for (const file of scripts) {
    vm.runInContext(fs.readFileSync(path.join(src, 'js', file), 'utf8'), context, {
      filename: file,
    });
  }
  return context.window;
}

test('mã JavaScript hợp lệ và tài nguyên HTML tồn tại', () => {
  for (const file of visitJsFiles(path.join(src, 'js'))) {
    new vm.Script(fs.readFileSync(file, 'utf8'), { filename: file });
  }

  const html = fs.readFileSync(path.join(src, 'index.html'), 'utf8');
  const references = [
    ...html.matchAll(/<script\b[^>]*\bsrc\s*=\s*"([^"]+)"/g),
    ...html.matchAll(/<link\b[^>]*\bhref\s*=\s*"([^"]+\.css)"/g),
  ].map((match) => match[1]);

  assert.ok(references.length >= 8, 'Trang phải nạp mã nguồn và CSS.');
  for (const reference of references) {
    assert.ok(fs.existsSync(path.join(src, reference)), `Thiếu tài nguyên ${reference}`);
  }
});

const cases = {
  'đã tăng dần': [1, 2, 3, 4, 5, 6],
  'giảm dần': [6, 5, 4, 3, 2, 1],
  'xáo trộn': [4, 1, 6, 2, 5, 3],
  'có giá trị trùng': [8, 2, 8, 1, 5, 2],
  'chỉ một phần tử': [7],
};

for (const [label, input] of Object.entries(cases)) {
  test(`năm thuật toán sắp xếp đúng với mảng ${label}`, () => {
    const { SortingAlgorithms: visual, SortingComparison: benchmark } =
      loadAlgorithms();
    const expected = [...input].sort((a, b) => a - b);

    for (const key of algorithmKeys) {
      const original = [...input];
      const steps = visual[`${key}SortSteps`](input);
      const result = benchmark.benchmarkSingleAlgorithm(key, input);
      const last = steps.at(-1);

      assert.deepEqual(input, original, `${key} đã sửa mảng đầu vào`);
      assert.equal(last?.type, 'complete', `${key} thiếu bước hoàn thành`);
      assert.deepEqual(Array.from(last.array), expected, `${key} sắp xếp sai`);
      assert.equal(
        steps.reduce((sum, step) => sum + step.comparisonsDelta, 0),
        result.comparisons,
        `${key} đếm so sánh khác giữa mô phỏng và so sánh`,
      );
      assert.equal(
        steps.reduce((sum, step) => sum + step.swapsDelta, 0),
        result.operations,
        `${key} đếm thao tác khác giữa mô phỏng và so sánh`,
      );
      assert.ok(Number.isFinite(result.durationMs) && result.durationMs >= 0);
    }
  });
}

test('ba dạng đầu vào giữ nguyên cùng tập giá trị', () => {
  const { SortingComparison: comparison } = loadAlgorithms();
  const input = [9, 2, 9, 5, 2, 1];
  const original = [...input];
  const results = comparison.benchmarkInputOrders('quick', input);
  const sorted = [...input].sort((a, b) => a - b);

  assert.deepEqual(Array.from(results, (item) => item.orderKey), [
    'ascending',
    'descending',
    'shuffled',
  ]);
  assert.deepEqual(input, original, 'Dữ liệu gốc đã bị thay đổi');
  assert.deepEqual(Array.from(results[0].values), sorted);
  assert.deepEqual(Array.from(results[1].values), [...sorted].reverse());
  for (const item of results) {
    assert.deepEqual(Array.from(item.values).sort((a, b) => a - b), sorted);
    assert.equal(item.values.length, input.length);
  }
});
