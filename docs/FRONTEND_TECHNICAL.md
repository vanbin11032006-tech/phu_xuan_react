# Tài liệu kỹ thuật AI Frontend — Cinestar Huế Cinema Web App

> Tài liệu mô tả trạng thái hiện tại của prototype frontend trong repository. Tên thương hiệu, giá vé, lịch chiếu, chương trình ưu đãi, trạng thái ghế và dữ liệu báo cáo được dùng cho mục đích trình diễn; đây không phải hệ thống chính thức của Cinestar.

## 1. Tổng quan

Ứng dụng mô phỏng website rạp phim, tập trung vào trải nghiệm tra cứu phim và đặt vé:

- Trang giới thiệu cụm rạp Cinestar Huế với chọn cụm rạp và chuyển đổi nhãn giao diện VN/ENG.
- Danh mục phim theo ba trạng thái: đang chiếu, sắp chiếu, suất đặc biệt.
- Chọn ngày, suất chiếu, cấu hình phòng, ghế ngồi và combo.
- Tính giá ở frontend, bộ đếm giữ ghế và modal vé điện tử minh họa.
- Bản đồ OpenStreetMap, khu vực khuyến mãi/dịch vụ và footer sitemap.
- PWA cơ bản, cache ứng dụng và lưu vé trong LocalStorage.

### Công nghệ

| Thành phần | Công nghệ |
| --- | --- |
| UI | React 19, JSX |
| Bundler / dev server | Vite 8 |
| Chuyển động | Framer Motion |
| Sơ đồ ghế | SVG tương tác |
| Lưu vé | LocalStorage |
| Hỗ trợ offline | Web App Manifest, Service Worker, Cache API |
| Lint | Oxlint |

## 2. Cấu trúc mã nguồn liên quan

```text
src/
  App.jsx                           # Gắn CinemaApp vào ứng dụng React
  main.jsx                          # Khởi chạy React và đăng ký Service Worker
  index.css                        # Reset và kiểu nền dùng chung
  features/
    cinema/
      CinemaApp.jsx                # Dữ liệu, trạng thái, luồng đặt vé và JSX
      CinemaApp.css                # Giao diện desktop/mobile
public/
  manifest.webmanifest             # Metadata PWA
  service-worker.js                # Cài đặt, cập nhật và cache ứng dụng
  icons.svg
  favicon.svg
index.html                         # Metadata HTML và liên kết manifest
```

## 3. Cách cài đặt và chạy

Yêu cầu Node.js tương thích với phiên bản Vite trong `package.json`.

```bash
npm install
npm run dev
```

Mở địa chỉ local mà Vite hiển thị (thường là `http://localhost:5173`).

Các lệnh khác:

```bash
npm run build     # Tạo bản production trong dist/
npm run preview   # Chạy thử bản production
npm run lint      # Kiểm tra mã nguồn với Oxlint
```

Service Worker yêu cầu secure context: HTTPS trên môi trường triển khai hoặc `localhost` khi phát triển. Sau lần tải trang đầu có mạng, trình duyệt có thể cài đặt worker và cache app shell.

## 4. Thành phần giao diện

`CinemaApp.jsx` là điểm điều phối chính. Dữ liệu phim, rạp, lịch chiếu, khuyến mãi và cấu hình phòng hiện được khai báo ngay trong file này; các thành phần con tập trung vào hiển thị và tương tác.

### Header và điều hướng

- Banner giới thiệu ứng dụng.
- Nút đặt vé và bắp nước.
- Link đến lịch chiếu, khuyến mãi, sự kiện, dịch vụ và thông tin rạp.
- Chọn một trong các cụm rạp mẫu; chọn rạp cập nhật phần giới thiệu và link tìm trên bản đồ.
- Nút VN/ENG đổi một số nhãn điều hướng và danh mục phim. Đây chưa phải bản dịch đầy đủ toàn trang.
- Điều hướng nhanh cố định ở cạnh dưới trên màn hình nhỏ.

### Thông tin rạp và lịch phim

- Rạp Huế hiển thị địa chỉ `25 Hai Bà Trưng, Phường Thuận Hoá, TP. Huế`.
- Bảng giá mở trong modal; mọi mức giá hiện là ví dụ.
- Tab lịch chiếu lấy phim từ dữ liệu tĩnh và lọc theo `movieSchedule`.
- Chọn một phim trong danh sách hoặc hero sẽ cập nhật phim đang dùng cho phần đặt vé.

### Đặt vé và sơ đồ ghế SVG

Sơ đồ có 7 hàng (`A`–`G`), mỗi hàng 14 ghế. Mỗi ghế là nhóm SVG `<g>` có vai trò button, nhãn truy cập và trạng thái nhấn. Enter hoặc Space kích hoạt ghế đang focus; ghế đã đặt hoặc bị mock lock không focus/chọn được.

| Trạng thái | Nguồn | Hiển thị |
| --- | --- | --- |
| Còn trống | Mặc định | Ghế tiêu chuẩn |
| Ghế VIP | Hàng F và G | Tông tím |
| Đang chọn | State `selectedSeats` | Tông vàng/xanh chủ đạo |
| Đã đặt | `initialUnavailable` | Mờ, vô hiệu hóa |
| Đang được giữ | State `liveLockedSeats` | Vàng cam, vô hiệu hóa |

Logic chọn ghế giới hạn tối đa 8 ghế mỗi đơn. Trước khi thêm ghế, ứng dụng kiểm tra hàng ghế và cảnh báo nếu thao tác để lại đúng một ghế trống giữa hai ghế đã chọn/đã đặt. Ghế bị mock lock cũng được đưa vào tập ghế không thể chọn.

### Cấu hình và tính giá

`roomModes` định nghĩa hệ số cho Standard, IMAX, VIP và Couple. Giá ghế cơ bản/VIP được nhân với hệ số cấu hình phòng; combo được cộng vào tổng. Công thức hiện hành:

```text
Tổng = (số ghế thường × 105.000đ × hệ số phòng)
     + (số ghế VIP × 145.000đ × hệ số phòng)
     + (89.000đ nếu chọn combo)
```

Giá chưa bao gồm khuyến mại, phí cổng thanh toán hoặc quy tắc giá theo ngày trong tuần. Modal bảng giá sử dụng một bảng ví dụ riêng.

### Giữ ghế và xác nhận

- Khi có ghế được chọn, interval cập nhật bộ đếm 5 phút mỗi giây.
- Hết giờ sẽ xóa các ghế đang chọn, bỏ combo và báo trạng thái.
- Xác nhận tạo object vé mẫu, lưu JSON dưới key `phu-xuan-cinema-ticket` trong LocalStorage rồi mở modal.
- Mã vé và QR trong modal chỉ là hình minh họa, không có giá trị soát vé.

### Bản đồ

Khu vực cuối trang nhúng OpenStreetMap với vị trí tham khảo tại trung tâm Huế. Link “Mở bản đồ lớn” tìm kiếm theo địa chỉ rạp đã chọn. Với các cụm rạp mẫu khác, bản đồ nhúng được thay bằng thông báo đang cập nhật.

Tọa độ mặc định chưa được xác minh là vị trí chính xác của rạp; cần cập nhật tọa độ/địa chỉ trước khi đưa lên môi trường thật.

## 5. Mô phỏng realtime

Một interval phía trình duyệt thay đổi danh sách ghế bị giữ mỗi 5 giây. Đây là hiệu ứng demo chạy độc lập trên từng phiên, không đồng bộ giữa người dùng và không đại diện cho trạng thái ghế trên máy chủ.

Khi triển khai thật, cần thay mô phỏng bằng:

1. API lấy trạng thái ghế theo suất chiếu.
2. API giữ ghế có thời hạn, xác thực người dùng và trả lỗi xung đột nếu ghế đã bị giữ.
3. WebSocket hoặc SSE để đẩy thay đổi từ server.
4. Server là nguồn sự thật cho trạng thái ghế, giá, thời hạn giữ ghế và kết quả thanh toán.

## 6. PWA và dữ liệu offline

### Manifest

`public/manifest.webmanifest` khai báo tên ứng dụng, màu giao diện, chế độ `standalone`, start URL và icon SVG.

### Service Worker

`public/service-worker.js`:

- Cache app shell khi cài đặt.
- Dọn các cache có tên cũ khi activate.
- Trả phản hồi đã cache trước; nếu chưa có thì thử mạng và lưu phản hồi GET.
- Khi fetch lỗi, fallback về `index.html` để hỗ trợ điều hướng SPA.

### Vé điện tử offline

Vé được lưu trong LocalStorage, có thể đọc lại trên cùng trình duyệt/thiết bị. Bản hiện tại chưa có giao diện “Vé của tôi” để truy xuất vé cũ, chưa có đồng bộ giữa thiết bị và chưa bảo đảm dữ liệu vé trong trường hợp người dùng xóa dữ liệu trình duyệt.

Không lưu thông tin thanh toán, mật khẩu hoặc dữ liệu nhạy cảm trong LocalStorage. Vé production cần được tạo/xác nhận từ backend và có QR ký số hoặc mã tra cứu máy chủ.

## 7. Dashboard và báo cáo

Dashboard chứa các thẻ KPI, biểu đồ cột, heatmap và danh sách phim phổ biến với dữ liệu tĩnh để trình diễn. Các chỉ số này không lấy từ giao dịch thực. Nếu cần bật dashboard trong giao diện, cần bổ sung điểm điều hướng quản trị và phân quyền; hiện dashboard component không thay thế hệ thống phân tích production.

## 8. Các điểm cần hoàn thiện trước khi vận hành thật

1. Backend/API cho danh mục phim, rạp, phòng, lịch chiếu, giá và khuyến mãi.
2. Xác minh địa chỉ, tọa độ bản đồ, giờ hoạt động và thông tin pháp lý.
3. Tích hợp realtime lock server-side, xử lý xung đột và khôi phục lock khi reconnect.
4. Tích hợp đăng nhập/thành viên, bảo vệ tuyến quản trị và chính sách quyền riêng tư.
5. Tích hợp cổng thanh toán; chỉ xác nhận vé sau khi server nhận webhook hợp lệ.
6. Thay dữ liệu QR/mã vé demo bằng vé điện tử được ký hoặc xác thực trên server.
7. Hoàn thiện dịch thuật toàn diện, kiểm tra quyền truy cập bàn phím/đọc màn hình và nội dung mobile.
8. Tạo icon PWA raster theo kích thước khuyến nghị và kiểm thử install/offline trên trình duyệt mục tiêu.
9. Rà soát chiến lược cache khi phát hành; cần tránh cache dữ liệu API cá nhân hoặc nội dung nhạy cảm.

## 9. Kiểm tra hiện tại

Các lệnh kiểm tra được dùng trong quá trình phát triển:

```bash
npm run build
npm run lint
```

Build phải hoàn tất trước khi phát hành. Lint hiện có thể hiển thị cảnh báo ở một số file tính năng món ăn cũ, không thuộc phần cinema.
