import { useMemo, useRef, useState } from 'react';
import { monAnHueBai7 } from '../../data/monAnHueBai7';

export default function Lab4TimMon() {
  const [tuKhoa, setTuKhoa] = useState('');
  const [daChon, setDaChon] = useState('');
  const [dangTim, setDangTim] = useState(false);
  const [dangNhapTiengViet, setDangNhapTiengViet] = useState(false);
  const inputRef = useRef(null);
  const goiY = useMemo(() => tuKhoa.trim() ? monAnHueBai7.filter((item) => `${item.ten} ${item.tuKhoa.join(' ')}`.toLowerCase().includes(tuKhoa.toLowerCase())) : monAnHueBai7.slice(0, 4), [tuKhoa]);

  function handleSubmit(event) {
    event.preventDefault();
    if (dangNhapTiengViet) return;
    setDaChon(goiY[0]?.ten || 'Không tìm thấy món phù hợp');
  }

  function handleKeyDown(event) {
    if (event.nativeEvent.isComposing || dangNhapTiengViet) return;
    if (event.key === 'Escape') { setTuKhoa(''); setDaChon(''); }
    if (event.key === 'Enter') handleSubmit(event);
  }

  return (
    <section className="bai7-lab" aria-labelledby="lab4-title">
      <div className="bai7-lab__heading"><span className="bai7-kicker">Lab 4</span><h2 id="lab4-title">Tìm món ăn bằng bàn phím</h2></div>
      <form className="bai7-search" onSubmit={handleSubmit}>
        <label htmlFor="tim-mon-bai7">Bạn muốn ăn gì hôm nay?</label>
        <div className="bai7-search__row"><input ref={inputRef} id="tim-mon-bai7" className="bai7-input" value={tuKhoa} onChange={(event) => setTuKhoa(event.target.value)} onKeyDown={handleKeyDown} onFocus={() => setDangTim(true)} onBlur={() => setTimeout(() => setDangTim(false), 120)} onCompositionStart={() => setDangNhapTiengViet(true)} onCompositionEnd={() => setDangNhapTiengViet(false)} placeholder="Gõ bún bò, chè, bánh..." aria-controls="goi-y-mon-an" aria-expanded={dangTim} autoComplete="off" /><button className="bai7-button bai7-button--primary" type="submit">Tìm món</button></div>
        {dangTim && <div className="bai7-suggestions" id="goi-y-mon-an" role="listbox">{goiY.map((item) => <button type="button" role="option" key={item.id} onMouseDown={(event) => event.preventDefault()} onClick={() => { setTuKhoa(item.ten); setDaChon(item.ten); inputRef.current?.focus(); }}>{item.ten}<small>{item.tuKhoa.join(' · ')}</small></button>)}</div>}
      </form>
      <p className="bai7-note" aria-live="polite">{daChon ? `Bạn đã chọn: ${daChon}` : 'Enter để tìm món đầu tiên · Esc để xóa nhanh · Hỗ trợ gõ tiếng Việt.'}</p>
    </section>
  );
}
