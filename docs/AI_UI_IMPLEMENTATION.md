# Tài liệu giao diện AI thực thi — Cinestar Huế

## 1. Mục đích

Tài liệu mô tả hướng dẫn giao diện dành cho AI/nhóm thiết kế và phần UI đã được dựng trong prototype. Tài liệu giúp tái tạo trải nghiệm nhất quán mà không nhầm các nội dung minh họa với thông tin kinh doanh đã xác thực.

## 2. Prompt/brief giao diện

> Thiết kế website rạp chiếu phim Cinestar Huế, ưu tiên trải nghiệm đặt vé nhanh trên desktop và mobile. Trang cần có banner ứng dụng, header thương hiệu, hành động Đặt vé/Bắp nước, menu lịch chiếu/khuyến mãi/dịch vụ/giới thiệu, chọn cụm rạp và chọn ngôn ngữ. Nêu rõ tên rạp, thành phố và địa chỉ; có hero phim, lịch chiếu chia ba tab, chọn ngày/giờ/phòng, sơ đồ ghế SVG phân biệt ghế trống/VIP/đã bán/đang giữ, tính giá và combo. Bổ sung bảng giá tham khảo, bản đồ có ghi chú độ chính xác, ưu đãi, dịch vụ giải trí, footer sitemap và thanh điều hướng nhanh trên mobile. Dùng nhận diện tối màu điện ảnh với màu vàng ấm làm điểm nhấn, typography dễ đọc, trạng thái tương tác rõ, keyboard accessibility và reduced-motion. Không giả vờ có backend/thanh toán thật; mọi dữ liệu demo phải được ghi chú.

## 3. Hướng nghệ thuật

- **Thương hiệu:** Cinestar; slogan “BE HAPPY, BE A STAR”.
- **Màu nền:** than đậm `#090b12`, bề mặt `#11141c` / `#171a23`.
- **Màu nhấn Cinestar:** vàng ấm `#f2c64b`.
- **Màu trạng thái:** xanh/vàng cho ghế được chọn; tím cho VIP; vàng cam cho ghế đang được giữ; trạng thái đã đặt giảm độ sáng.
- **Typography:** DM Sans cho nội dung và Space Grotesk cho tiêu đề/nhấn.
- **Hình ảnh:** poster/backdrop mang không khí phim; hiện dùng ảnh từ Unsplash làm ảnh minh họa bên ngoài.
- **Chuyển động:** Framer Motion cho hero, toast và modal; CSS transition cho thao tác nhỏ.

Màu trong giao diện không được dùng làm cách duy nhất để nhận biết trạng thái: sơ đồ SVG còn cung cấp số ghế, aria-label, `aria-pressed` và trạng thái vô hiệu.

## 4. Sitemap và cấu trúc trang

1. Banner thông báo ứng dụng.
2. Header:
   - Logo Cinestar và slogan.
   - Hành động Đặt vé / Bắp nước.
   - Menu lịch chiếu, khuyến mãi, sự kiện, dịch vụ, giới thiệu.
   - Bộ chọn cụm rạp, ngôn ngữ và đăng nhập.
3. Thông tin rạp: tên, thành phố, địa chỉ, giờ mở cửa minh họa, bảng giá.
4. Hero phim nổi bật và carousel chọn phim.
5. Lịch chiếu:
   - Tab đang chiếu / sắp chiếu / suất đặc biệt.
   - Ngày, suất chiếu và cấu hình Standard / IMAX / VIP / Couple.
6. Sơ đồ ghế và trạng thái giữ ghế.
7. Đơn hàng: danh sách ghế, giá, combo, countdown và xác nhận.
8. Bản đồ tham khảo.
9. Ưu đãi và dịch vụ giải trí.
10. Footer slogan, hành động nhanh, sitemap và ghi chú pháp lý.
11. Trạng thái mobile có quick navigation cố định cạnh dưới.

## 5. Tương tác quan trọng

| Thành phần | Hành vi |
| --- | --- |
| Chọn cụm rạp | Cập nhật thông tin cơ bản; bản đồ ngoài Huế hiện là trạng thái chưa cập nhật. |
| VN/ENG | Chuyển một số nhãn UI; chưa dịch đầy đủ nội dung. |
| Tab lịch chiếu | Lọc phim theo nhóm tương ứng; trạng thái tab có `aria-selected`. |
| Chọn phim | Cập nhật hero và phim gắn với luồng đặt vé. |
| Chọn ngày/suất | Xóa ghế giữ trước đó để tránh nhầm lịch. |
| Chọn cấu hình phòng | Thay đổi hệ số giá và tên phòng trong tóm tắt. |
| Sơ đồ SVG | Click/tap hoặc Enter/Space để chọn ghế; ghế đã đặt/đang giữ không thao tác được. |
| Chọn combo | Thêm/bỏ 89.000đ trong tổng demo. |
| Hết countdown | Bỏ ghế và combo, thông báo cho khách. |
| Xác nhận | Lưu vé demo vào LocalStorage, mở modal tóm tắt. |
| Mobile quick nav | Nhảy đến lịch chiếu, bắp nước, đặt vé hoặc thông báo tài khoản. |

## 6. Responsive behavior

- **Desktop (trên 900px):** header đủ menu, schedule và promotions theo lưới nhiều cột.
- **Tablet (621–900px):** giảm padding, chia movie card hai cột, footer rút gọn lưới.
- **Mobile (tối đa 620px):** header cô đọng, menu chữ thay bằng bottom quick nav, nội dung một cột, seat map SVG co theo chiều ngang, nút CTA đủ rộng.
- Footer mobile cần chừa khoảng trống cho bottom navigation.
- Tôn trọng `prefers-reduced-motion` ở animation CSS; khi mở rộng Framer Motion cần dùng `useReducedMotion`.

## 7. Thành phần/implementation hiện có

| Phần UI | Vị trí mã nguồn |
| --- | --- |
| Điều phối ứng dụng, state và dữ liệu | `src/features/cinema/CinemaApp.jsx` |
| Layout và responsive styling | `src/features/cinema/CinemaApp.css` |
| Font/reset/accessibility focus | `src/index.css` |
| Root application | `src/App.jsx` |
| Entry point và PWA registration | `src/main.jsx` |

Trong file cinema hiện tại, phần lớn khu vực dùng class CSS và JSX cùng file. Khi dự án tăng quy mô, nên tách Header, Schedule, SeatMap, Checkout, Promotions, Footer, Dashboard và các dialog thành components riêng.

## 8. Nội dung giả lập cần xác minh

- Lịch phim và thời lượng/độ tuổi: dữ liệu mẫu.
- Giá vé, hệ số phòng và combo: dữ liệu mẫu, không phải bảng giá chính thức.
- Ưu đãi và giờ mở cửa: nội dung minh họa.
- Địa chỉ Huế theo brief; tọa độ OpenStreetMap là tham khảo, cần xác minh rạp thật.
- QR/mã vé và trạng thái ghế realtime: chỉ demo cục bộ.
- Các rạp Quốc Thanh, Đà Lạt, Mỹ Tho: tên mẫu; một số địa chỉ chưa cập nhật.
- Thông tin công ty/pháp lý: không được suy diễn; hiện chưa cung cấp chi tiết thật.

## 9. Checklist review thiết kế

- [ ] Hệ thống phân cấp thông tin làm nổi bật phim, rạp và hành động đặt vé.
- [ ] Contrast văn bản/trạng thái đủ đọc trong môi trường ánh sáng thấp.
- [ ] Tab, nút và ghế có focus indicator; aria label mô tả trạng thái.
- [ ] Không dùng nhãn “realtime” như một cam kết khi chưa có server đồng bộ.
- [ ] Không đưa giá/vị trí chưa xác minh thành thông tin chính thức.
- [ ] Mobile không bị che nội dung bởi sticky quick nav.
- [ ] Modal có tiêu đề, trạng thái đóng và nội dung dễ đọc trên màn nhỏ.
- [ ] Ảnh bên ngoài có fallback/placeholder nếu không tải được.
- [ ] Kiểm tra reduced motion và không làm người dùng phụ thuộc animation.
