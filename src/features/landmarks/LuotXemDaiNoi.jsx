import { useState, useEffect } from 'react';

function LuotXemDaiNoi() {
  const [luotXem, setLuotXem] = useState(120);

  useEffect(() => {
    console.log('Đã gắn component — bắt đầu đếm lượt xem');
    const idBoDem = setInterval(() => {
      setLuotXem((soCu) => soCu + 1);
    }, 1000);

    return () => {
      console.log('Dọn dẹp: đã huỷ bộ đếm lượt xem');
      clearInterval(idBoDem);
    };
  }, []);

  return (
    <div className="the-luot-xem">
      <h3>🏛️ Đại Nội Huế</h3>
      <p className="so-luot-xem">Đang xem: <strong>{luotXem}</strong> lượt</p>
    </div>
  );
}

export default LuotXemDaiNoi;
