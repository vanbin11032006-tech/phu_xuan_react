export default function XemTruocTheDiaDiem({ duLieu }) {
  const giaVe = duLieu.giaVe ? Number(duLieu.giaVe).toLocaleString('vi-VN') + ' đ' : 'Chưa nhập';

  return (
    <aside className="the-xem-truoc">
      <h3>{duLieu.ten || 'Tên địa điểm sẽ hiện ở đây'}</h3>
      <p>{duLieu.moTa || 'Mô tả ngắn sẽ hiện ở đây...'}</p>
      <p>Giá vé: {giaVe}</p>
      <p>Phường: {duLieu.phuong || 'Chưa chọn'}</p>
    </aside>
  );
}
