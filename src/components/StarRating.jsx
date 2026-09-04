import { useState } from 'react';

function StarRating() {
  const [userRating, setUserRating] = useState(0);
  const stars = [1, 2, 3, 4, 5];

  return (
    <div className="star-rating">
      <div className="star-rating__stars">
        {stars.map((starValue) => (
          <span
            key={starValue}
            className={`star ${starValue <= userRating ? 'is-filled' : ''}`}
            onClick={() => setUserRating(starValue)}
          >
            {starValue <= userRating ? '★' : '☆'}
          </span>
        ))}
      </div>
      <p className="star-rating__text">
        Bạn đã đánh giá: {userRating}/5 sao
      </p>
    </div>
  );
}

export default StarRating;
