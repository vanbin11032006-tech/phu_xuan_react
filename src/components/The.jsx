import "./The.css";

function The({ tieuDe, children }) {
  return (
    <div className="the">
      {tieuDe && <div className="the__dau">{tieuDe}</div>}
      <div className="the__than">{children}</div>
    </div>
  );
}

export default The;
