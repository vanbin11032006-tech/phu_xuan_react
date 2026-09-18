import { useForm } from '../../hooks/useForm';

const GIA_TRI_BAN_DAU = { hoTen: '', noiDung: '' };

function kiemChungGopY(d) {
  const loi = {};

  if (!d.hoTen.trim()) {
    loi.hoTen = 'Vui lòng nhập họ tên.';
  }

  if (d.noiDung.trim().length < 10) {
    loi.noiDung = 'Góp ý cần ít nhất 10 ký tự.';
  }

  return loi;
}

export default function FormGopY() {
  const { duLieu, dangGui, xuLyThayDoi, xuLyRoiO, loiCuaO, xuLyGui, datLai } =
    useForm(GIA_TRI_BAN_DAU, kiemChungGopY);

  const gui = xuLyGui(async (gt) => {
    await new Promise((r) => setTimeout(r, 800));
    window.alert('Cảm ơn góp ý của ' + gt.hoTen);
    datLai();
  });

  return (
    <form onSubmit={gui} noValidate className="form-gopy">
      <div className="truong">
        <label htmlFor="hoTen">Họ tên</label>
        <input
          id="hoTen"
          name="hoTen"
          value={duLieu.hoTen}
          onChange={xuLyThayDoi}
          onBlur={xuLyRoiO}
        />
        {loiCuaO('hoTen') && <p role="alert">{loiCuaO('hoTen')}</p>}
      </div>

      <div className="truong">
        <label htmlFor="noiDung">Nội dung góp ý</label>
        <textarea
          id="noiDung"
          name="noiDung"
          value={duLieu.noiDung}
          onChange={xuLyThayDoi}
          onBlur={xuLyRoiO}
          rows={5}
        />
        {loiCuaO('noiDung') && <p role="alert">{loiCuaO('noiDung')}</p>}
      </div>

      <button type="submit" disabled={dangGui}>
        {dangGui ? 'Đang gửi...' : 'Gửi góp ý'}
      </button>
    </form>
  );
}
