import { useRef, useEffect, useState } from 'react';
import useDebounce from '../../hooks/useDebounce';
import danhSachMonAn from '../../data/mon-an.json';

function TimMonAn() {
  const oTimKiemRef = useRef(null);
  const [tuKhoa, setTuKhoa] = useState('');
  const soLanRenderRef = useRef(0);

  // Tăng ref đếm số lần render mỗi khi component render lại
  soLanRenderRef.current = soLanRenderRef.current + 1;
  console.log('TimMonAn đã render:', soLanRenderRef.current, 'lần');

  // Sử dụng custom hook useDebounce (Lab 5)
  const tuKhoaDaTre = useDebounce(tuKhoa, 300);

  // Auto focus vào ô tìm kiếm khi mount (Lab 3)
  useEffect(() => {
    if (oTimKiemRef.current) {
      oTimKiemRef.current.focus();
    }
  }, []);

  // In log kiểm chứng debounce khi từ khóa đã trì hoãn thay đổi (Lab 5)
  useEffect(() => {
    if (tuKhoaDaTre.trim()) {
      console.log('Đang lọc theo từ khoá:', tuKhoaDaTre);
    }
  }, [tuKhoaDaTre]);

  // Lọc danh sách món ăn theo tuKhoaDaTre
  const monAnDaLoc = danhSachMonAn.filter((m) =>
    m.ten.toLowerCase().includes(tuKhoaDaTre.toLowerCase())
  );

  return (
    <div className="tim-mon-an-container">
      <h3>🔍 Tìm món ăn bạn yêu thích</h3>

      <div className="o-tim-kiem-wrapper">
        <input
          ref={oTimKiemRef}
          type="text"
          value={tuKhoa}
          onChange={(e) => setTuKhoa(e.target.value)}
          placeholder="Tìm bún bò, cơm hến, bánh bèo…"
          className="o-tim-kiem-input"
        />
      </div>

      <div className="render-counter-info">
        <p>Đã render <strong>{soLanRenderRef.current}</strong> lần (xem console log)</p>
        <p className="sub-text">⚡ Nhờ <code>useDebounce(300ms)</code>, log lọc danh sách chỉ chạy 1 lần sau khi ngừng gõ.</p>
      </div>

      <div className="ket-qua-tim-kiem-box">
        <h4>Kết quả tìm kiếm {tuKhoaDaTre ? `cho "${tuKhoaDaTre}"` : 'tất cả món'}:</h4>
        {monAnDaLoc.length > 0 ? (
          <ul className="danh-sach-tim-thay">
            {monAnDaLoc.map((mon) => (
              <li key={mon.id} className="item-tim-thay">
                <span className="ten-mon-tim">{mon.ten}</span>
                <span className="gia-mon-tim">{mon.gia.toLocaleString('vi-VN')}đ</span>
                <p className="mota-mon-tim">{mon.moTa}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="khong-thay-ket-qua">❌ Không tìm thấy món ăn phù hợp với "{tuKhoaDaTre}".</p>
        )}
      </div>
    </div>
  );
}

export default TimMonAn;
