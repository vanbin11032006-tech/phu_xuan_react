import { useState } from 'react';

function MenuItem({ name, price, description, isSpicy, image, id, onToggleFavorite }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  function handleToggleFavorite() {
    const newFavoriteState = !isFavorite;
    setIsFavorite(newFavoriteState);
    if (onToggleFavorite) {
      onToggleFavorite(id, newFavoriteState);
    }
  }

  return (
    <>
      <div className={`menu-item ${isFavorite ? 'is-favorite' : ''}`}>
        {image && (
          <div
            className="menu-item__image-wrapper"
            onClick={() => setIsZoomed(true)}
          >
            <img src={image} alt={name} className="menu-item__image" />
          </div>
        )}
        <div className="menu-item__content">
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
      </div>

      {isZoomed && image && (
        <div
          className="image-zoom-overlay"
          onClick={() => setIsZoomed(false)}
          onMouseLeave={() => setIsZoomed(false)}
        >
          <div
            className="image-zoom-container"
            onClick={(e) => e.stopPropagation()}
            onMouseLeave={() => setIsZoomed(false)}
          >
            <img src={image} alt={name} />
            <div className="image-zoom-info">
              <div className="image-zoom-title">
                <h3>{name}</h3>
                {isSpicy && <span className="menu-item__spicy">🌶 Món cay</span>}
              </div>
              <div className="image-zoom-price">
                <span className="menu-item__price">{price.toLocaleString('vi-VN')}đ</span>
              </div>
              <div className="image-zoom-hint">
                🔍 Di chuột ra ngoài để đóng
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default MenuItem;

