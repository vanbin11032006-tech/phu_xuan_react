import "./HuyHieu.css";

function HuyHieu({ mau = "xanh", children }) {
  return <span className={`huy-hieu huy-hieu--${mau}`}>{children}</span>;
}

export default HuyHieu;
