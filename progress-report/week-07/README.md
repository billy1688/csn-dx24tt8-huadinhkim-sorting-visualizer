# BÁO CÁO TIẾN ĐỘ TUẦN 07

## 1. Thông tin chung

- Học viên: huadinhkim
- Mã lớp: DX24TT8
- Đề tài: Trực quan hóa và so sánh các thuật toán sắp xếp
- Nội dung tuần: Hoàn thiện lý thuyết, kiểm thử và sản phẩm
- Thời gian báo cáo: [Điền ngày bắt đầu và kết thúc tuần]

## 2. Mục tiêu

- Xây dựng khu vực lý thuyết giúp người dùng ôn tập.
- Giúp phân biệt các thuật toán thường bị nhầm lẫn.
- Kiểm tra tính đầy đủ của chức năng và mã nguồn.
- Hoàn thiện tài liệu cài đặt, sử dụng và báo cáo.
- Chuẩn bị phiên bản sản phẩm cuối để nộp.

## 3. Công việc đã thực hiện

### 3.1. Xây dựng chế độ Lý thuyết

Mỗi thuật toán được trình bày bằng:

- Từ khóa ghi nhớ.
- Câu mô tả ngắn.
- Ý tưởng cốt lõi.
- Ví dụ liên tưởng trong đời sống.
- Các bước thực hiện.
- Dấu hiệu nhận biết trong mã giả.
- Nội dung phân biệt với thuật toán dễ nhầm.
- Độ phức tạp và đặc tính thuật toán.
- Nút chuyển trực tiếp sang chế độ mô phỏng.

Quy tắc ghi nhớ được sử dụng:

| Thuật toán | Từ khóa | Câu nhớ |
|---|---|---|
| Bubble Sort | Nổi | So đôi kề nhau, số lớn nổi dần về cuối |
| Selection Sort | Chọn | Chọn số nhỏ nhất và đặt vào đầu |
| Insertion Sort | Chèn | Lấy một phần tử và chèn vào đoạn đã xếp |
| Merge Sort | Trộn | Chia đôi, sắp từng nửa rồi trộn lại |
| Quick Sort | Chốt | Chọn pivot, chia giá trị sang hai phía |

### 3.2. Phân biệt các thuật toán

- Bubble Sort đổi chỗ nhiều cặp liền kề; Selection Sort tìm xong phần tử nhỏ
  nhất rồi mới đổi chỗ.
- Selection Sort tìm nhỏ nhất trong toàn bộ đoạn còn lại; Insertion Sort lấy
  phần tử hiện tại và chèn vào đoạn bên trái.
- Merge Sort chia theo vị trí giữa rồi trộn; Quick Sort chia theo giá trị chốt
  và không có bước trộn.

### 3.3. Hoàn thiện tài liệu

- Cập nhật báo cáo tiến độ các tuần.
- Viết hướng dẫn cài đặt và chạy chương trình.
- Mô tả cấu trúc thư mục và chức năng từng file.
- Bổ sung hướng dẫn xử lý các lỗi thường gặp.
- Kiểm tra tên file và đường dẫn phân biệt chữ hoa, chữ thường.

## 4. Kiểm thử tổng thể

| Nhóm kiểm thử | Nội dung | Kết quả |
|---|---|---|
| Dữ liệu | Nhập tay, tạo ngẫu nhiên, dữ liệu sai | Đạt |
| Thuật toán | Năm thuật toán cho kết quả tăng dần | Đạt |
| Điều khiển | Chạy, dừng, tiếp tục, từng bước, đặt lại | Đạt |
| Trực quan | Màu sắc, mã giả, mô tả và thống kê | Đạt |
| So sánh | Năm thuật toán và ba dạng dữ liệu | Đạt |
| Lý thuyết | Chuyển thuật toán và hiển thị đúng nội dung | Đạt |
| Giao diện | Máy tính và màn hình nhỏ | Đạt |
| Mã nguồn | Kiểm tra cú pháp JavaScript | Đạt |

## 5. Kết quả cuối cùng

Sản phẩm hoàn thiện gồm bốn chế độ:

1. **Trực quan:** quan sát từng bước của một thuật toán.
2. **So sánh thuật toán:** chạy năm thuật toán trên cùng dữ liệu.
3. **So sánh dữ liệu:** chạy một thuật toán trên ba thứ tự đầu vào.
4. **Lý thuyết:** tra cứu, ghi nhớ và phân biệt thuật toán.

Ứng dụng được xây dựng bằng HTML, CSS và JavaScript thuần, không cần backend
hoặc cơ sở dữ liệu. Người dùng có thể chạy trực tiếp bằng trình duyệt.

## 6. Ưu điểm

- Giao diện trực quan, có mã giả và giải thích từng bước.
- Cho phép người dùng chủ động điều khiển quá trình học.
- Kết hợp mô phỏng, lý thuyết và thực nghiệm trong một chương trình.
- Hỗ trợ đủ năm thuật toán theo phạm vi đề tài.
- Không cần cài đặt nhiều phần mềm hoặc kết nối cơ sở dữ liệu.
- Có thể mở rộng thêm thuật toán trong tương lai.

## 7. Hạn chế

- Thời gian đo phụ thuộc trình duyệt, thiết bị và tiến trình đang chạy.
- Số lượng phần tử được giới hạn để hoạt ảnh dễ quan sát.
- Quick Sort hiện sử dụng phần tử cuối làm pivot nên có thể gặp trường hợp xấu.
- Chưa lưu lịch sử các lần thực nghiệm.
- Chưa xuất bảng kết quả thành CSV hoặc hình ảnh.

## 8. Hướng phát triển

- Thêm Heap Sort, Shell Sort và Counting Sort.
- Cho phép chọn chiến lược pivot của Quick Sort.
- Xuất kết quả thực nghiệm thành CSV.
- Lưu nhiều lần chạy để tính kết quả trung bình.
- Bổ sung câu hỏi trắc nghiệm để tự kiểm tra kiến thức.

## 9. Kết luận

Đồ án đã vận dụng kiến thức cấu trúc dữ liệu và giải thuật vào một ứng dụng
web có khả năng mô phỏng, phân tích và hỗ trợ học tập. Quá trình xây dựng giúp
hiểu rõ hơn cách thuật toán thay đổi dữ liệu, sự khác biệt về số thao tác và
ảnh hưởng của cấu trúc đầu vào đến hiệu quả thực hiện.

