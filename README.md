# Phú Xuân Cinema — Advanced Cinema Web App

Giao diện ứng dụng đặt vé xem phim tương tác, xây dựng bằng React và Vite.

## Tài liệu nộp bài

1. [Tài liệu nghiệp vụ](./docs/BUSINESS_REQUIREMENTS.md)
2. [Tài liệu giao diện AI thực thi](./docs/AI_UI_IMPLEMENTATION.md)
3. [Tài liệu kỹ thuật AI Frontend](./docs/FRONTEND_TECHNICAL.md)
4. [Tài liệu kỹ thuật AI Admin](./docs/ADMIN_TECHNICAL.md)

## Cài đặt & chạy
```bash
npm install
npm run dev
```
Mở http://localhost:5173 để khám phá ứng dụng.

## Tính năng
- Trang thông tin Cinestar Huế với địa chỉ 25 Hai Bà Trưng, Phường Thuận Hoá, TP. Huế.
- Thanh thông báo ứng dụng, điều hướng lịch chiếu/khuyến mãi/dịch vụ, chọn cụm rạp và nút đổi VN/ENG.
- Tab phim đang chiếu, phim sắp chiếu và suất chiếu đặc biệt; bảng giá tham khảo theo đối tượng/ngày.
- Khám phá phim nổi bật, chuyển phim, tìm kiếm và xem thông tin suất chiếu.
- Chọn ngày, giờ chiếu và ghế trên sơ đồ SVG co giãn; hỗ trợ ghế thường, ghế VIP, keyboard navigation và trạng thái realtime mock.
- Giữ ghế có đếm ngược 5 phút, giới hạn 8 ghế và cảnh báo khi lựa chọn tạo ghế đơn bị bỏ trống.
- Chọn combo bắp nước, tính giá tức thời và hoàn tất luồng đặt vé mẫu.
- Vé điện tử có mã tham chiếu được lưu trong LocalStorage trên thiết bị.
- Dashboard minh họa doanh thu, tỷ lệ lấp đầy và mật độ suất chiếu.
- Khu vực khuyến mãi, dịch vụ giải trí, sitemap và thông tin cuối trang.
- Bản đồ OpenStreetMap nhúng; tọa độ hiển thị ở Huế là tham khảo, cần xác nhận vị trí rạp trước khi dùng thực tế.
- Mô phỏng real-time seat lock bằng cập nhật giả lập, cho thấy trạng thái ghế đang được người khác giữ.
- Hỗ trợ PWA/offline: app có manifest và service worker để lưu cache và hiển thị thông tin vé khi mất kết nối.
- Animation transition với Framer Motion cho hero, modal và toast.
- Giao diện responsive, hỗ trợ tìm kiếm bàn phím và tùy chọn giảm chuyển motion.

## Giới hạn bản demo
Đây là prototype frontend: trạng thái ghế, số liệu thống kê và seat lock là dữ liệu giả lập, không kết nối backend, WebSocket thực tế hay cổng thanh toán. Bảng giá, chương trình khuyến mãi, giờ mở cửa và dịch vụ chỉ là nội dung minh họa. Mã vé/QR chỉ minh họa, không dùng làm vé vào rạp thực tế.