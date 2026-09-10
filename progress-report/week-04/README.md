# BÁO CÁO TIẾN ĐỘ TUẦN 04

## 1. Thông tin chung

- Học viên: huadinhkim
- Mã lớp: DX24TT8
- Đề tài: Trực quan hóa và so sánh các thuật toán sắp xếp
- Nội dung tuần: Hoàn thiện Merge Sort và Quick Sort
- Thời gian báo cáo: [Điền ngày bắt đầu và kết thúc tuần]

## 2. Mục tiêu

- Tìm hiểu nguyên lý chia để trị.
- Cài đặt Merge Sort và Quick Sort bằng JavaScript.
- Chuyển quá trình thực hiện thuật toán thành danh sách bước mô phỏng.
- Đồng bộ dữ liệu, hoạt ảnh, mã giả và thống kê.
- Hoàn thiện đủ năm thuật toán của đề tài.

## 3. Công việc đã thực hiện

### 3.1. Xây dựng Merge Sort

Merge Sort chia mảng thành các đoạn nhỏ cho đến khi mỗi đoạn chỉ còn một
phần tử. Các đoạn sau đó được trộn lại theo thứ tự tăng dần.

Các bước chính:

1. Chia mảng thành hai nửa.
2. Sắp xếp đệ quy nửa bên trái.
3. Sắp xếp đệ quy nửa bên phải.
4. So sánh phần tử đầu của hai nửa.
5. Ghi phần tử nhỏ hơn vào mảng tạm.
6. Chép kết quả đã trộn về mảng chính.

Chương trình ghi nhận các hành động `compare`, `overwrite`, `range`,
`markSorted` và `complete` để phục vụ hoạt ảnh.

### 3.2. Xây dựng Quick Sort

Quick Sort chọn phần tử cuối đoạn làm chốt `pivot`, đưa các giá trị nhỏ hơn
hoặc bằng chốt sang bên trái và đưa các giá trị lớn hơn sang bên phải.

Các bước chính:

1. Chọn phần tử chốt.
2. Duyệt đoạn dữ liệu cần phân hoạch.
3. So sánh từng phần tử với chốt.
4. Hoán đổi các phần tử về đúng phía.
5. Đưa chốt vào vị trí phân cách.
6. Sắp xếp đệ quy hai phần còn lại.

Chương trình ghi nhận các hành động `pivot`, `compare`, `swap`,
`markSorted` và `complete`.

### 3.3. Tích hợp vào giao diện

- Bổ sung Merge Sort và Quick Sort vào danh sách lựa chọn.
- Hiển thị mã giả riêng cho từng thuật toán.
- Đánh dấu dòng mã giả tương ứng với bước đang chạy.
- Hiển thị số lần so sánh và số thao tác dữ liệu.
- Hiển thị độ phức tạp tốt nhất, trung bình, xấu nhất và bộ nhớ.

## 4. Kết quả đạt được

Ứng dụng đã hỗ trợ đủ năm thuật toán:

1. Bubble Sort.
2. Selection Sort.
3. Insertion Sort.
4. Merge Sort.
5. Quick Sort.

Merge Sort và Quick Sort cho kết quả tăng dần chính xác với dữ liệu ngẫu
nhiên, dữ liệu tăng dần, dữ liệu giảm dần và dữ liệu có giá trị trùng nhau.

## 5. Kiểm thử

| Trường hợp | Kết quả mong đợi | Kết quả |
|---|---|---|
| Mảng ngẫu nhiên | Sắp xếp tăng dần | Đạt |
| Mảng tăng dần | Giữ nguyên thứ tự | Đạt |
| Mảng giảm dần | Chuyển thành tăng dần | Đạt |
| Có phần tử trùng | Không mất phần tử | Đạt |
| Thay đổi tốc độ | Không thay đổi kết quả | Đạt |

## 6. Khó khăn và cách giải quyết

- Thuật toán đệ quy khó thể hiện trực tiếp bằng hoạt ảnh. Giải pháp là chạy
  thuật toán trước để tạo danh sách bước, sau đó bộ điều khiển phát lại.
- Merge Sort không chỉ hoán đổi mà còn ghi giá trị vào mảng. Chương trình sử
  dụng bước `overwrite` để biểu diễn thao tác này.
- Quick Sort cần thể hiện rõ phần tử chốt. Chương trình sử dụng trạng thái
  `pivot` và màu đánh dấu riêng trong quá trình phân hoạch.

## 7. Kế hoạch tuần tiếp theo

- Hoàn thiện bộ điều khiển chạy, tạm dừng, tiếp tục và chạy từng bước.
- Tối ưu bố cục để mô phỏng, mã giả và thống kê xuất hiện cùng màn hình.
- Hoàn thiện giao diện trên máy tính và điện thoại.
- Kiểm tra việc chuyển đổi giữa năm thuật toán.

