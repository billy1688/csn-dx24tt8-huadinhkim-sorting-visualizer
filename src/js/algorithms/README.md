# CÁC THUẬT TOÁN SẮP XẾP

| Thuật toán | Tệp mã nguồn | Trạng thái |
|---|---|---|
| Bubble Sort | `bubbleSort.js` | Hoàn thành |
| Selection Sort | `selectionSort.js` | Hoàn thành |
| Insertion Sort | `insertionSort.js` | Hoàn thành |
| Merge Sort | `mergeSort.js` | Hoàn thành |
| Quick Sort | `quickSort.js` | Hoàn thành |

Mỗi thuật toán nhận một mảng số và trả về danh sách các bước. Bộ trực quan
hóa đọc lần lượt các bước này để cập nhật cột, dòng mã giả và thống kê.

Các loại bước đang sử dụng:

- `compare`: so sánh hai phần tử.
- `select`: chọn phần tử đang xét hoặc giá trị nhỏ nhất tạm thời.
- `swap`: hoán đổi hai phần tử.
- `overwrite`: dịch chuyển và ghi đè giá trị.
- `insert`: chèn giá trị vào vị trí phù hợp.
- `pivot`: chọn phần tử chốt của Quick Sort.
- `range`: đánh dấu đoạn mảng đang được xử lý.
- `markSorted`: đánh dấu phần tử đã đúng vị trí.
- `complete`: kết thúc thuật toán.
