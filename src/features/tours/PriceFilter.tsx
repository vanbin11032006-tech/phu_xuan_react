type PriceFilterProps = {
  minPrice: number;
  maxPrice: number;
  onMinChange: (value: number) => void;
  onMaxChange: (value: number) => void;
};

export function PriceFilter({
  minPrice,
  maxPrice,
  onMinChange,
  onMaxChange,
}: PriceFilterProps) {
  return (
    <section className="price-filter" aria-label="Bộ lọc giá">
      <label>
        Từ: {minPrice.toLocaleString('vi-VN')}đ
        <input
          type="range"
          min={0}
          max={1000000}
          step={50000}
          value={minPrice}
          onChange={(event) => onMinChange(Number(event.target.value))}
        />
      </label>
      <label>
        Đến: {maxPrice.toLocaleString('vi-VN')}đ
        <input
          type="range"
          min={0}
          max={1000000}
          step={50000}
          value={maxPrice}
          onChange={(event) => onMaxChange(Number(event.target.value))}
        />
      </label>
    </section>
  );
}
