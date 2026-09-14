import { useState } from 'react';

const danhSachGoiY = ['Dạo Đại Nội lúc bình minh', 'Ăn bún bò ở chợ Đông Ba', 'Ngắm hoàng hôn trên đồi Vọng Cảnh', 'Thưởng trà bên sông Hương'];

export default function Lab5KeoTha() {
  const [danhSach, setDanhSach] = useState(danhSachGoiY);
  const [dangKeo, setDangKeo] = useState(null);
  const [dangChon, setDangChon] = useState(null);

  function handleDragStart(event, item) { setDangKeo(item); event.dataTransfer.effectAllowed = 'move'; event.dataTransfer.setData('text/plain', item); }
  function handleDragOver(event) { event.preventDefault(); event.dataTransfer.dropEffect = 'move'; }
  function handleDrop(event, dich) {
    event.preventDefault();
    if (!dangKeo || dangKeo === dich) return;
    setDanhSach((prev) => { const next = [...prev]; const from = next.indexOf(dangKeo); const to = next.indexOf(dich); next.splice(from, 1); next.splice(to, 0, dangKeo); return next; });
    setDangKeo(null);
  }
  function handleMove(index, direction) {
    const target = index + direction;
    if (target < 0 || target >= danhSach.length) return;
    setDanhSach((prev) => { const next = [...prev]; [next[index], next[target]] = [next[target], next[index]]; return next; });
  }
  function handleKeyDown(event, index) {
    if (event.key === 'ArrowUp') { event.preventDefault(); handleMove(index, -1); }
    if (event.key === 'ArrowDown') { event.preventDefault(); handleMove(index, 1); }
    if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); setDangChon(danhSach[index]); }
  }

  return (
    <section className="bai7-lab" aria-labelledby="lab5-title">
      <div className="bai7-lab__heading"><span className="bai7-kicker">Lab 5</span><h2 id="lab5-title">Sắp xếp lịch trình khám phá</h2></div>
      <p className="bai7-copy">Kéo thả một mục lên mục khác để đổi thứ tự. Khi focus bằng bàn phím, dùng mũi tên lên/xuống hoặc Enter/Space để chọn.</p>
      <div className="bai7-sort-list" role="list" aria-label="Lịch trình có thể sắp xếp">{danhSach.map((item, index) => <div className={`bai7-sort-item ${dangKeo === item ? 'is-dragging' : ''}`} key={item} draggable onDragStart={(event) => handleDragStart(event, item)} onDragOver={handleDragOver} onDrop={(event) => handleDrop(event, item)} onDragEnd={() => setDangKeo(null)} onKeyDown={(event) => handleKeyDown(event, index)} onFocus={() => setDangChon(null)} tabIndex={0} role="listitem" aria-grabbed={dangKeo === item}><span className="bai7-sort-item__handle" aria-hidden="true">⠿</span><span><b>{index + 1}</b>{item}</span><div><button className="bai7-icon-button" onClick={() => handleMove(index, -1)} disabled={index === 0} aria-label={`Đưa ${item} lên`}>↑</button><button className="bai7-icon-button" onClick={() => handleMove(index, 1)} disabled={index === danhSach.length - 1} aria-label={`Đưa ${item} xuống`}>↓</button></div></div>)}</div>
      {dangChon && <p className="bai7-note" role="status">Đã chọn: {dangChon}</p>}
    </section>
  );
}
