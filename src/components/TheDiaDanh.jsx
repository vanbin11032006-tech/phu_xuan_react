import "./TheDiaDanh.css";

function TheDiaDanh({
  anh,
  ten,
  moTa = "Đang cập nhật mô tả...",
  onHanhDong,
  nhanHanhDong = "Xem chi tiết"
}) {
  return (
    <div className="the-dia-danh">
      <img className="the-dia-danh__anh" src={anh} alt={ten} />
      <div className="the-dia-danh__than">
        <h3 className="the-dia-danh__ten">{ten}</h3>
        <p className="the-dia-danh__mo-ta">{moTa}</p>
        {onHanhDong && (
          <button className="the-dia-danh__nut-hanh-dong" onClick={() => onHanhDong(ten)}>
            {nhanHanhDong}
          </button>
        )}
      </div>
    </div>
  );
}

export default TheDiaDanh;
