function HopThongBao({ mauNen = "#e6f0ef", children }) {
  return (
    <div
      className="hop-thong-bao"
      style={{
        background: mauNen,
        padding: "10px 14px",
        borderRadius: "8px",
        margin: "12px 0",
      }}
    >
      {children}
    </div>
  );
}

export function HopThongBaoThanhCong({ children }) {
  return (
    <HopThongBao mauNen="#e7f3ec">
      <strong style={{ color: "#1e7a46" }}>Thành công! </strong>
      {children}
    </HopThongBao>
  );
}

export default HopThongBao;
