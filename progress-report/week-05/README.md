# BÁO CÁO TIẾN ĐỘ TUẦN 05

## 1. Thông tin chung

- Học viên: huadinhkim
- Mã lớp: DX24TT8
- Đề tài: Trực quan hóa và so sánh các thuật toán sắp xếp
- Nội dung tuần: Hoàn thiện mô phỏng, bộ điều khiển và giao diện
- Thời gian báo cáo: [Điền ngày bắt đầu và kết thúc tuần]

## 2. Mục tiêu

- Hoàn thiện quá trình phát lại từng bước thuật toán.
- Cho phép người dùng chủ động điều khiển mô phỏng.
- Đồng bộ biểu đồ, mã giả, mô tả và thống kê.
- Tối ưu bố cục để theo dõi các thành phần trên cùng màn hình.
- Bảo đảm giao diện có thể sử dụng trên nhiều kích thước màn hình.

## 3. Công việc đã thực hiện

### 3.1. Hoàn thiện bộ điều khiển

Ứng dụng đã có các chức năng:

- **Bắt đầu:** tạo lại danh sách bước và chạy tự động.
- **Tạm dừng:** dừng tại bước hiện tại.
- **Tiếp tục:** phát tiếp từ bước đã dừng.
- **Từng bước:** thực hiện một bước sau mỗi lần nhấn.
- **Đặt lại:** khôi phục mảng ban đầu.
- **Tốc độ:** thay đổi khoảng chờ giữa các bước.
- **Áp dụng:** nhận danh sách số do người dùng nhập.
- **Tạo ngẫu nhiên:** sinh mảng theo số lượng đã chọn.

### 3.2. Đồng bộ các thành phần

Mỗi bước thuật toán chứa:

| Thuộc tính | Ý nghĩa |
|---|---|
| type | Loại hành động đang thực hiện |
| array | Trạng thái mảng tại bước hiện tại |
| indices | Các vị trí đang được tác động |
| codeLine | Dòng mã giả cần đánh dấu |
| comparisonsDelta | Số phép so sánh phát sinh |
| swapsDelta | Số thao tác dữ liệu phát sinh |
| description | Nội dung giải thích cho người dùng |

Bộ trực quan hóa đọc từng bước và cập nhật đồng thời biểu đồ, màu sắc, mã
giả, mô tả, số bước, số so sánh và số thao tác.

### 3.3. Quy ước màu sắc

- Màu xanh dương: phần tử chưa được xử lý.
- Màu vàng: phần tử đang được so sánh hoặc được chọn làm chốt.
- Màu đỏ: phần tử đang hoán đổi, chèn hoặc ghi lại.
- Màu xanh lá: phần tử đã được xác định đúng vị trí.

### 3.4. Tối ưu bố cục

Trên màn hình máy tính, giao diện được bố trí để người dùng có thể cùng lúc
quan sát:

1. Bộ điều khiển.
2. Biểu đồ mô phỏng.
3. Mã giả đang chạy.
4. Thống kê và độ phức tạp.

Trên màn hình nhỏ, các khu vực tự chuyển thành bố cục một cột để tránh chồng
chéo và vẫn giữ khả năng thao tác.

## 4. Kết quả đạt được

- Có thể chạy tự động hoặc quan sát từng bước.
- Thay đổi tốc độ không làm thay đổi kết quả sắp xếp.
- Mã giả được đánh dấu đúng theo hành động.
- Thống kê được cập nhật trong quá trình mô phỏng.
- Người dùng có thể nhập từ 5 đến 30 số nguyên.
- Giao diện hiển thị tốt trên máy tính và điện thoại.

## 5. Kiểm thử chức năng

| Chức năng | Cách kiểm tra | Kết quả |
|---|---|---|
| Bắt đầu | Chọn thuật toán và nhấn Bắt đầu | Đạt |
| Tạm dừng/tiếp tục | Dừng giữa quá trình rồi chạy tiếp | Đạt |
| Từng bước | Nhấn nhiều lần đến khi hoàn thành | Đạt |
| Đặt lại | Đặt lại sau khi đang chạy hoặc hoàn thành | Đạt |
| Nhập dữ liệu | Nhập dữ liệu hợp lệ và không hợp lệ | Đạt |
| Đổi thuật toán | Chuyển qua lại giữa năm thuật toán | Đạt |
| Điều chỉnh tốc độ | Thay đổi khi mô phỏng đang chạy | Đạt |

## 6. Khó khăn và cách giải quyết

- Nhiều bộ hẹn giờ có thể chạy đồng thời khi người dùng thao tác nhanh. Bộ
  điều khiển luôn hủy bộ hẹn giờ cũ trước khi tạo quá trình mới.
- Kích thước cột chênh lệch khi dữ liệu lớn hoặc nhỏ. Chiều cao được tính theo
  phần tử lớn nhất và có chiều cao tối thiểu để vẫn quan sát được.
- Mã giả của các thuật toán có số dòng khác nhau. Nội dung được tạo lại mỗi
  khi thay đổi thuật toán thay vì sử dụng một danh sách cố định.

## 7. Kế hoạch tuần tiếp theo

- Xây dựng chế độ so sánh năm thuật toán trên cùng dữ liệu.
- Xây dựng chế độ so sánh một thuật toán với nhiều dạng đầu vào.
- Xác định phương pháp đo số so sánh, thao tác và thời gian.
- Trình bày kết quả bằng biểu đồ và bảng.

