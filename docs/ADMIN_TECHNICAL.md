# Tài liệu kỹ thuật AI Admin Frontend — Cinestar Huế

## 1. Mục tiêu và tình trạng

Tài liệu đặc tả kỹ thuật cho khu vực quản trị rạp: theo dõi doanh thu, lượng vé, mức lấp đầy, thời điểm đông khách và phim bán chạy.

Trong prototype, component `Dashboard` được định nghĩa trong `src/features/cinema/CinemaApp.jsx` và trình bày bằng class CSS dashboard trong `src/features/cinema/CinemaApp.css`. Dashboard đang dùng dữ liệu tĩnh để minh họa. Sau khi header được chuyển thành giao diện Cinestar public, chưa có route/login hoặc liên kết quản trị để truy cập dashboard trực tiếp; cần thêm lối vào được bảo vệ khi xây dựng phần admin.

## 2. Phạm vi tính năng admin

### Có trong bản trình diễn

- KPI: tổng doanh thu, vé bán ra, tỷ lệ lấp đầy và giá vé trung bình.
- Biểu đồ cột xu hướng doanh thu 12 tháng.
- Heatmap mật độ đặt vé theo ngày/khung suất.
- Danh sách phim được yêu thích với số vé minh họa.
- Nhãn thời gian và trạng thái cập nhật minh họa.

### Chưa có

- Đăng nhập, phân quyền, bảo vệ route hoặc audit log.
- Bộ lọc hoạt động thật theo thời gian, rạp, phòng, phim.
- Kết nối API, biểu đồ từ dữ liệu thật, tải báo cáo CSV/PDF.
- Tạo/sửa lịch chiếu, giá, khuyến mãi hoặc hoàn tiền.
- Realtime server push hay lưu truy vấn dashboard.

## 3. Người dùng và quyền

| Vai trò | Quyền đề xuất |
| --- | --- |
| Quản lý rạp | Chỉ xem báo cáo và vận hành các rạp được phân công |
| Nhân viên tài chính | Xem doanh thu, giao dịch và báo cáo đối soát |
| Nhân viên lịch chiếu | Xem suất chiếu/tình trạng phòng, không xem PII thanh toán |
| Quản trị hệ thống | Quản lý người dùng, quyền, cấu hình toàn hệ thống |

Quyền phải được xác thực ở backend cho mọi request; ẩn nút ở frontend không phải là kiểm soát truy cập.

## 4. Thiết kế frontend được đề xuất

### Route và layout

Khi bổ sung admin production:

```text
/admin
  /overview
  /reports/revenue
  /reports/occupancy
  /screenings
  /movies
  /promotions
```

- Tạo `AdminLayout` riêng với sidebar, toolbar, selector rạp, range ngày và account menu.
- Tách `Dashboard` ra khỏi `CinemaApp.jsx`, ví dụ `src/features/admin/pages/AdminDashboard.jsx`.
- Dùng router và guard theo quyền; khi phiên hết hạn, chuyển về trang đăng nhập.
- Trên mobile, sidebar chuyển thành drawer, bộ lọc xếp dọc, bảng có vùng cuộn.

### Widgets

| Widget | Nội dung | Tương tác dự kiến |
| --- | --- | --- |
| KPI cards | Doanh thu, vé, occupancy, giá vé trung bình | So sánh kỳ trước, tooltip định nghĩa |
| Revenue chart | Doanh thu theo ngày/tuần/tháng | Chọn khoảng ngày, tooltip, export |
| Occupancy heatmap | Lấp đầy theo ngày và suất | Chọn cell để drill down suất/phòng |
| Top movies | Vé bán, gross, suất chiếu | Sắp xếp và mở chi tiết phim |
| Filters | Rạp, thời gian, phòng, phim | Áp dụng/reset, hiển thị filter đang dùng |
| Data freshness | Thời điểm snapshot gần nhất | Loading, stale và retry state |

### State và data fetching

Nên dùng TanStack Query khi tích hợp API:

- Query key chứa rạp, khoảng thời gian, timezone và filter.
- Cache dữ liệu summary/chart độc lập; refetch khi filter thay đổi.
- Hiển thị loading skeleton, empty state, error + retry và stale-data indicator riêng.
- Hủy request cũ khi user đổi bộ lọc liên tục.
- Không hiển thị “Đang cập nhật” nếu dữ liệu không có cơ chế refresh/realtime.

Prototype chưa có TanStack Query; hiện dữ liệu nằm trong array tĩnh trong component.

## 5. API contract đề xuất

Các endpoint dưới đây là đề xuất cho backend, chưa tồn tại trong ứng dụng:

```http
GET /api/admin/v1/analytics/summary?cinemaId=hue&from=2026-10-01&to=2026-10-31
GET /api/admin/v1/analytics/revenue?cinemaId=hue&granularity=day&from=...&to=...
GET /api/admin/v1/analytics/occupancy?cinemaId=hue&from=...&to=...
GET /api/admin/v1/analytics/top-movies?cinemaId=hue&limit=10&from=...&to=...
```

Response summary mẫu:

```json
{
  "currency": "VND",
  "period": { "from": "2026-10-01", "to": "2026-10-31", "timezone": "Asia/Ho_Chi_Minh" },
  "revenue": { "amount": 2840000000, "changePercent": 18.6 },
  "ticketsSold": { "count": 18492, "changePercent": 12.3 },
  "occupancyRate": { "value": 0.768, "changePercent": 5.2 },
  "averageTicketPrice": { "amount": 153500, "changePercent": 2.1 },
  "generatedAt": "2026-10-31T23:59:00+07:00"
}
```

### Quy ước

- Backend trả tiền bằng số nguyên VND; frontend chỉ định dạng hiển thị.
- Tỷ lệ lấp đầy dùng số từ 0 đến 1 trong API và đổi sang phần trăm ở UI.
- Tất cả mốc thời gian có timezone; query theo timezone của rạp.
- Phân biệt gross revenue, net revenue, số vé đã thanh toán, hủy và hoàn tiền.
- Thay đổi API cần versioning và schema validation.

## 6. Dữ liệu và định nghĩa metric

| Metric | Định nghĩa đề xuất |
| --- | --- |
| Doanh thu | Tổng giao dịch đã thanh toán thành công trong kỳ; cần chọn gross/net thống nhất |
| Vé đã bán | Số vé thuộc đơn thanh toán thành công, trừ vé bị hoàn/hủy theo chính sách |
| Occupancy | Số ghế đã bán / tổng ghế mở bán trong các suất thuộc kỳ |
| Giá vé trung bình | Doanh thu vé / số vé hợp lệ; tách doanh thu combo khỏi mẫu số |
| Top movies | Xếp theo số vé hoặc gross; phải ghi rõ tiêu chí |
| Heatmap | Occupancy hoặc số booking theo ngày và giờ suất chiếu |

Định nghĩa metric phải được thống nhất với nghiệp vụ/kế toán trước khi hiển thị báo cáo chính thức.

## 7. Bảo mật và quyền riêng tư

- Xác thực và kiểm tra role/scope tại backend trên từng endpoint.
- Hạn chế dashboard theo đúng các rạp người dùng được phân công.
- Không gửi email, số điện thoại, token thanh toán hay thông tin cá nhân không cần thiết vào biểu đồ.
- Ghi audit log cho truy cập/xuất dữ liệu quản trị nếu nghiệp vụ yêu cầu.
- Bảo vệ export endpoint khỏi lạm dụng và giới hạn kích thước/time range.
- Không cache dữ liệu admin cá nhân trong Service Worker public cache.
- Dùng HTTPS; không lưu access token/mật khẩu trong localStorage nếu có phương án cookie an toàn phù hợp.

## 8. Trạng thái UI và accessibility

- **Loading:** skeleton giữ bố cục để tránh layout shift.
- **Empty:** giải thích không có dữ liệu trong khoảng lọc và cho phép đổi kỳ.
- **Error:** hiển thị lỗi có hành động thử lại; không thay lỗi bằng số 0.
- **Stale:** cho biết snapshot cũ, thời gian cập nhật lần cuối.
- **Charts:** có nhãn, tooltip truy cập được và bảng dữ liệu thay thế cho người dùng screen reader.
- **Filters:** label gắn với control, focus-visible, không phụ thuộc màu.
- **Reduced motion:** giảm transition/animation theo tùy chọn hệ điều hành.

## 9. Kiểm thử đề xuất

1. Unit test cho định dạng VND, tỷ lệ và xử lý dữ liệu rỗng.
2. Component test cho filter, loading/empty/error states và accessible names.
3. Integration test xác nhận query gửi đúng cinema/timezone/range.
4. Permission test bảo đảm quản lý rạp không đọc dữ liệu rạp khác.
5. Visual test desktop/tablet/mobile.
6. Contract test giữa API analytics và frontend.
7. Kiểm thử dữ liệu lớn, export và timezone boundary (đầu/cuối ngày, đổi tháng).

## 10. Lộ trình từ prototype tới admin thật

1. Tách dashboard ra feature admin và thêm route.
2. Chọn cơ chế identity/session và RBAC với backend.
3. Chốt định nghĩa metric, timezone, trạng thái giao dịch.
4. Triển khai analytics API và schema có version.
5. Thêm query/cache, loading/error/empty state.
6. Thêm filter/drill-down/export có permission.
7. Bổ sung audit, kiểm thử quyền, accessibility và hiệu năng.
8. Chỉ sau khi xác thực nguồn dữ liệu mới bỏ nhãn demo và trạng thái giả lập.
