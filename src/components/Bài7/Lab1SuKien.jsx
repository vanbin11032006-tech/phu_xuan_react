import { useRef, useState } from 'react';

function NutSuKienCon({ onBamNut }) {
  return (
    <button className="bai7-button bai7-button--primary" onClick={onBamNut}>
      Bấm từ component con
    </button>
  );
}

export default function Lab1SuKien() {
  const [soLanBam, setSoLanBam] = useState(0);
  const [nhatKy, setNhatKy] = useState([]);
  const [chiTietSuKien, setChiTietSuKien] = useState(null);
  const nutRef = useRef(null);

  function ghiNhatKy(noiDung) {
    setNhatKy((prev) => [noiDung, ...prev].slice(0, 6));
  }

  function handleBamNut(event) {
    setSoLanBam((prev) => prev + 1);
    setChiTietSuKien({
      target: event.target.tagName,
      currentTarget: event.currentTarget.tagName,
      dataId: event.currentTarget.dataset?.id || 'không có',
    });
    ghiNhatKy(`Bấm ${event.currentTarget.textContent.trim()} · target: ${event.target.tagName} · currentTarget: ${event.currentTarget.tagName}`);
  }

  function handleTangBa() {
    setSoLanBam((prev) => prev + 1);
    setSoLanBam((prev) => prev + 1);
    setSoLanBam((prev) => prev + 1);
    ghiNhatKy('Đã tăng 3 lần bằng updater function');
  }

  function handleFocusNut() {
    nutRef.current?.focus();
    ghiNhatKy('Đã focus nút bằng useRef');
  }

  return (
    <section className="bai7-lab" aria-labelledby="lab1-title">
      <div className="bai7-lab__heading"><span className="bai7-kicker">Lab 1</span><h2 id="lab1-title">Bắt sự kiện và đọc Event object</h2></div>
      <p className="bai7-copy">Thử các nút để quan sát <code>target</code>, <code>currentTarget</code>, truyền handler từ cha xuống con và updater function.</p>
      <div className="bai7-actions">
        <button ref={nutRef} data-id="nut-cha" className="bai7-button bai7-button--primary" onClick={handleBamNut}>Bấm nút cha</button>
        <NutSuKienCon onBamNut={handleBamNut} />
        <button className="bai7-button" onClick={handleTangBa}>Tăng +3 lượt</button>
        <button className="bai7-button bai7-button--quiet" onClick={handleFocusNut}>Focus nút cha</button>
      </div>
      <div className="bai7-stat"><strong>{soLanBam}</strong><span>lượt tương tác</span></div>
      {chiTietSuKien && <p className="bai7-note">target: <b>{chiTietSuKien.target}</b> · currentTarget: <b>{chiTietSuKien.currentTarget}</b> · data-id: <b>{chiTietSuKien.dataId}</b></p>}
      <div className="bai7-log" aria-live="polite"><strong>Event log</strong>{nhatKy.length === 0 ? <span>Chưa có sự kiện nào.</span> : nhatKy.map((item, index) => <span key={`${item}-${index}`}>{item}</span>)}</div>
    </section>
  );
}
