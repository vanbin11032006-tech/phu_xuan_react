import { useState } from 'react';

function MenuItem({ name, price, description, isSpicy, id, onToggleFavorite }) {
  const [isFavorite, setIsFavorite] = useState(false);

  function handleToggleFavorite() {
    const newFavoriteState = !isFavorite;
    setIsFavorite(newFavoriteState);
    if (onToggleFavorite) {
      onToggleFavorite(id, newFavoriteState);
    }
  }

  return (
    <div className={`menu-item ${isFavorite ? 'is-favorite' : ''}`}>
      <div className="menu-item__header">
        <h3 className="menu-item__name">{name}</h3>
        {isSpicy && <span className="menu-item__spicy">🌶 Món cay</span>}
      </div>
      <p className="menu-item__description">{description}</p>
      <div className="menu-item__footer">
        <span className="menu-item__price">
          {price.toLocaleString('vi-VN')}đ
        </span>
        <button
          className={`menu-item__favorite-btn ${isFavorite ? 'is-active' : ''}`}
          onClick={handleToggleFavorite}
        >
          {isFavorite ? '♥ Đã yêu thích' : '♡ Yêu thích'}
        </button>
      </div>
    </div>
  );
}

export default MenuItem;
