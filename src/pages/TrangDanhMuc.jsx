import { useState } from "react";
import BoCucTrang from "../components/BoCucTrang";
import The from "../components/The";
import TheDiaDanh from "../components/TheDiaDanh";
import DanhSach from "../components/DanhSach";
import HopThongBao, { HopThongBaoThanhCong } from "../components/HopThongBao";
import Nut from "../components/Nut";
import HuyHieu from "../components/HuyHieu";
import { DANH_SACH_DIA_DANH } from "../du-lieu/diaDanh";
import { DANH_SACH_MON_AN } from "../du-lieu/monAn";

function TrangDanhMuc() {
  const soLuong = DANH_SACH_DIA_DANH.length;
  const [thongBaoChon, setThongBaoChon] = useState(null);

  const handleXemChiTiet = (tenDiaDanh) => {
    setThongBaoChon(`Bạn đã chọn xem chi tiết: ${tenDiaDanh}`);
  };

  return (
    <BoCucTrang
      thanhDieuHuong={
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span>Danh mục địa danh Huế — phu-xuan-react</span>
          <HuyHieu mau="cam">Phiên bản Bài 9</HuyHieu>
        </div>
      }
      chanTrang={<span>© 2026 Nhóm ... — INT.7.18 (phu-xuan-react)</span>}
      noiDungChinh={
        <>
          <HopThongBao>
            Hiện có <strong>{soLuong}</strong> địa danh đang được giới thiệu.
          </HopThongBao>

          <HopThongBaoThanhCong>
            Dữ liệu đã tải xong thành công!
          </HopThongBaoThanhCong>

          {thongBaoChon && (
            <HopThongBao mauNen="#e3f2fd">
              ℹ️ {thongBaoChon}
            </HopThongBao>
          )}

          <The tieuDe="Khám phá Cố đô Huế (Địa danh tiêu biểu)">
            <div className="luoi-dia-danh">
              {DANH_SACH_DIA_DANH.map((dd) => (
                <TheDiaDanh
                  key={dd.id}
                  anh={dd.anh}
                  ten={dd.ten}
                  moTa={dd.moTa}
                  onHanhDong={handleXemChiTiet}
                  nhanHanhDong="Xem chi tiết"
                />
              ))}
            </div>
          </The>

          <The tieuDe="Ẩm thực Huế (Áp dụng Render Props)">
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <h3>Kiểu 1: Hiển thị dạng chữ đậm</h3>
                <DanhSach
                  cacMuc={DANH_SACH_MON_AN}
                  hienThiMuc={(mon) => (
                    <span>
                      <strong>{mon.ten}</strong> — {mon.gia.toLocaleString("vi-VN")}đ <HuyHieu mau="xanh">Nổi bật</HuyHieu>
                    </span>
                  )}
                />
              </div>

              <div>
                <h3>Kiểu 2: Hiển thị dạng kèm nút tương tác (Component Nut - Lab 5)</h3>
                <DanhSach
                  cacMuc={DANH_SACH_MON_AN}
                  hienThiMuc={(mon) => (
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", margin: "4px 0" }}>
                      <span>{mon.ten} ({mon.gia.toLocaleString("vi-VN")}đ)</span>
                      <Nut
                        loai="phu"
                        kichThuoc="nho"
                        onClick={() => setThongBaoChon(`Đã chọn đặt món: ${mon.ten}`)}
                      >
                        Đặt món
                      </Nut>
                    </div>
                  )}
                />
              </div>
            </div>
          </The>
        </>
      }
    />
  );
}

export default TrangDanhMuc;
