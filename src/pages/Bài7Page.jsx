import Lab1SuKien from '../components/Bài7/Lab1SuKien';
import Lab2DanhSach from '../components/Bài7/Lab2DanhSach';
import Lab3TheDiaDanh from '../components/Bài7/Lab3TheDiaDanh';
import Lab4TimMon from '../components/Bài7/Lab4TimMon';
import Lab5KeoTha from '../components/Bài7/Lab5KeoTha';
import '../styles/Bài7.css';

export default function Bài7Page() {
  return (
    <div className="bai7-page">
      <header className="bai7-hero">
        <div className="bai7-hero__bar"><span className="bai7-brand">PHÚ XUÂN</span><span>React · Tương tác · Huế</span></div>
        <div className="bai7-hero__content"><span className="bai7-kicker">Bài 7 · Quản lý sự kiện trong React</span><h1>Chạm vào Huế</h1><p>Thực hành sự kiện React qua những địa danh, món ăn và lịch trình của cố đô.</p><a href="#bai7-labs" className="bai7-button bai7-button--gold">Bắt đầu khám phá <span aria-hidden="true">↓</span></a></div>
      </header>
      <main id="bai7-labs" className="bai7-main">
        <div className="bai7-intro"><span className="bai7-kicker">Tương tác theo từng bước</span><h2>Mỗi thao tác kể một câu chuyện</h2><p>Năm không gian nhỏ để luyện tập event handler, state, ref, form, clipboard, kéo thả và khả năng truy cập.</p></div>
        <Lab1SuKien />
        <Lab2DanhSach />
        <Lab3TheDiaDanh />
        <Lab4TimMon />
        <Lab5KeoTha />
      </main>
      <footer className="bai7-footer">Phú Xuân · Học React bằng những điều thân thuộc</footer>
    </div>
  );
}
