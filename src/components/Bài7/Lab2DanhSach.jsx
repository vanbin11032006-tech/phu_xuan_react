import { useMemo, useState } from 'react';
import { diaDanhHueBai7 } from '../../data/diaDanhHueBai7';

export default function Lab2DanhSach() {
  const [tuKhoa, setTuKhoa] = useState('');
  const [daChon, setDaChon] = useState([]);
  const danhSachLoc = useMemo(() => diaDanhHueBai7.filter((item) => `${item.ten} ${item.loai}`.toLowerCase().includes(tuKhoa.toLowerCase())), [tuKhoa]);
  const tatCaDaChon = danhSachLoc.length > 0 && danhSachLoc.every((item) => daChon.includes(item.id));

  function handleChonDiaDanh(id) {
    setDaChon((prev) => prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]);
  }

  function handleChonTatCa() {
    setDaChon((prev) => tatCaDaChon ? prev.filter((id) => !danhSachLoc.some((item) => item.id === id)) : [...new Set([...prev, ...danhSachLoc.map((item) => item.id)])]);
  }

  return (
    <section className="bai7-lab" aria-labelledby="lab2-title">
      <div className="bai7-lab__heading"><span className="bai7-kicker">Lab 2</span><h2 id="lab2-title">Chọn nhiều địa danh Huế</h2></div>
      <div className="bai7-toolbar"><label htmlFor="loc-dia-danh">Lọc địa danh</label><input id="loc-dia-danh" className="bai7-input" value={tuKhoa} onChange={(event) => setTuKhoa(event.target.value)} placeholder="Ví dụ: lăng, chùa..." /><button className="bai7-button" onClick={handleChonTatCa}>{tatCaDaChon ? 'Bỏ chọn tất cả' : 'Chọn tất cả'}</button></div>
      <div className="bai7-list" role="group" aria-label="Danh sách địa danh">
        {danhSachLoc.map((item) => <label className="bai7-check-card" key={item.id}><input type="checkbox" checked={daChon.includes(item.id)} onChange={() => handleChonDiaDanh(item.id)} /><span><b>{item.ten}</b><small>{item.loai} · {item.moTa}</small></span></label>)}
      </div>
      <p className="bai7-note" aria-live="polite">Đã chọn: <b>{daChon.length}</b> địa danh{daChon.length > 0 && ` · ${diaDanhHueBai7.filter((item) => daChon.includes(item.id)).map((item) => item.ten).join(', ')}`}</p>
    </section>
  );
}
