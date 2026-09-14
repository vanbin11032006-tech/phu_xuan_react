import { useState, useEffect } from 'react';
import fetchMonAn from '../../data/fetchMonAn';

function ChiTietMonAn({ idMonAn }) {
  const [monAn, setMonAn] = useState(null);
  const [dangTai, setDangTai] = useState(true);

  useEffect(() => {
    let daHuy = false;
    setDangTai(true);

    fetchMonAn(idMonAn).then((data) => {
      if (!daHuy) {
        setMonAn(data);
        setDangTai(false);
      }
    });

    return () => {
      daHuy = true;
    };
  }, [idMonAn]);

  if (dangTai) return <p className="dang-tai-text">⏳ Đang tải thông tin món ăn…</p>;

  return (
    <div className="chi-tiet-mon-an-box">
      <h3>{monAn?.ten} — <span className="gia-mon">{monAn?.gia?.toLocaleString('vi-VN')}đ</span></h3>
      <p>{monAn?.moTa}</p>
    </div>
  );
}

export default ChiTietMonAn;
