import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import './CinemaApp.css';

const movies = [
  {
    id: 'dune', title: 'Dune: Part Two', subtitle: 'Hành tinh cát thức tỉnh', genre: 'KHOA HỌC VIỄN TƯỞNG',
    rating: '8.8', duration: '166 phút', age: 'T16', director: 'Denis Villeneuve',
    poster: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=720&q=85',
    backdrop: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=1800&q=90',
    times: ['09:30', '12:45', '16:20', '19:00', '21:40'],
  },
  {
    id: 'inside', title: 'Inside Out 2', subtitle: 'Cảm xúc lên ngôi', genre: 'HOẠT HÌNH · GIA ĐÌNH',
    rating: '8.2', duration: '96 phút', age: 'P', director: 'Kelsey Mann',
    poster: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=720&q=85',
    backdrop: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1800&q=90',
    times: ['10:15', '13:20', '15:50', '18:30', '20:45'],
  },
  {
    id: 'furiosa', title: 'Furiosa', subtitle: 'Huyền thoại Max điên', genre: 'HÀNH ĐỘNG · PHIÊU LƯU',
    rating: '7.9', duration: '148 phút', age: 'T18', director: 'George Miller',
    poster: 'https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=720&q=85',
    backdrop: 'https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=1800&q=90',
    times: ['09:00', '11:50', '14:40', '17:30', '20:20'],
  },
  {
    id: 'past', title: 'Past Lives', subtitle: 'Những kiếp người', genre: 'TÌNH CẢM · TÂM LÝ',
    rating: '8.1', duration: '105 phút', age: 'T13', director: 'Celine Song',
    poster: 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=720&q=85',
    backdrop: 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=1800&q=90',
    times: ['10:00', '12:30', '15:00', '18:00', '20:30'],
  },
];

const days = [
  { label: 'Hôm nay', date: '05/10', full: 'Thứ Hai, 05 tháng 10' },
  { label: 'Thứ Ba', date: '06/10', full: 'Thứ Ba, 06 tháng 10' },
  { label: 'Thứ Tư', date: '07/10', full: 'Thứ Tư, 07 tháng 10' },
  { label: 'Thứ Năm', date: '08/10', full: 'Thứ Năm, 08 tháng 10' },
  { label: 'Thứ Sáu', date: '09/10', full: 'Thứ Sáu, 09 tháng 10' },
];

const cinemas = [
  { id: 'hue', name: 'Cinestar Huế', city: 'TP. Huế', address: '25 Hai Bà Trưng, Phường Thuận Hoá, TP. Huế' },
  { id: 'quocthanh', name: 'Cinestar Quốc Thanh', city: 'TP. Hồ Chí Minh', address: 'Thông tin địa chỉ đang cập nhật' },
  { id: 'dalat', name: 'Cinestar Đà Lạt', city: 'Lâm Đồng', address: 'Thông tin địa chỉ đang cập nhật' },
  { id: 'mytho', name: 'Cinestar Mỹ Tho', city: 'Tiền Giang', address: 'Thông tin địa chỉ đang cập nhật' },
];

const scheduleTabs = [
  { id: 'now', vi: 'Phim đang chiếu', en: 'Now showing' },
  { id: 'soon', vi: 'Phim sắp chiếu', en: 'Coming soon' },
  { id: 'special', vi: 'Suất chiếu đặc biệt', en: 'Special screenings' },
];

const movieSchedule = {
  dune: 'now',
  inside: 'now',
  furiosa: 'special',
  past: 'soon',
};

const promotions = [
  { title: 'Thứ Hai vui vẻ', detail: 'Vé phim ưu đãi từ 45.000đ', tag: 'GIÁ VÉ ĐẶC BIỆT', className: 'promo-monday' },
  { title: 'Combo đôi, vui gấp bội', detail: 'Bắp lớn + 2 nước chỉ từ 99.000đ', tag: 'COMBO ƯU ĐÃI', className: 'promo-combo' },
  { title: 'Thành viên C’Friend', detail: 'Tích điểm mỗi lần xem phim', tag: 'ĐẶC QUYỀN HỘI VIÊN', className: 'promo-member' },
];

const initialUnavailable = new Set(['A4', 'A5', 'B9', 'B10', 'C3', 'C4', 'C12', 'D7', 'D8', 'E2', 'E3', 'E11', 'F5', 'F6', 'G9', 'G10']);
const rows = 'ABCDEFG'.split('');
const roomModes = {
  standard: { label: 'Standard', multiplier: 1, note: 'A1', hall: 'Phòng 04' },
  imax: { label: 'IMAX', multiplier: 1.2, note: 'Công nghệ khổng lồ', hall: 'IMAX 01' },
  vip: { label: 'VIP', multiplier: 1.36, note: 'Ghế da cao cấp', hall: 'VIP Lounge' },
  couple: { label: 'Couple', multiplier: 1.48, note: 'Cặp đôi · Sofa', hall: 'Couple 02' },
};
const money = (amount) => `${amount.toLocaleString('vi-VN')}đ`;

function Icon({ name, size = 18 }) {
  const paths = {
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
    pin: <><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
    ticket: <><path d="M2 9a3 3 0 0 0 0 6v4h20v-4a3 3 0 0 1 0-6V5H2Z" /><path d="M13 5v2m0 4v2m0 4v2" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    chevron: <path d="m9 18 6-6-6-6" />,
    arrow: <><path d="M7 17 17 7M7 7h10v10" /></>,
    chart: <><path d="M3 3v18h18" /><path d="m19 9-5 5-4-4-5 5" /></>,
    film: <><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M7 3v18m10-18v18M3 8h4m-4 8h4m10-8h4m-4 8h4" /></>,
    close: <path d="m18 6-12 12M6 6l12 12" />,
    check: <path d="m5 12 4 4L19 6" />,
    spark: <><path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z" /><path d="m19 14 1.1 2.9L23 18l-2.9 1.1L19 22l-1.1-2.9L15 18l2.9-1.1L19 14Z" /></>,
  };
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
}

function SeatMap({ selectedSeats, onToggle, unavailable, liveLockedSeats = new Set() }) {
  return (
    <div className="seat-map-wrap">
      <svg className="seat-map-svg" viewBox="0 0 620 370" role="group" aria-label="Sơ đồ ghế tương tác">
        <defs>
          <linearGradient id="cinema-screen" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#c4d0ff" stopOpacity=".3" />
            <stop offset="1" stopColor="#c4d0ff" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path className="svg-screen-glow" d="M54 56 Q310 1 566 56 L566 80 Q310 40 54 80Z" fill="url(#cinema-screen)" />
        <path className="svg-screen-curve" d="M54 57 Q310 3 566 57" />
        <text className="svg-screen-label" x="310" y="38" textAnchor="middle">MÀN HÌNH</text>
        {rows.map((row, rowIndex) => (
          <g key={row} className="svg-seat-row">
            <text className="svg-row-label" x="27" y={111 + rowIndex * 36}>{row}</text>
            <text className="svg-row-label" x="593" y={111 + rowIndex * 36}>{row}</text>
            {Array.from({ length: 14 }, (_, i) => {
              const number = i + 1;
              const id = `${row}${number}`;
              const premium = row === 'F' || row === 'G';
              const unavailableSeat = unavailable.has(id);
              const liveLocked = liveLockedSeats.has(id);
              const selected = selectedSeats.includes(id);
              const disabled = unavailableSeat || liveLocked;
              const label = `Ghế ${id}${premium ? ', ghế VIP' : ''}${liveLocked ? ', đang được người khác chọn' : unavailableSeat ? ', đã có người đặt' : selected ? ', đã chọn' : ', còn trống'}`;
              const className = `svg-seat ${premium ? 'svg-seat-premium' : ''} ${unavailableSeat ? 'svg-seat-unavailable' : ''} ${liveLocked ? 'svg-seat-live-locked' : ''} ${selected ? 'svg-seat-selected' : ''} ${disabled ? 'svg-seat-disabled' : ''}`;
              return (
                <g
                  key={id}
                  className={className}
                  role="button"
                  tabIndex={disabled ? -1 : 0}
                  aria-label={label}
                  aria-pressed={selected}
                  aria-disabled={disabled}
                  onClick={() => !disabled && onToggle(id)}
                  onKeyDown={(event) => {
                    if (!disabled && (event.key === 'Enter' || event.key === ' ')) {
                      event.preventDefault();
                      onToggle(id);
                    }
                  }}
                >
                  <rect x={57 + i * 36} y={94 + rowIndex * 36} width="28" height="23" rx="6" />
                  <text x={71 + i * 36} y={109 + rowIndex * 36} textAnchor="middle">{number}</text>
                  <title>{label}</title>
                </g>
              );
            })}
          </g>
        ))}
      </svg>
      <div className="seat-legend">
        <span><i className="legend-seat" /> Còn trống</span>
        <span><i className="legend-seat legend-picked" /> Đang chọn</span>
        <span><i className="legend-seat legend-taken" /> Đã đặt</span>
        <span><i className="legend-seat legend-locked" /> Đang giữ</span>
        <span><i className="legend-seat legend-vip" /> Ghế VIP</span>
      </div>
    </div>
  );
}

function Dashboard() {
  const bars = [42, 58, 49, 72, 61, 85, 66, 92, 74, 100, 82, 68];
  const heat = Array.from({ length: 56 }, (_, i) => (i * 13 + 29) % 100);
  return (
    <motion.section className="dashboard-page" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
      <div className="dashboard-heading">
        <div><span className="eyebrow">TỔNG QUAN · THÁNG 10, 2026</span><h1>Bức tranh doanh thu<span>.</span></h1><p>Theo dõi hiệu suất bán vé theo thời gian thực.</p></div>
        <button className="outline-button" type="button"><span className="live-dot" /> Đang cập nhật</button>
      </div>
      <div className="stats-grid">
        {[['Tổng doanh thu', '2,84 tỷ', '+18,6%', 'chart'], ['Vé đã bán', '18.492', '+12,3%', 'ticket'], ['Tỷ lệ lấp đầy', '76,8%', '+5,2%', 'film'], ['Giá vé trung bình', '153.500đ', '+2,1%', 'spark']].map(([label, value, change, icon]) => (
          <article className="stat-card" key={label}><span className="stat-icon"><Icon name={icon} size={17} /></span><span className="stat-label">{label}</span><strong>{value}</strong><small><b>↗ {change}</b> so với tháng trước</small></article>
        ))}
      </div>
      <div className="dashboard-panels">
        <article className="panel revenue-panel">
          <div className="panel-head"><div><span className="eyebrow">HIỆU SUẤT</span><h2>Doanh thu phòng vé</h2></div><button className="period-button" type="button">12 tháng <span>⌄</span></button></div>
          <div className="chart-total"><strong>2,84 tỷ đ</strong><span>+18,6% <small>so với năm trước</small></span></div>
          <div className="bar-chart" aria-label="Biểu đồ doanh thu 12 tháng">
            {bars.map((height, index) => <div className="bar-column" key={index}><div className={`bar ${index === 9 ? 'bar-active' : ''}`} style={{ height: `${height}%` }} title={`${height}% doanh thu`} /><span>{['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'][index]}</span></div>)}
          </div>
        </article>
        <article className="panel heat-panel">
          <div className="panel-head"><div><span className="eyebrow">LỊCH CHIẾU PHỔ BIẾN</span><h2>Mật độ đặt vé</h2></div><span className="heat-indicator">Tuần này</span></div>
          <div className="heatmap">{heat.map((level, i) => <i key={i} className={`heat-cell heat-${level > 75 ? 4 : level > 55 ? 3 : level > 35 ? 2 : 1}`} title={`Suất chiếu ${i + 1}: ${level}%`} />)}</div>
          <div className="heat-days"><span>T2</span><span>T3</span><span>T4</span><span>T5</span><span>T6</span><span>T7</span><span>CN</span></div>
          <div className="heat-scale"><span>Ít vé</span>{[1, 2, 3, 4].map((n) => <i className={`heat-cell heat-${n}`} key={n} />)}<span>Đông khách</span></div>
          <div className="insight"><Icon name="spark" size={18} /><p><b>Thứ Bảy, 19:00–21:00</b> là khung giờ có tỷ lệ lấp đầy cao nhất tuần này.</p></div>
        </article>
      </div>
      <article className="panel movie-performance">
        <div className="panel-head"><div><span className="eyebrow">TOP PHIM</span><h2>Phim được yêu thích</h2></div><span className="table-caption">Tháng 10, 2026</span></div>
        {movies.slice(0, 3).map((movie, i) => <div className="performance-row" key={movie.id}><span className="rank">0{i + 1}</span><img src={movie.poster} alt="" /><div className="performance-title"><b>{movie.title}</b><span>{movie.genre}</span></div><div className="performance-bar"><i style={{ width: `${100 - i * 19}%` }} /></div><strong>{['5.248', '3.612', '2.890'][i]} <small>vé</small></strong></div>)}
      </article>
    </motion.section>
  );
}

function CinemaApp() {
  const [activeTab, setActiveTab] = useState('booking');
  const [scheduleTab, setScheduleTab] = useState('now');
  const [cinemaId, setCinemaId] = useState('hue');
  const [language, setLanguage] = useState('vi');
  const [showPriceModal, setShowPriceModal] = useState(false);
  const [movieId, setMovieId] = useState('dune');
  const [dayIndex, setDayIndex] = useState(0);
  const [showtime, setShowtime] = useState('19:00');
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [combo, setCombo] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(300);
  const [notice, setNotice] = useState('');
  const [ticket, setTicket] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [roomMode, setRoomMode] = useState('standard');
  const [showPriceBreakdown, setShowPriceBreakdown] = useState(false);
  const [liveLockedSeats, setLiveLockedSeats] = useState(() => new Set(['A8', 'B8', 'C9', 'D4', 'F12', 'G11']));
  const [isOnline, setIsOnline] = useState(() => navigator.onLine);
  const movie = movies.find((item) => item.id === movieId) ?? movies[0];
  const cinema = cinemas.find((item) => item.id === cinemaId) ?? cinemas[0];
  const visibleMovies = movies.filter((item) => movieSchedule[item.id] === scheduleTab);
  const unavailable = useMemo(() => new Set([...initialUnavailable, ...liveLockedSeats]), [liveLockedSeats]);
  const isHolding = selectedSeats.length > 0;
  const premiumCount = selectedSeats.filter((seat) => ['F', 'G'].includes(seat[0])).length;
  const baseTicketPrice = 105000 * roomModes[roomMode].multiplier;
  const vipTicketPrice = 145000 * roomModes[roomMode].multiplier;
  const subtotal = (selectedSeats.length - premiumCount) * baseTicketPrice + premiumCount * vipTicketPrice + (combo ? 89000 : 0);
  const total = subtotal;

  useEffect(() => {
    const syncNetwork = () => setIsOnline(window.navigator.onLine);
    window.addEventListener('online', syncNetwork);
    window.addEventListener('offline', syncNetwork);
    return () => {
      window.removeEventListener('online', syncNetwork);
      window.removeEventListener('offline', syncNetwork);
    };
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setLiveLockedSeats((current) => {
        const seatPool = ['A8', 'A9', 'B8', 'B11', 'C2', 'C9', 'D3', 'E7', 'F12', 'G11'];
        const next = new Set(current);
        const nextSeat = seatPool[Math.floor(Math.random() * seatPool.length)];
        if (next.size >= seatPool.length) {
          return new Set(seatPool.slice(0, 6));
        }
        next.add(nextSeat);
        const [first] = next;
        if (next.size > 6) next.delete(first);
        return next;
      });
    }, 5000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!isHolding) return undefined;
    const timer = window.setInterval(() => {
      setSecondsLeft((seconds) => {
        if (seconds <= 1) {
          setSelectedSeats([]);
          setCombo(false);
          setNotice('Đã hết thời gian giữ ghế. Vui lòng chọn lại.');
          return 300;
        }
        return seconds - 1;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [isHolding]);

  useEffect(() => {
    if (!notice) return undefined;
    const timeout = window.setTimeout(() => setNotice(''), 3600);
    return () => window.clearTimeout(timeout);
  }, [notice]);

  function chooseMovie(id) {
    setMovieId(id);
    setShowtime(movies.find((item) => item.id === id)?.times[3] ?? '19:00');
    setSelectedSeats([]);
    setCombo(false);
    setSecondsLeft(300);
    setTicket(null);
  }

  function toggleSeat(seat) {
    setTicket(null);
    setSelectedSeats((current) => {
      if (current.includes(seat)) return current.filter((item) => item !== seat);
      if (current.length >= 8) {
        setNotice('Bạn có thể chọn tối đa 8 ghế trong một lần đặt.');
        return current;
      }
      const newSelection = [...current, seat];
      const rowSeats = Array.from({ length: 14 }, (_, i) => `${seat[0]}${i + 1}`);
      const blocked = (id) => unavailable.has(id) || newSelection.includes(id);
      const leavesSingleGap = rowSeats.some((id, index) => (
        !blocked(id) && index > 0 && index < rowSeats.length - 1 && blocked(rowSeats[index - 1]) && blocked(rowSeats[index + 1])
      ));
      if (leavesSingleGap) {
        setNotice('Vui lòng chọn liền ghế để tránh bỏ trống một ghế đơn.');
        return current;
      }
      if (!current.length) setSecondsLeft(300);
      return newSelection;
    });
  }

  function confirmBooking() {
    if (!selectedSeats.length) return;
    const booked = { movie: movie.title, date: days[dayIndex].date, time: showtime, seats: [...selectedSeats], total, code: `PX${dayIndex + 1}${showtime.replace(':', '')}${selectedSeats.map((seat) => seat.replace(/[A-G]/, '')).join('')}` };
    try {
      window.localStorage.setItem('phu-xuan-cinema-ticket', JSON.stringify(booked));
    } catch {
      setNotice('Không thể lưu vé trên thiết bị này, nhưng đặt vé mẫu đã hoàn tất.');
    }
    setTicket(booked);
    setSelectedSeats([]);
    setCombo(false);
  }

  const filteredMovies = movies.filter((item) => item.title.toLowerCase().includes(searchTerm.toLowerCase()));
  const formattedTime = `${String(Math.floor(secondsLeft / 60)).padStart(2, '0')}:${String(secondsLeft % 60).padStart(2, '0')}`;

  return (
    <div className="cinema-app">
      <div className="app-promo-bar">
        <span>Ứng dụng Cinestar đã có mặt trên điện thoại</span>
        <a href="#promotions">Khám phá ưu đãi <Icon name="arrow" size={13} /></a>
      </div>
      <header className="topbar">
        <a className="brand" href="#home" onClick={() => setActiveTab('booking')}><span className="brand-mark"><Icon name="film" size={20} /></span><span>CINESTAR<small>BE HAPPY · BE A STAR</small></span></a>
        <div className="header-quick-actions">
          <button className="header-book-button" type="button" onClick={() => { setActiveTab('booking'); document.getElementById('schedule')?.scrollIntoView({ behavior: 'smooth' }); }}><Icon name="ticket" size={15} />{language === 'vi' ? 'Đặt vé ngay' : 'Book now'}</button>
          <button className="header-food-button" type="button" onClick={() => document.getElementById('promotions')?.scrollIntoView({ behavior: 'smooth' })}>🍿 {language === 'vi' ? 'Bắp nước' : 'Food & drinks'}</button>
        </div>
        <nav className="main-nav" aria-label="Điều hướng chính">
          <a href="#schedule">{language === 'vi' ? 'Lịch chiếu' : 'Schedule'}</a>
          <a href="#promotions">{language === 'vi' ? 'Khuyến mãi' : 'Promotions'}</a>
          <a href="#services">{language === 'vi' ? 'Sự kiện' : 'Events'}</a>
          <a href="#services">{language === 'vi' ? 'Dịch vụ' : 'Services'}</a>
          <a href="#cinema-info">{language === 'vi' ? 'Giới thiệu' : 'About'}</a>
        </nav>
        <div className="topbar-actions">
          <button className={`icon-button ${searchOpen ? 'icon-button-active' : ''}`} type="button" aria-label="Tìm phim" onClick={() => setSearchOpen(!searchOpen)}><Icon name="search" /></button>
          <label className="cinema-picker" aria-label="Chọn cụm rạp"><Icon name="pin" size={15} /><select value={cinemaId} onChange={(event) => setCinemaId(event.target.value)}>{cinemas.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label>
          <button className="language-toggle" type="button" onClick={() => setLanguage(language === 'vi' ? 'en' : 'vi')} aria-label="Đổi ngôn ngữ">{language === 'vi' ? 'VN' : 'ENG'} <span>⌄</span></button>
          <button className="account-button" type="button" onClick={() => setNotice(language === 'vi' ? 'Đăng nhập thành viên sẽ sớm được cập nhật.' : 'Member sign-in is coming soon.')}>{language === 'vi' ? 'Đăng nhập' : 'Sign in'}</button>
        </div>
      </header>
      <nav className="mobile-quick-nav" aria-label="Điều hướng nhanh">
        <a href="#schedule"><Icon name="film" size={15} />Lịch chiếu</a>
        <a href="#promotions">🍿 Bắp nước</a>
        <a href="#booking"><Icon name="ticket" size={15} />Đặt vé</a>
        <button type="button" onClick={() => setNotice(language === 'vi' ? 'Đăng nhập thành viên sẽ sớm được cập nhật.' : 'Member sign-in is coming soon.')}>Tài khoản</button>
      </nav>
      {searchOpen && <div className="search-popover"><Icon name="search" /><input autoFocus placeholder="Tìm tên phim..." value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} /><button type="button" onClick={() => { setSearchOpen(false); setSearchTerm(''); }} aria-label="Đóng tìm kiếm"><Icon name="close" size={17} /></button><div className="search-results">{filteredMovies.map((item) => <button key={item.id} type="button" onClick={() => { chooseMovie(item.id); setActiveTab('booking'); setSearchOpen(false); setSearchTerm(''); }}>{item.title}<span>{item.genre}</span></button>)}{!filteredMovies.length && <p>Không tìm thấy phim phù hợp.</p>}</div></div>}
      {!isOnline && <div className="offline-banner"><span className="live-dot" /> Offline mode · Vé của bạn đang được lưu trên thiết bị</div>}

      {activeTab === 'dashboard' ? <Dashboard /> : (
        <main>
          <section className="cinema-info-card" id="cinema-info">
            <div className="cinema-info-copy">
              <span className="eyebrow">HỆ THỐNG RẠP CINESTAR</span>
              <h1>{cinema.name} <span>({cinema.city})</span></h1>
              <p><Icon name="pin" size={16} /> {cinema.address}</p>
              <div className="cinema-info-actions">
                <button className="price-list-button" type="button" onClick={() => setShowPriceModal(true)}>Bảng giá vé <Icon name="chevron" size={15} /></button>
                <a href="#map-section">Chỉ đường <Icon name="arrow" size={14} /></a>
              </div>
            </div>
            <div className="cinema-open-status"><i /> ĐANG MỞ CỬA <span>· 08:00 – 23:00</span></div>
          </section>
          <motion.section className="hero" style={{ '--hero-image': `url("${movie.backdrop}")` }} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
            <div className="hero-shade" />
            <div className="hero-copy">
              <span className="hero-kicker"><i /> PHIM ĐƯỢC QUAN TÂM</span>
              <div className="hero-tags"><span>{movie.genre}</span><span>{movie.age}</span><span>★ {movie.rating}</span></div>
              <h1>{movie.title}</h1>
              <p className="hero-subtitle">{movie.subtitle}</p>
              <div className="hero-meta"><span><Icon name="clock" size={15} /> {movie.duration}</span><span>Đạo diễn: {movie.director}</span></div>
              <a className="hero-link" href="#booking" onClick={() => setActiveTab('booking')}>Đặt vé ngay <Icon name="arrow" size={15} /></a>
            </div>
            <div className="hero-index"><span>0{movies.findIndex((item) => item.id === movieId) + 1}</span><i /> 04</div>
            <div className="hero-carousel" aria-label="Chọn phim nổi bật">{movies.map((item) => <button key={item.id} className={`carousel-poster ${item.id === movieId ? 'carousel-active' : ''}`} onClick={() => chooseMovie(item.id)} type="button" aria-label={`Chọn phim ${item.title}`}><img src={item.poster} alt="" /><span>{item.title}</span><small>★ {item.rating}</small></button>)}</div>
          </motion.section>

          <section className="schedule-section" id="schedule">
            <div className="schedule-head">
              <div><span className="eyebrow">PHIM HAY MỖI NGÀY</span><h2>Lịch chiếu phim<span>.</span></h2></div>
              <span className="schedule-date"><Icon name="clock" size={15} /> Hôm nay · 05.10.2026</span>
            </div>
            <div className="schedule-tabs" role="tablist" aria-label="Phân loại lịch chiếu">
              {scheduleTabs.map((tab) => <button type="button" role="tab" aria-selected={scheduleTab === tab.id} className={scheduleTab === tab.id ? 'schedule-tab active' : 'schedule-tab'} key={tab.id} onClick={() => setScheduleTab(tab.id)}>{language === 'vi' ? tab.vi : tab.en}</button>)}
            </div>
            <div className="schedule-movies">
              {visibleMovies.map((item) => (
                <button type="button" className={`schedule-movie ${movieId === item.id ? 'selected' : ''}`} key={item.id} onClick={() => chooseMovie(item.id)}>
                  <img src={item.poster} alt="" />
                  <span className="schedule-movie-info"><strong>{item.title}</strong><small>{item.genre}</small><small>{item.duration} · {item.age}</small></span>
                  <span className="schedule-movie-rating">★ {item.rating}</span>
                </button>
              ))}
              {!visibleMovies.length && <p className="empty-schedule">Chưa có phim trong danh mục này.</p>}
            </div>
          </section>

          <section className="booking-section" id="booking">
            <div className="section-title-row"><div><span className="eyebrow">TRẢI NGHIỆM ĐIỆN ẢNH CỦA BẠN</span><h2>Chọn suất chiếu<span>.</span></h2></div><button className="theatre-select" type="button"><Icon name="pin" size={16} /><span><small>RẠP ĐANG CHỌN</small>Phú Xuân · Huế</span><span>⌄</span></button></div>
            <div className="date-strip">{days.map((day, index) => <button type="button" className={`date-card ${dayIndex === index ? 'date-active' : ''}`} key={day.date} onClick={() => { setDayIndex(index); setSelectedSeats([]); setTicket(null); setSecondsLeft(300); }}><small>{day.label}</small><b>{day.date.split('/')[0]}</b><span>Tháng {day.date.split('/')[1]}</span></button>)}</div>
            <div className="showtime-row">
            <div className="real-time-sync"><span className="live-dot" /> Real-time sync · {liveLockedSeats.size} ghế đang được người khác giữ</div>
            <div className="showtime-heading">
              <div>
                <h3>{movie.title}</h3>
                <span>2D Phụ đề · {roomModes[roomMode].hall}</span>
              </div>
              <div className="showtime-chips">
                {movie.times.map((time) => <button key={time} className={`showtime-chip ${showtime === time ? 'showtime-active' : ''}`} type="button" onClick={() => { setShowtime(time); setSelectedSeats([]); setTicket(null); setSecondsLeft(300); }}>{time}</button>)}
              </div>
            </div>
            <div className="room-config-row">
                <div className="room-config-label">Cấu hình phòng</div>
                <div className="room-mode-picker">
                  {Object.entries(roomModes).map(([key, mode]) => (
                    <button
                      key={key}
                      type="button"
                      className={`room-mode ${roomMode === key ? 'room-mode-active' : ''}`}
                      onClick={() => setRoomMode(key)}
                    >
                      <strong>{mode.label}</strong>
                      <span>{mode.note}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="availability-note"><span className="live-dot" /> Ghế được cập nhật thủ công · Chọn ghế để bắt đầu giữ chỗ</div>
            </div>
          </section>

          <section className="seating-section">
            <div className="seating-heading"><div><span className="eyebrow">{roomModes[roomMode].hall.toUpperCase()} · {days[dayIndex].full.toUpperCase()}</span><h2>Chọn ghế ngồi</h2></div><span className="seat-capacity"><Icon name="film" size={15} /> 98 ghế</span></div>
            <SeatMap selectedSeats={selectedSeats} onToggle={toggleSeat} unavailable={unavailable} liveLockedSeats={liveLockedSeats} />
          </section>

          <section className="checkout-section">
            <div className="checkout-heading"><div><span className="eyebrow">ĐƠN ĐẶT VÉ CỦA BẠN</span><h2>Chi tiết đặt vé</h2></div>{isHolding && <span className="hold-timer"><Icon name="clock" size={15} /> Giữ ghế <b>{formattedTime}</b></span>}</div>
            <div className="checkout-details">
              <div className="checkout-movie"><img src={movie.poster} alt="" /><div><strong>{movie.title}</strong><span>{days[dayIndex].full} · {showtime}</span><span>Phú Xuân Cinema · {roomModes[roomMode].hall}</span></div></div>
              <div className="selected-seat-info"><small>GHẾ ĐÃ CHỌN</small><div>{selectedSeats.length ? [...selectedSeats].sort((a, b) => a.localeCompare(b, undefined, { numeric: true })).map((seat) => <span key={seat}>{seat}</span>) : <em>Chưa chọn ghế</em>}</div></div>
              <div className="pricing-summary">
                <span>Giá vé cơ bản</span>
                <button type="button" className="price-toggle" onClick={() => setShowPriceBreakdown((value) => !value)}>
                  <strong>{money(baseTicketPrice)} / ghế</strong>
                </button>
              </div>
              {showPriceBreakdown && (
                <div className="price-breakdown">
                  <span>Standard: {money(105000 * roomModes[roomMode].multiplier)}</span>
                  <span>VIP: {money(145000 * roomModes[roomMode].multiplier)}</span>
                  <span>Phòng: {roomModes[roomMode].label}</span>
                </div>
              )}
              <label className={`combo-offer ${combo ? 'combo-selected' : ''}`}><input type="checkbox" checked={combo} onChange={(event) => setCombo(event.target.checked)} /><span className="combo-emoji">🍿</span><span><b>Combo Rạp Chiếu</b><small>1 bắp lớn + 2 nước · tiết kiệm 15%</small></span><strong>89.000đ</strong><i className="custom-check">{combo && <Icon name="check" size={13} />}</i></label>
              <div className="checkout-total"><span>Tổng thanh toán <small>{selectedSeats.length} vé{combo ? ' + 1 combo' : ''}</small></span><strong>{money(total)}</strong></div>
              <button className="checkout-button" type="button" onClick={confirmBooking} disabled={!selectedSeats.length}><Icon name="ticket" size={18} /> Xác nhận đặt vé <Icon name="chevron" size={17} /></button>
              <p className="secure-note">🔒 Thanh toán an toàn · Vé điện tử lưu trên thiết bị</p>
            </div>
          </section>

          <section className="location-section" id="map-section" aria-labelledby="location-title">
            <div className="location-heading">
              <div>
                <span className="eyebrow">TÌM ĐƯỜNG ĐẾN RẠP</span>
                <h2 id="location-title">Gặp nhau tại {cinema.city}<span>.</span></h2>
                <p>{cinema.name} · {cinema.address}</p>
              </div>
              <a
                className="map-directions"
                href={`https://www.openstreetmap.org/search?query=${encodeURIComponent(`${cinema.address}, Việt Nam`)}`}
                target="_blank"
                rel="noreferrer"
              >
                Mở bản đồ lớn <Icon name="arrow" size={15} />
              </a>
            </div>
            <div className="map-frame">
              {cinema.id === 'hue' ? (
                <>
                  <iframe
                    title="Bản đồ tham khảo Cinestar Huế"
                    src="https://www.openstreetmap.org/export/embed.html?bbox=107.57%2C16.45%2C107.61%2C16.48&layer=mapnik&marker=16.4637%2C107.5909"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <span className="map-caption">OpenStreetMap · Vị trí tham khảo tại Huế, vui lòng xác nhận chỉ đường</span>
                </>
              ) : <div className="map-placeholder"><Icon name="pin" size={24} /><strong>Bản đồ cụm rạp đang cập nhật</strong><span>Vui lòng mở bản đồ lớn để tìm {cinema.name}.</span></div>}
            </div>
          </section>
          <section className="promotions-section" id="promotions">
            <div className="schedule-head">
              <div><span className="eyebrow">ƯU ĐÃI DÀNH RIÊNG CHO BẠN</span><h2>Phim hay, deal mê say<span>.</span></h2></div>
              <button className="all-promotions" type="button" onClick={() => setNotice('Bạn đang xem tất cả ưu đãi nổi bật của Cinestar Huế.')}>Tất cả ưu đãi <Icon name="arrow" size={14} /></button>
            </div>
            <div className="promotion-grid">
              {promotions.map((promotion) => <article className={`promotion-card ${promotion.className}`} key={promotion.title}><span>{promotion.tag}</span><h3>{promotion.title}</h3><p>{promotion.detail}</p><a href="#schedule">Khám phá ngay <Icon name="arrow" size={13} /></a></article>)}
            </div>
          </section>
          <section className="services-section" id="services">
            <div className="schedule-head">
              <div><span className="eyebrow">KHÔNG CHỈ LÀ RẠP PHIM</span><h2>Thêm niềm vui mỗi ngày<span>.</span></h2></div>
            </div>
            <div className="services-list">
              {['Nhà hàng', 'Kidzone', 'Bowling', 'Billiards', 'Gym', 'Coffee', 'Thuê rạp & sự kiện'].map((service, index) => <button type="button" key={service} onClick={() => setNotice(`${service}: thông tin dịch vụ sẽ sớm được cập nhật.`)}><span>0{index + 1}</span>{service}<Icon name="arrow" size={14} /></button>)}
            </div>
          </section>
        </main>
      )}
      <footer className="site-footer">
        <div className="footer-hero"><div><span>BE HAPPY, BE A STAR</span><p>Mỗi khoảnh khắc tại rạp là một câu chuyện đáng nhớ.</p></div><div><button type="button" onClick={() => { setActiveTab('booking'); document.getElementById('schedule')?.scrollIntoView({ behavior: 'smooth' }); }}>Đặt vé</button><button type="button" onClick={() => document.getElementById('promotions')?.scrollIntoView({ behavior: 'smooth' })}>Đặt bắp nước</button></div></div>
        <div className="footer-links">
          {[
            ['Tài khoản', 'Đăng nhập', 'Đăng ký', 'Membership', 'C’Friend & C’VIP'],
            ['Thuê sự kiện', 'Thuê rạp', 'Sinh nhật', 'Sự kiện doanh nghiệp'],
            ['Xem phim', 'Phim đang chiếu', 'Phim sắp chiếu', 'Suất chiếu đặc biệt'],
            ['Cinestar', 'Giới thiệu', 'Liên hệ', 'Tuyển dụng', 'Hỏi & Đáp'],
            ['Dịch vụ khác', 'Nhà hàng', 'Kidzone', 'Bowling', 'Billiards · Gym · Coffee'],
          ].map(([title, ...links]) => <div className="footer-link-column" key={title}><h3>{title}</h3>{links.map((link) => <a href={link === 'Phim đang chiếu' ? '#schedule' : link === 'Nhà hàng' ? '#services' : '#cinema-info'} key={link}>{link}</a>)}</div>)}
          <div className="footer-link-column cinema-network"><h3>Hệ thống rạp</h3>{cinemas.map((item) => <button type="button" key={item.id} onClick={() => { setCinemaId(item.id); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>{item.name}</button>)}</div>
        </div>
        <div className="company-info"><span>© 2026 Cinestar · Bản quyền thuộc về Cinestar</span><div><a href="#cinema-info">Chính sách bảo mật</a><a href="#cinema-info">Điều khoản sử dụng</a></div><small>Thông tin pháp lý · Demo giao diện học tập, không phải website thương mại chính thức.</small></div>
      </footer>
      <AnimatePresence>
        {notice && <motion.div className="toast" role="status" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 30 }}><Icon name="spark" size={18} />{notice}<button type="button" aria-label="Đóng thông báo" onClick={() => setNotice('')}><Icon name="close" size={15} /></button></motion.div>}
      </AnimatePresence>
      <AnimatePresence>
        {showPriceModal && <motion.div className="modal-backdrop" role="presentation" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowPriceModal(false)}><motion.section className="price-modal" role="dialog" aria-modal="true" aria-labelledby="price-modal-title" initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 8, opacity: 0 }} onClick={(event) => event.stopPropagation()}><button className="modal-close" type="button" aria-label="Đóng bảng giá" onClick={() => setShowPriceModal(false)}><Icon name="close" /></button><span className="eyebrow">CINESTAR HUẾ · THAM KHẢO</span><h2 id="price-modal-title">Bảng giá vé</h2><p>Giá mẫu áp dụng theo loại ghế; giá thực tế có thể thay đổi theo ngày và suất chiếu.</p><div className="price-table"><div><b>Đối tượng</b><b>Ngày thường</b><b>Cuối tuần</b></div><div><span>Người lớn</span><strong>105.000đ</strong><strong>125.000đ</strong></div><div><span>Học sinh / Sinh viên</span><strong>85.000đ</strong><strong>105.000đ</strong></div><div><span>Trẻ em</span><strong>65.000đ</strong><strong>75.000đ</strong></div><div><span>Ghế VIP</span><strong>145.000đ</strong><strong>165.000đ</strong></div></div><button className="checkout-button" type="button" onClick={() => setShowPriceModal(false)}>Đã hiểu</button></motion.section></motion.div>}
      </AnimatePresence>
      <AnimatePresence>
        {ticket && <motion.div className="modal-backdrop" role="presentation" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setTicket(null)}><motion.section className="ticket-modal" role="dialog" aria-modal="true" aria-labelledby="ticket-title" initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.96, opacity: 0 }} onClick={(event) => event.stopPropagation()}><button className="modal-close" type="button" aria-label="Đóng" onClick={() => setTicket(null)}><Icon name="close" /></button><div className="success-mark"><Icon name="check" size={28} /></div><span className="eyebrow">ĐẶT VÉ THÀNH CÔNG</span><h2 id="ticket-title">Hẹn gặp bạn ở rạp<span>.</span></h2><p>Vé điện tử đã được lưu trên thiết bị của bạn.</p><div className="ticket-stub"><div><span>{ticket.movie}</span><b>{ticket.date} · {ticket.time}</b><small>GHẾ {ticket.seats.join(', ')} · PHÒNG 04</small><small>MÃ VÉ · {ticket.code}</small></div><div className="qr-art" aria-label="Mã vé điện tử">{Array.from({ length: 49 }, (_, i) => <i key={i} className={(i * 7 + i * i) % 5 < 2 ? 'qr-dark' : ''} />)}</div></div><strong className="ticket-amount">{money(ticket.total)}</strong><button className="checkout-button" type="button" onClick={() => setTicket(null)}>Hoàn tất</button></motion.section></motion.div>}
      </AnimatePresence>
    </div>
  );
}

export default CinemaApp;
