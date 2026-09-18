import { useForm } from '../hooks/useForm';
import { kiemChung } from '../features/dia-diem/kiemChung';
import FormThemDiaDiem from '../features/dia-diem/FormThemDiaDiem';
import XemTruocTheDiaDiem from '../features/dia-diem/XemTruocTheDiaDiem';

const GIA_TRI_BAN_DAU = {
  ten: '',
  moTa: '',
  giaVe: '',
  phuong: '',
  loaiHinh: 'di-tich',
  dongY: false,
};

export default function TrangThemDiaDiem() {
  const form = useForm(GIA_TRI_BAN_DAU, kiemChung);

  return (
    <div className="bo-cuc-hai-cot">
      <FormThemDiaDiem {...form} />
      <XemTruocTheDiaDiem duLieu={form.duLieu} />
    </div>
  );
}
