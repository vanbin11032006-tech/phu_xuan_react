import "./Nut.css";

function Nut({ loai = "chinh", kichThuoc = "trung-binh", onClick, children }) {
  return (
    <button
      className={`nut nut--${loai} nut--${kichThuoc}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Nut;
