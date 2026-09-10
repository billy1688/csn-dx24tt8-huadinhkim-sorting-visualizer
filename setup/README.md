# HƯỚNG DẪN CÀI ĐẶT VÀ CHẠY CHƯƠNG TRÌNH

## 1. Giới thiệu

Sorting Lab là ứng dụng web trực quan hóa và so sánh năm thuật toán sắp xếp:

1. Bubble Sort.
2. Selection Sort.
3. Insertion Sort.
4. Merge Sort.
5. Quick Sort.

Chương trình được xây dựng bằng HTML, CSS và JavaScript thuần. Ứng dụng không
sử dụng backend, cơ sở dữ liệu hoặc thư viện bắt buộc.

## 2. Yêu cầu

- Máy tính có trình duyệt Google Chrome, Microsoft Edge hoặc Firefox phiên bản
  tương đối mới.
- Git nếu muốn tải và cập nhật source bằng lệnh.
- Visual Studio Code và tiện ích Live Server là lựa chọn khuyến nghị, không bắt
  buộc.

## 3. Tải source

### 3.1. Sử dụng SSH

```bash
git clone git@github.com:billy1688/csn-dx24tt8-huadinhkim-sorting-visualizer.git
cd csn-dx24tt8-huadinhkim-sorting-visualizer
```

### 3.2. Sử dụng HTTPS

```bash
git clone https://github.com/billy1688/csn-dx24tt8-huadinhkim-sorting-visualizer.git
cd csn-dx24tt8-huadinhkim-sorting-visualizer
```

Nếu tên repository thực tế khác, thay địa chỉ trên bằng địa chỉ được sao chép
từ nút **Code** trên GitHub.

## 4. Cách chạy

### Cách 1: Mở trực tiếp

Mở file sau bằng trình duyệt:

```text
src/index.html
```

Ứng dụng không cần chạy `npm install` và không cần cấu hình cơ sở dữ liệu.

### Cách 2: Sử dụng Live Server

1. Mở repository bằng Visual Studio Code.
2. Cài tiện ích **Live Server**.
3. Nhấn chuột phải vào `src/index.html`.
4. Chọn **Open with Live Server**.

### Cách 3: Sử dụng Python HTTP Server

Chạy tại thư mục gốc của repository:

```bash
python3 -m http.server 8000 --directory src
```

Sau đó truy cập:

```text
http://localhost:8000
```

Dừng máy chủ bằng tổ hợp phím `Ctrl + C`.

## 5. Cấu trúc mã nguồn

```text
src/
├── index.html
├── css/
│   └── style.css
└── js/
    ├── app.js
    ├── visualizer.js
    ├── comparison.js
    ├── theory.js
    └── algorithms/
        ├── bubbleSort.js
        ├── selectionSort.js
        ├── insertionSort.js
        ├── mergeSort.js
        └── quickSort.js
```

| File | Chức năng |
|---|---|
| index.html | Khai báo các thành phần giao diện |
| style.css | Bố cục, màu sắc và giao diện đáp ứng |
| app.js | Quản lý trạng thái và sự kiện người dùng |
| visualizer.js | Hiển thị cột, màu sắc và dòng mã giả |
| comparison.js | Đo và so sánh kết quả thuật toán |
| theory.js | Lưu nội dung lý thuyết của năm thuật toán |
| algorithms/*.js | Tạo danh sách bước cho từng thuật toán |

## 6. Hướng dẫn sử dụng

### 6.1. Chế độ Trực quan

1. Nhập dữ liệu hoặc tạo mảng ngẫu nhiên.
2. Chọn thuật toán.
3. Chọn tốc độ.
4. Nhấn **Bắt đầu** hoặc **Từng bước**.
5. Theo dõi biểu đồ, mã giả và thống kê.

### 6.2. Chế độ So sánh thuật toán

1. Nhập hoặc tạo một mảng.
2. Chọn **So sánh thuật toán**.
3. Chương trình chạy năm thuật toán trên cùng dữ liệu.
4. Chọn tiêu chí để thay đổi biểu đồ kết quả.

### 6.3. Chế độ So sánh dữ liệu

1. Chọn một thuật toán.
2. Chương trình tạo dữ liệu tăng dần, giảm dần và xáo trộn.
3. Nhấn **Chạy 3 mô phỏng** để quan sát đồng thời.
4. So sánh số lần so sánh, thao tác và thời gian.

### 6.4. Chế độ Lý thuyết

1. Chọn **Lý thuyết**.
2. Chọn thuật toán cần ôn tập.
3. Đọc câu ghi nhớ, nguyên lý, các bước và dấu hiệu nhận biết.
4. Nhấn **Xem mô phỏng** để chuyển sang minh họa thuật toán đó.

## 7. Quy định dữ liệu đầu vào

- Từ 5 đến 30 phần tử.
- Mỗi phần tử là số nguyên từ 1 đến 100.
- Các số được phân cách bằng dấu phẩy, dấu chấm phẩy hoặc khoảng trắng.

Ví dụ:

```text
42, 18, 76, 31, 55, 12, 68, 24
```

## 8. Kiểm tra source trước khi push

Kiểm tra cú pháp tất cả file JavaScript:

```bash
find src/js -type f -name "*.js" -exec node --check {} \;
```

Kiểm tra các file chưa được Git theo dõi:

```bash
git status
```

Cập nhật toàn bộ source:

```bash
git add src setup progress-report
git commit -m "docs: update setup and progress reports"
git push
```

## 9. Lỗi thường gặp

### Giao diện không có thay đổi mới

- Nhấn `Ctrl + F5` để tải lại và bỏ bộ nhớ đệm.
- Kiểm tra file mới đã được `git add` và commit hay chưa.
- Kiểm tra đường dẫn trong `src/index.html`.

### Một chế độ không hoạt động

- Mở công cụ dành cho nhà phát triển bằng phím `F12`.
- Chọn thẻ **Console** và kiểm tra dòng lỗi màu đỏ.
- Kiểm tra file JavaScript tương ứng có tồn tại trên GitHub hay không.
- Lưu ý GitHub và máy chủ Linux phân biệt chữ hoa, chữ thường trong tên file.

### GitHub Actions có dấu đỏ

1. Mở thẻ **Actions**.
2. Chọn lần chạy có dấu đỏ.
3. Chọn job và bước bị lỗi.
4. Đọc dòng lỗi đầu tiên phía trên `Process completed with exit code 1`.

Dấu đỏ của workflow kiểm tra không làm mất commit. Tuy nhiên, cần sửa file
thiếu hoặc lỗi cú pháp để bảo đảm chương trình đầy đủ.

### Git push yêu cầu mật khẩu

GitHub không sử dụng mật khẩu tài khoản cho thao tác Git qua HTTPS. Có thể
chuyển remote sang SSH:

```bash
git remote set-url origin git@github.com:billy1688/csn-dx24tt8-huadinhkim-sorting-visualizer.git
ssh -T git@github.com
git push
```

## 10. Thông tin

- Học viên: huadinhkim
- Mã lớp: DX24TT8
- Công nghệ: HTML5, CSS3, JavaScript, Git và GitHub

