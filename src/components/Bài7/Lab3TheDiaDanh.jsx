import { useState } from 'react';

function TheDiaDanh({ diaDanh, yeuThich, onToggleYeuThich, onChiaSe }) {
  const [moRong, setMoRong] = useState(false);
  const [soLuotThich, setSoLuotThich] = useState(0);

  function handleMoThe() {
    setMoRong((prev) => !prev);
  }

  function handleChiaSe(event) {
    event.stopPropagation();
    onChiaSe(diaDanh);
  }

  function handleThemBaLuot(event) {
    event.stopPropagation();
    setSoLuotThich((prev) => prev + 1);
    setSoLuotThich((prev) => prev + 1);
    setSoLuotThich((prev) => prev + 1);
  }

  return (
    <article
      className={`bai7-place-card ${moRong ? 'is-open' : ''}`}
      data-id={diaDanh.id}
      onClick={handleMoThe}
      onClickCapture={undefined}
    >
      <div className="bai7-place-card__top"><span className="bai7-place-card__icon" aria-hidden="true">✦</span><span className="bai7-tag">{diaDanh.loai}</span></div>
      <h3>{diaDanh.ten}</h3>
      <p>{diaDanh.moTa}</p>
      {moRong && <p className="bai7-place-card__detail">Chạm vào thẻ để đóng. Sự kiện click của nút bên dưới đã dùng <code>stopPropagation()</code> để không mở lại thẻ.</p>}
      <div className="bai7-place-card__actions">
        <button className={`bai7-button bai7-button--small ${yeuThich ? 'is-liked' : ''}`} onClick={(event) => { event.stopPropagation(); onToggleYeuThich(diaDanh.id); }} aria-pressed={yeuThich}>{yeuThich ? '♥ Đã thích' : '♡ Yêu thích'}</button>
        <button className="bai7-button bai7-button--small" onClick={handleChiaSe}>Chia sẻ</button>
        <button className="bai7-button bai7-button--small" onClick={handleThemBaLuot} aria-label={`Tăng 3 lượt thích cho ${diaDanh.ten}`}>+3 lượt</button>
      </div>
      {soLuotThich > 0 && <small className="bai7-place-card__counter">+{soLuotThich} lượt thích trong phiên này</small>}
    </article>
  );
}

export default function Lab3TheDiaDanh() {
  const [yeuThich, setYeuThich] = useState([]);
  const [thongBao, setThongBao] = useState('');
  const [captureLog, setCaptureLog] = useState(0);
  const [showCapture, setShowCapture] = useState(false);
  const diaDanh = [
    { id: 'dai-noi', ten: 'Đại Nội Huế', loai: 'Di sản', moTa: 'Dấu ấn vàng son của triều Nguyễn.' },
    { id: 'thien-mu', ten: 'Chùa Thiên Mụ', loai: 'Tâm linh', moTa: 'Một khoảng lặng bên dòng Hương thơ mộng.' },
    { id: 'truong-tien', ten: 'Cầu Trường Tiền', loai: 'Biểu tượng', moTa: 'Nhịp cầu nối những câu chuyện phố Huế.' },
  ];

  function handleToggleYeuThich(id) {
    setYeuThich((prev) => prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]);
  }

  function handleCapture(event) {
    console.info(`capture: ${event.currentTarget.dataset.id}`);
    setCaptureLog((prev) => prev + 1);
  }

  async function handleChiaSe(item) {
    const noiDung = `${item.ten} · Khám phá Huế cùng Phú Xuân`;
    try {
      if (navigator.clipboard) await navigator.clipboard.writeText(noiDung);
      setThongBao(`Đã sao chép: ${noiDung}`);
    } catch {
      setThongBao('Không thể truy cập clipboard trong trình duyệt này.');
    }
  }

  return (
    <section className="bai7-lab" aria-labelledby="lab3-title">
      <div className="bai7-lab__heading"><span className="bai7-kicker">Lab 3</span><h2 id="lab3-title">Thẻ địa danh và lan truyền sự kiện</h2></div>
      <p className="bai7-copy">Bấm vào thẻ để mở rộng. Các nút hành động dùng <code>stopPropagation()</code>; nút bật capture minh họa <code>onClickCapture</code>.</p>
      <label className="bai7-switch"><input type="checkbox" checked={showCapture} onChange={(event) => { setShowCapture(event.target.checked); setCaptureLog((prev) => prev + 1); }} /><span>Ghi nhận thao tác capture ({captureLog})</span></label>
      <div className="bai7-place-grid">{diaDanh.map((item) => <div key={item.id} className="bai7-capture-wrapper" data-id={item.id} onClickCapture={showCapture ? handleCapture : undefined}><TheDiaDanh diaDanh={item} yeuThich={yeuThich.includes(item.id)} onToggleYeuThich={handleToggleYeuThich} onChiaSe={handleChiaSe} /></div>)}</div>
      {showCapture && <p className="bai7-note">Capture đang bật: xem Console để thấy thứ tự sự kiện.</p>}
      {thongBao && <p className="bai7-toast" role="status">{thongBao}</p>}
    </section>
  );
}
