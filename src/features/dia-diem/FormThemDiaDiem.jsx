import { useState } from 'react';

const DS_TIEN_ICH = [
  { ma: 'bai-xe', ten: 'Bãi đỗ xe' },
  { ma: 'huong-dan', ten: 'Có hướng dẫn viên' },
  { ma: 've-online', ten: 'Bán vé trực tuyến' },
  { ma: 'khu-ve-sinh', ten: 'Khu vệ sinh công cộng' },
];

export default function FormThemDiaDiem({
  duLieu,
  xuLyThayDoi,
  xuLyRoiO,
  loiCuaO,
  xuLyGui,
  dangGui,
  datLai,
  onThemXong,
}) {
  const [tienIch, setTienIch] = useState([]);

  function xuLyTich(e) {
    const { value, checked } = e.target;
    setTienIch((truoc) => (checked ? [...truoc, value] : truoc.filter((ma) => ma !== value)));
  }

  const gui = xuLyGui(async (gt) => {
    await new Promise((giai) => setTimeout(giai, 1200));
    if (onThemXong) {
      onThemXong({ ...gt, giaVe: Number(gt.giaVe), tienIch });
    }
    if (datLai) {
      datLai();
      setTienIch([]);
    }
  });

  return (
    <form onSubmit={gui} noValidate className="form-diadiem">
      <div className="truong">
        <label htmlFor="ten">Tên địa điểm</label>
        <input
          id="ten"
          name="ten"
          type="text"
          value={duLieu.ten}
          onChange={xuLyThayDoi}
          onBlur={xuLyRoiO}
          placeholder="Ví dụ: Lăng Minh Mạng"
          aria-invalid={loiCuaO('ten') ? true : undefined}
        />
        {loiCuaO('ten') && (
          <p role="alert" className="thong-bao-loi">
            {loiCuaO('ten')}
          </p>
        )}
      </div>

      <div className="truong">
        <label htmlFor="moTa">Mô tả ngắn</label>
        <textarea
          id="moTa"
          name="moTa"
          rows={4}
          value={duLieu.moTa}
          onChange={xuLyThayDoi}
          onBlur={xuLyRoiO}
        />
      </div>

      <div className="truong">
        <label htmlFor="giaVe">Giá vé (VNĐ)</label>
        <input
          id="giaVe"
          name="giaVe"
          type="number"
          value={duLieu.giaVe}
          onChange={xuLyThayDoi}
          onBlur={xuLyRoiO}
          placeholder="0"
          aria-invalid={loiCuaO('giaVe') ? true : undefined}
        />
        {loiCuaO('giaVe') && (
          <p role="alert" className="thong-bao-loi">
            {loiCuaO('giaVe')}
          </p>
        )}
      </div>

      <div className="truong">
        <label htmlFor="phuong">Phường / xã</label>
        <select
          id="phuong"
          name="phuong"
          value={duLieu.phuong}
          onChange={xuLyThayDoi}
          onBlur={xuLyRoiO}
          aria-invalid={loiCuaO('phuong') ? true : undefined}
        >
          <option value="">-- Chọn phường --</option>
          <option value="phu-hau">Phú Hậu</option>
          <option value="huong-long">Hương Long</option>
          <option value="thuy-bieu">Thuỷ Biều</option>
          <option value="vy-da">Vỹ Dạ</option>
        </select>
        {loiCuaO('phuong') && (
          <p role="alert" className="thong-bao-loi">
            {loiCuaO('phuong')}
          </p>
        )}
      </div>

      <fieldset className="truong">
        <legend>Loại hình</legend>
        <label>
          <input
            name="loaiHinh"
            type="radio"
            value="di-tich"
            checked={duLieu.loaiHinh === 'di-tich'}
            onChange={xuLyThayDoi}
          />
          Di tích lịch sử
        </label>
        <label>
          <input
            name="loaiHinh"
            type="radio"
            value="am-thuc"
            checked={duLieu.loaiHinh === 'am-thuc'}
            onChange={xuLyThayDoi}
          />
          Điểm ẩm thực
        </label>
      </fieldset>

      <label className="truong checkbox-row">
        <input
          name="dongY"
          type="checkbox"
          checked={duLieu.dongY}
          onChange={xuLyThayDoi}
          onBlur={xuLyRoiO}
        />
        Tôi xác nhận thông tin địa điểm là chính xác
        {loiCuaO('dongY') && (
          <span role="alert" className="thong-bao-loi">
            {loiCuaO('dongY')}
          </span>
        )}
      </label>

      <fieldset className="truong">
        <legend>Tiện ích tại điểm đến</legend>
        {DS_TIEN_ICH.map((ti) => (
          <label key={ti.ma} className="checkbox-row">
            <input
              type="checkbox"
              value={ti.ma}
              checked={tienIch.includes(ti.ma)}
              onChange={xuLyTich}
            />
            {ti.ten}
          </label>
        ))}
      </fieldset>

      <div className="actions-row">
        <button type="submit" disabled={dangGui}>
          {dangGui ? 'Đang lưu...' : 'Thêm địa điểm'}
        </button>
        <button
          type="button"
          onClick={() => {
            if (datLai) datLai();
            setTienIch([]);
          }}
        >
          Nhập lại
        </button>
      </div>
    </form>
  );
}
