import "./BoCucTrang.css";

function BoCucTrang({ thanhDieuHuong, noiDungChinh, chanTrang }) {
  return (
    <div className="bo-cuc">
      <header className="bo-cuc__dau">{thanhDieuHuong}</header>
      <main   className="bo-cuc__giua">{noiDungChinh}</main>
      <footer className="bo-cuc__chan">{chanTrang}</footer>
    </div>
  );
}

export default BoCucTrang;
