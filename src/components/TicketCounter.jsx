import { useState } from 'react';

function TicketCounter({ price }) {
  const [quantity, setQuantity] = useState(1);

  function handleDecrease() {
    setQuantity((prev) => Math.max(1, prev - 1));
  }

  function handleIncrease() {
    setQuantity((prev) => Math.min(10, prev + 1));
  }

  const totalPrice = price * quantity;

  return (
    <div className="ticket-counter">
      <div className="ticket-counter__header">
        🎟️ Đặt vé tham quan ({price.toLocaleString('vi-VN')} đ/vé)
      </div>
      <div className="ticket-counter__row">
        <div className="ticket-counter__controls">
          <button 
            type="button" 
            onClick={handleDecrease}
            disabled={quantity <= 1}
            title="Giảm số lượng"
          >
            −
          </button>
          <span className="ticket-counter__quantity">{quantity}</span>
          <button 
            type="button" 
            onClick={handleIncrease}
            disabled={quantity >= 10}
            title="Tăng số lượng"
          >
            +
          </button>
        </div>
        <p className="ticket-counter__total">
          Tổng tiền: <strong>{totalPrice.toLocaleString('vi-VN')} đ</strong>
        </p>
      </div>
    </div>
  );
}

export default TicketCounter;
