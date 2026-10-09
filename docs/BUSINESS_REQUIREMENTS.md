# Tài liệu nghiệp vụ — Website Cinestar Huế

## 1. Thông tin tài liệu

| Thuộc tính | Nội dung |
| --- | --- |
| Tên sản phẩm | Website tra cứu và đặt vé xem phim Cinestar Huế |
| Loại tài liệu | Đặc tả yêu cầu nghiệp vụ (Business Requirements) |
| Phiên bản | 1.0 |
| Trạng thái | Đặc tả cho prototype frontend |
| Đối tượng đọc | Chủ sản phẩm, giảng viên, nhóm phát triển, kiểm thử |

> Tài liệu và ứng dụng hiện tại phục vụ demo/đồ án, không phải dịch vụ thương mại chính thức. Địa chỉ rạp theo yêu cầu được hiển thị là 25 Hai Bà Trưng, Phường Thuận Hoá, TP. Huế; cần xác nhận với đơn vị vận hành trước khi công bố chính thức.

## 2. Bối cảnh và mục tiêu

Khách hàng cần tra cứu nhanh phim, lịch chiếu và thông tin rạp; chọn ghế, combo và hoàn tất một luồng đặt vé trực quan. Rạp cần một giao diện quản trị tổng quan để theo dõi chỉ số kinh doanh và tình hình bán vé.

Mục tiêu sản phẩm:

1. Rút ngắn hành trình từ xem phim đến chọn suất và ghế.
2. Trình bày rõ ràng thông tin địa điểm, giá tham khảo, khuyến mãi và dịch vụ.
3. Cung cấp giao diện responsive, dùng được trên điện thoại và máy tính.
4. Minh họa khả năng mở rộng tới quản lý realtime và dashboard vận hành.

## 3. Phạm vi

### Trong phạm vi prototype

- Trang giới thiệu rạp, điều hướng, thông tin cụm rạp và bản đồ.
- Danh sách phim chia thành đang chiếu, sắp chiếu và suất đặc biệt.
- Lựa chọn ngày, giờ, cấu hình phòng và ghế SVG.
- Cảnh báo giới hạn đặt ghế, ghế đơn lẻ và đếm ngược giữ ghế.
- Combo, tính tổng giá mẫu và modal xác nhận vé.
- Lưu object vé demo trên trình duyệt.
- Các khối khuyến mãi, tiện ích và sitemap.
- Giao diện dashboard quản trị minh họa.

### Ngoài phạm vi hiện tại

- Xác thực thành viên, đăng ký/đăng nhập và phân quyền quản trị.
- API/backend, cơ sở dữ liệu, WebSocket/SSE thực.
- Thanh toán, hoàn tiền, phát hành vé có giá trị vào cổng.
- Giá, lịch chiếu và khuyến mãi được xác nhận bởi dữ liệu vận hành.
- Quản trị nội dung, xuất báo cáo và đối soát kế toán.

## 4. Vai trò người dùng

| Vai trò | Mục tiêu | Quyền/hành động dự kiến |
| --- | --- | --- |
| Khách xem phim | Tìm phim, chọn suất, ghế và combo | Tra cứu và tạo đơn đặt vé |
| Thành viên | Theo dõi quyền lợi và giao dịch | Đăng nhập, xem lịch sử, tích/đổi điểm |
| Nhân viên rạp | Hỗ trợ khách và kiểm tra vé | Tra cứu đơn, xác minh vé, hỗ trợ tại quầy |
| Quản lý rạp | Theo dõi hoạt động kinh doanh | Xem dashboard, lịch chiếu, tình trạng ghế |
| Quản trị hệ thống | Quản lý hệ thống và quyền | Quản lý tài khoản, cấu hình và audit log |

Các vai trò thành viên và nhân viên là mục tiêu nghiệp vụ; chưa được xác thực trong prototype.

## 5. Yêu cầu chức năng

### FR-01 — Tra cứu cụm rạp

- Người dùng xem tên, thành phố và địa chỉ cụm rạp đang chọn.
- Người dùng đổi cụm rạp từ danh sách.
- Link bản đồ mở dịch vụ bản đồ để tìm kiếm theo địa chỉ.
- Khi chưa có vị trí đã xác minh, giao diện phải ghi rõ tính tham khảo.

### FR-02 — Tra cứu phim và lịch chiếu

- Phim được phân loại thành đang chiếu, sắp chiếu và suất đặc biệt.
- Người dùng chuyển danh mục và chọn phim.
- Khi chọn phim, giao diện cập nhật nội dung nổi bật và danh sách suất tương ứng.
- Các thông tin tuổi, thời lượng, thể loại cần được hiển thị nếu dữ liệu có sẵn.

### FR-03 — Tra cứu giá và ưu đãi

- Người dùng xem bảng giá theo nhóm khách và thời điểm.
- Người dùng xem các chương trình ưu đãi và dịch vụ mở rộng.
- Giá và ưu đãi demo phải được ghi rõ là tham khảo, không cam kết là chính sách hiện hành.

### FR-04 — Chọn suất chiếu

- Người dùng chọn ngày và một trong các suất chiếu khả dụng của phim.
- Giao diện hiển thị phòng, định dạng và thông tin suất được chọn.
- Đổi ngày, phim hoặc suất phải xóa các ghế đang chọn để tránh dùng sai ngữ cảnh.

### FR-05 — Chọn ghế

- Sơ đồ ghế thể hiện tối thiểu trạng thái trống, đã chọn, đã đặt, đang được giữ và ghế VIP.
- Người dùng chọn/bỏ chọn ghế trống bằng chuột, chạm hoặc bàn phím.
- Mỗi đơn giới hạn tối đa 8 ghế.
- Cảnh báo nếu lựa chọn tạo một ghế đơn lẻ bị kẹt giữa các ghế đã chiếm.
- Ghế đã đặt/đang giữ không được chọn.

### FR-06 — Giữ ghế và giá đơn hàng

- Sau khi chọn ghế, giao diện bắt đầu đếm ngược giữ chỗ 5 phút.
- Hết hạn phải giải phóng ghế cục bộ và thông báo cho người dùng.
- Tổng tiền hiển thị theo ghế thường/VIP, cấu hình phòng và combo.
- Nút tiếp tục/xác nhận bị vô hiệu hóa nếu chưa chọn ghế.

### FR-07 — Xác nhận vé demo

- Khi xác nhận, giao diện tạo tóm tắt gồm phim, ngày, giờ, ghế, tổng tiền và mã tham chiếu demo.
- Vé được lưu trên thiết bị nếu LocalStorage khả dụng.
- Modal nêu rõ vé/mã QR chỉ để minh họa, không dùng để vào rạp.

### FR-08 — Thành viên và bản địa hóa

- Giao diện cung cấp điểm truy cập đăng nhập/thành viên.
- Bộ chọn ngôn ngữ có VN và ENG.
- Bản production cần dịch đầy đủ nội dung, lỗi, trạng thái, giá và accessibility labels; prototype mới đổi một số nhãn.

### FR-09 — Dashboard quản trị

- Dashboard minh họa doanh thu, số vé, tỷ lệ lấp đầy, giá vé trung bình.
- Hiển thị xu hướng doanh thu, mật độ đặt vé và phim bán chạy.
- Dữ liệu phải được gắn nhãn demo cho đến khi kết nối nguồn backend đáng tin cậy.

## 6. Quy tắc nghiệp vụ

| ID | Quy tắc |
| --- | --- |
| BR-01 | Một đơn đặt tối đa 8 ghế. |
| BR-02 | Ghế đã đặt hoặc đang được giữ không thể được đặt lại. |
| BR-03 | Thời gian giữ ghế minh họa là 5 phút; thời gian production phải do server cấp và đồng bộ. |
| BR-04 | Giá cuối cùng production phải được server tính/xác nhận, không tin giá do trình duyệt gửi. |
| BR-05 | Việc đổi phim, ngày, suất hoặc cấu hình phòng cần kiểm tra/xóa lựa chọn không còn hợp lệ. |
| BR-06 | Ghế VIP và các cấu hình phòng có mức giá khác nhau; giá demo không phải giá bán chính thức. |
| BR-07 | Không xác nhận vé nếu giao dịch thanh toán chưa được backend xác thực. |
| BR-08 | QR vé thật phải được tạo hoặc ký bởi hệ thống server và có cơ chế chống tái sử dụng. |

## 7. Luồng nghiệp vụ chính: đặt vé

1. Khách chọn cụm rạp.
2. Khách xem phim và chọn phân loại phim.
3. Khách chọn ngày, suất chiếu và cấu hình phòng.
4. Hệ thống lấy trạng thái ghế mới nhất từ server (prototype dùng dữ liệu giả lập).
5. Khách chọn tối đa 8 ghế; UI kiểm tra ghế đơn lẻ.
6. Server giữ ghế tạm thời và trả thời hạn giữ (prototype chạy countdown cục bộ).
7. Khách chọn combo, xem chi tiết giá.
8. Khách đăng nhập nếu nghiệp vụ yêu cầu, sau đó thanh toán.
9. Backend nhận kết quả thanh toán, tạo vé và mã QR hợp lệ.
10. Khách xem/lưu vé; hệ thống giải phóng ghế nếu đơn hết hạn hoặc thanh toán thất bại.

## 8. Yêu cầu phi chức năng

- **Responsive:** hỗ trợ mobile, tablet và desktop; thao tác chính có vùng chạm phù hợp.
- **Accessibility:** điều khiển bàn phím, focus nhìn thấy, nhãn cho ghế/nút, màu sắc không là tín hiệu duy nhất.
- **Hiệu năng:** tải trang và tương tác ghế mượt với sơ đồ phòng; tối ưu tải ảnh và tài nguyên bên thứ ba.
- **Khả dụng:** lỗi mạng, hết hạn giữ ghế và lỗi thanh toán cần thông báo rõ ràng.
- **Bảo mật:** xác thực quyền trên server, giới hạn tốc độ, bảo vệ dữ liệu cá nhân, không lưu bí mật thanh toán trên client.
- **Tính nhất quán:** server là nguồn sự thật cho ghế, giá, giao dịch và vé.
- **Khả năng bảo trì:** tách UI, dữ liệu, API và quy tắc nghiệp vụ khi chuyển sang production.

## 9. Tiêu chí nghiệm thu prototype

- Có thể chuyển phim, loại phim, ngày, suất chiếu và cấu hình phòng.
- Sơ đồ ghế SVG hiển thị trạng thái và tương tác được bằng bàn phím.
- Giới hạn ghế, cảnh báo ghế lẻ, countdown và tính tổng tiền hoạt động ở frontend.
- Modal xác nhận hiển thị tóm tắt; vé demo được lưu trên LocalStorage.
- Các mục bảng giá, bản đồ, khuyến mãi, dịch vụ, footer và dashboard có trạng thái hiển thị rõ.
- Build production thành công bằng `npm run build`.
- Các phần dữ liệu giả lập và giới hạn được công bố trong tài liệu.
