export type TourCategory = 'di-tich' | 'am-thuc' | 'thien-nhien' | 'lang-nghe';

export type Tour = {
  id: string;
  name: string;
  category: TourCategory;
  price: number;
  duration: number;
  image: string;
  hot?: boolean;
};

export const tours: Tour[] = [
  { id: 't01', name: 'Đại Nội Huế', category: 'di-tich', price: 300000, duration: 3, image: '', hot: true },
  { id: 't02', name: 'Chợ Đông Ba', category: 'am-thuc', price: 150000, duration: 2, image: '' },
  { id: 't03', name: 'Cầu Tràng Tiền', category: 'di-tich', price: 100000, duration: 1, image: '' },
  { id: 't04', name: 'Lăng Tự Đức', category: 'di-tich', price: 400000, duration: 4, image: '', hot: true },
  { id: 't05', name: 'Đầm phá Tam Giang', category: 'thien-nhien', price: 600000, duration: 5, image: '' },
  { id: 't06', name: 'Làng nón Phú Cam', category: 'lang-nghe', price: 200000, duration: 2, image: '' },
];
