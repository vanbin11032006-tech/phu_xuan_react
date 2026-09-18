import { useState } from 'react';

export function useForm(giaTriBanDau, kiemChung) {
  const [duLieu, setDuLieu] = useState(giaTriBanDau);
  const [daCham, setDaCham] = useState({});
  const [dangGui, setDangGui] = useState(false);

  const loi = kiemChung(duLieu);
  const hopLe = Object.keys(loi).length === 0;

  function xuLyThayDoi(e) {
    const { name, value, type, checked } = e.target;
    setDuLieu((truoc) => ({
      ...truoc,
      [name]: type === 'checkbox' ? checked : value,
    }));
  }

  function xuLyRoiO(e) {
    const { name } = e.target;
    setDaCham((truoc) => ({ ...truoc, [name]: true }));
  }

  function loiCuaO(ten) {
    return daCham[ten] ? loi[ten] : undefined;
  }

  function datLai() {
    setDuLieu(giaTriBanDau);
    setDaCham({});
    setDangGui(false);
  }

  function xuLyGui(guiDuLieu) {
    return async (e) => {
      e.preventDefault();
      const tatCaDaCham = {};
      Object.keys(giaTriBanDau).forEach((k) => {
        tatCaDaCham[k] = true;
      });
      setDaCham(tatCaDaCham);

      if (Object.keys(kiemChung(duLieu)).length > 0) return;

      try {
        setDangGui(true);
        await guiDuLieu(duLieu);
      } finally {
        setDangGui(false);
      }
    };
  }

  return {
    duLieu,
    loi,
    daCham,
    dangGui,
    hopLe,
    xuLyThayDoi,
    xuLyRoiO,
    loiCuaO,
    xuLyGui,
    datLai,
    setDuLieu,
  };
}
