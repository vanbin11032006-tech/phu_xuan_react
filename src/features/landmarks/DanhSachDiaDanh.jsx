import { useState, useMemo, useCallback } from 'react';
import diaDanhData from '../../data/dia-danh.json';
import TheDiaDanh from './TheDiaDanh';

function DanhSachDiaDanh() {
  const [boLoc, setBoLoc] = useState('');
  const [yeuThichIds, setYeuThichIds] = useState([]);

  const danhSachDaLoc = useMemo(() => {
    console.log('--- Filtering danhSachDiaDanh with boLoc:', boLoc);
    return diaDanhData.filter((item) =>
      item.ten.toLowerCase().includes(boLoc.toLowerCase())
    );
  }, [boLoc]);

  const themYeuThich = useCallback((id) => {
    setYeuThichIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  }, []);

  return (
    <div className="danh-sach-dia-danh-container">
      <h3>🏛️ Danh sách địa danh Huế</h3>

      <div className="o-loc-wrapper">
        <input
          type="text"
          value={boLoc}
          onChange={(e) => setBoLoc(e.target.value)}
          placeholder="Lọc địa danh theo tên (gõ 'Đại Nội', 'Lăng'...)"
          className="o-loc-input"
        />
      </div>

      <p className="note-text">
        💡 Mở tab <strong>Console</strong> (F12) để tự kiểm chứng: Khi gõ vào ô lọc, các thẻ địa danh không bị loại bỏ sẽ <strong>KHÔNG render lại</strong> nhờ kết hợp <code>useCallback</code> & <code>React.memo</code>.
      </p>

      <div className="danh-sach-dia-danh-grid">
        {danhSachDaLoc.map((diaDanh) => (
          <TheDiaDanh
            key={diaDanh.id}
            diaDanh={diaDanh}
            onYeuThich={themYeuThich}
            isYeuThich={yeuThichIds.includes(diaDanh.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default DanhSachDiaDanh;
