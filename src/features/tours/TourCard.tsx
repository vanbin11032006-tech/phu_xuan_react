import type { Tour } from '../../data/tours';

type TourCardProps = {
  tour: Tour;
};

export function TourCard({ tour }: TourCardProps) {
  return (
    <article className="tour-card">
      {tour.hot && <span className="tour-card__badge">Nổi bật</span>}
      <p className="tour-card__category">{tour.category}</p>
      <h2>{tour.name}</h2>
      <p>{tour.duration} giờ trải nghiệm</p>
      <strong>{tour.price.toLocaleString('vi-VN')}đ</strong>
    </article>
  );
}
