import { useState } from 'react';
import ChiTietMonAn from './ChiTietMonAn';

function TrangMonAn() {
  const [idDangChon, setIdDangChon] = useState(1);

  return (
    <div className="trang-mon-an-container">
      <h3>🍲 Xem Chi Tiết Món Ăn Huế Theo Lựa Chọn</h3>
      <div className="danh-sach-nut-mon">
        <button
          className={idDangChon === 1 ? 'btn-mon active' : 'btn-mon'}
          onClick={() => setIdDangChon(1)}
        >
          Bún bò Huế
        </button>
        <button
          className={idDangChon === 2 ? 'btn-mon active' : 'btn-mon'}
          onClick={() => setIdDangChon(2)}
        >
          Cơm hến
        </button>
        <button
          className={idDangChon === 3 ? 'btn-mon active' : 'btn-mon'}
          onClick={() => setIdDangChon(3)}
        >
          Bánh bèo
        </button>
        <button
          className={idDangChon === 4 ? 'btn-mon active' : 'btn-mon'}
          onClick={() => setIdDangChon(4)}
        >
          Nem lụi
        </button>
      </div>
      <ChiTietMonAn idMonAn={idDangChon} />
    </div>
  );
}

export default TrangMonAn;
