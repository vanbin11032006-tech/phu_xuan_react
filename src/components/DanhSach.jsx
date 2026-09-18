function DanhSach({ cacMuc, hienThiMuc }) {
  return (
    <ul className="danh-sach">
      {cacMuc.map((muc) => (
        <li key={muc.id}>{hienThiMuc(muc)}</li>
      ))}
    </ul>
  );
}

export default DanhSach;
