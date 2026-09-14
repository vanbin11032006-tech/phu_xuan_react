import { useState, useEffect } from 'react';

function useDebounce(giaTri, doTre) {
  const [giaTriDaTre, setGiaTriDaTre] = useState(giaTri);

  useEffect(() => {
    // Đặt setTimeout để cập nhật giaTriDaTre sau `doTre` mili-giây
    const timer = setTimeout(() => {
      setGiaTriDaTre(giaTri);
    }, doTre);

    // Return hàm cleanup gọi clearTimeout để huỷ bộ đếm cũ khi giaTri thay đổi
    return () => {
      clearTimeout(timer);
    };
  }, [giaTri, doTre]);

  return giaTriDaTre;
}

export default useDebounce;
