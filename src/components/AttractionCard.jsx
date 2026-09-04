import { useState } from 'react';
import StarRating from './StarRating';
import TicketCounter from './TicketCounter';

function AttractionCard({ name, category, description, rating, price }) {
  const [isFavorite, setIsFavorite] = useState(false);

  function handleToggleFavorite() {
    setIsFavorite((prev) => !prev);
  }

  const ticketPrice = price || (name === 'Đại Nội Huế' ? 150000 : null);

  return (
    <div className="attraction-card">
      <button
        className={`attraction-card__favorite ${isFavorite ? 'is-active' : ''}`}
        onClick={handleToggleFavorite}
      >
        {isFavorite ? '♥ Đã lưu' : '♡ Lưu địa điểm'}
      </button>
      <div className="attraction-card__badge">{category}</div>
      <h3>{name}</h3>
      <p>{description}</p>
      
      <StarRating />

      {ticketPrice && <TicketCounter price={ticketPrice} />}

      <div className="attraction-card__footer">
        <span className="attraction-card__rating">⭐ {rating}</span>
      </div>
    </div>
  );
}

export default AttractionCard;
