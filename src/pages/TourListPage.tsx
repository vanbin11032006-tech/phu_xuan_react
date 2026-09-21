import { useState } from 'react';
import { tours } from '../data/tours';
import { PriceFilter } from '../features/tours/PriceFilter';
import { TourGrid } from '../features/tours/TourGrid';

export function TourListPage() {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000000);

  const filteredTours = tours.filter(
    (tour) => tour.price >= minPrice && tour.price <= maxPrice,
  );

  return (
    <main className="tour-list-page">
      <h1>Khám phá Huế qua 6 hành trình</h1>
      <PriceFilter
        minPrice={minPrice}
        maxPrice={maxPrice}
        onMinChange={setMinPrice}
        onMaxChange={setMaxPrice}
      />
      <p className="filter-summary">
        Đang hiển thị {filteredTours.length} / {tours.length} tour
      </p>
      {filteredTours.length === 0 ? (
        <p className="empty-state">Không có tour nào phù hợp với khoảng giá này.</p>
      ) : (
        <TourGrid tours={filteredTours} />
      )}
    </main>
  );
}
