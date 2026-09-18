export function kiemChung(duLieu) {
  const loi = {};
  const ten = (duLieu.ten ?? '').trim();

  if (!ten) {
    loi.ten = 'Vui lòng nhập tên địa điểm.';
  } else if (ten.length < 3) {
    loi.ten = 'Tên địa điểm phải có ít nhất 3 ký tự.';
  }

  if (duLieu.giaVe === '') {
    loi.giaVe = 'Vui lòng nhập giá vé (nhập 0 nếu miễn phí).';
  } else if (Number.isNaN(Number(duLieu.giaVe)) || Number(duLieu.giaVe) < 0) {
    loi.giaVe = 'Giá vé phải là một số không âm.';
  }

  if (!duLieu.phuong) {
    loi.phuong = 'Vui lòng chọn phường hoặc xã.';
  }

  if (!duLieu.dongY) {
    loi.dongY = 'Bạn cần xác nhận thông tin là chính xác trước khi gửi.';
  }

  return loi;
}
