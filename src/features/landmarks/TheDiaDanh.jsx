import React from 'react';

const TheDiaDanh = React.memo(function TheDiaDanh({ diaDanh, onYeuThich, isYeuThich }) {
  console.log(`TheDiaDanh render: ${diaDanh.ten}`);

  return (
    <div className={`the-dia-danh ${isYeuThich ? 'is-yeu-thich' : ''}`}>
      <h4>📍 {diaDanh.ten}</h4>
      <p className="khu-vuc">Khu vực: {diaDanh.khuVuc}</p>
      <button
        className={`btn-yeu-thich ${isYeuThich ? 'active' : ''}`}
        onClick={() => onYeuThich(diaDanh.id)}
      >
        {isYeuThich ? '♥ Đã yêu thích' : '♡ Yêu thích'}
      </button>
    </div>
  );
});

export default TheDiaDanh;
