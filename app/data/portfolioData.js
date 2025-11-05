import { IMAGES } from '../constants/image';

// Helper function to convert month string to number
export const monthToNumber = (monthStr) => {
  const monthMap = {
    'TH1': 1, 'TH2': 2, 'TH3': 3, 'TH4': 4, 'TH5': 5, 'TH6': 6,
    'TH7': 7, 'TH8': 8, 'TH9': 9, 'TH10': 10, 'TH11': 11, 'TH12': 12
  };
  return monthMap[monthStr] || 0;
};

// Portfolio list order (from newest to oldest)
export const PORTFOLIO_LIST = [
  'nathanxtracy',
  'tienxwilliam',
  'vanxtuc',
  'tranxtai',
  'mayxmat',
  'duyenxsteven',
  'hanxtuan',
  'phuongxhien',
  'duyxmy',
  'duyxmy2',
  'phuongxhien2',
  'phuongxhien3',
  'elopement',
  'hieuxbrian',
  'duyxyen',
  'thoaxbinh',
  'anxnghi',
  'anxtoan',
  'hanxtung',
  'joshxlinda',
  'maimyxtoanem',
  'nganxnhat',
  'nghiaxnguyet',
  'thongxhuyen',
  'tramxmax',
  'tranxtai2',
  'vietxquynh',
  'vietxquynh2',
  'vyxkhang',
  'trangxvini',
  'benang',
  'ngocxshawn'
];

// Portfolio items for grid display
export const PORTFOLIO_ITEMS_RAW = [
  {
    id: 1,
    date: { day: '27', month: 'TH9', year: '2025' },
    categoryKey: 'weddingDecor',
    title: 'NATHAN & TRACY',
    author: 'Ant Wedding',
    descriptionKey: 'nathanTracyDesc',
    image: IMAGES.nathanxtracy,
    likes: 12,
    endpoint: 'nathanxtracy'
  },
  {
    id: 2,
    date: { day: '21', month: 'TH3', year: '2025' },
    categoryKey: 'weddingDecor',
    title: 'TIÊN & WILLIAM',
    author: 'Ant Wedding',
    descriptionKey: 'tienWilliamDesc',
    image: IMAGES.tienxwilliam,
    likes: 18,
    endpoint: 'tienxwilliam'
  },
  {
    id: 3,
    date: { day: '20', month: 'TH8', year: '2024' },
    categoryKey: 'restaurantDecorCategory',
    title: 'VAN & TUC',
    descriptionKey: 'vanTucDesc',
    author: 'Ant Wedding',
    image: IMAGES.vanxtuc,
    likes: 15,
    endpoint: 'vanxtuc'
  },
  {
    id: 4,
    date: { day: '03', month: 'TH8', year: '2024' },
    categoryKey: 'weddingDecor',
    title: 'TRAN & TAI',
    author: 'Ant Wedding',
    descriptionKey: 'tranTaiDesc',
    image: IMAGES.tranxtai,
    likes: 20,
    endpoint: 'tranxtai'
  },
  {
    id: 5,
    date: { day: '24', month: 'TH5', year: '2024' },
    categoryKey: 'weddingDecor',
    title: 'MAY & MATT',
    author: 'Ant Wedding',
    descriptionKey: 'mayMattDesc',
    image: IMAGES.mayxmat,
    likes: 14,
    endpoint: 'mayxmat'
  },
  {
    id: 6,
    date: { day: '22', month: 'TH8', year: '2024' },
    categoryKey: 'weddingDecor',
    title: 'DUYEN & STEVEN',
    author: 'Ant Wedding',
    descriptionKey: 'duyenStevenDesc',
    image: IMAGES.duyenxsteven,
    likes: 22,
    endpoint: 'duyenxsteven'
  },
  {
    id: 7,
    date: { day: '16', month: 'TH8', year: '2025' },
    categoryKey: 'weddingDecor',
    title: 'HÂN & TUẤN',
    author: 'Ant Wedding',
    descriptionKey: 'hanTuanDesc',
    image: IMAGES.service,
    likes: 16,
    endpoint: 'hanxtuan'
  },
  {
    id: 8,
    date: { day: '14', month: 'TH6', year: '2022' },
    categoryKey: 'ancestorDecorCategory',
    title: 'PHUONG & HIEN',
    author: 'Ant Wedding',
    descriptionKey: 'phuongHienDesc',
    image: IMAGES.phuongxhien,
    likes: 19,
    endpoint: 'phuongxhien'
  },
  {
    id: 9,
    date: { day: '09', month: 'TH11', year: '2022' },
    categoryKey: 'ancestorDecorCategory',
    title: 'MY & DUY',
    author: 'Ant Wedding',
    descriptionKey: 'myDuyDesc',
    image: IMAGES.duyxmy,
    likes: 17,
    endpoint: 'duyxmy'
  },
  {
    id: 29,
    date: { day: '10', month: 'TH11', year: '2022' },
    categoryKey: 'restaurantDecorCategory',
    title: 'DUY & MY ',
    author: 'Ant Wedding',
    descriptionKey: 'duyMy2Desc',
    image: IMAGES.duyxmy2_1,
    likes: 20,
    endpoint: 'duyxmy2'
  },
  {
    id: 10,
    date: { day: '14', month: 'TH6', year: '2022' },
    categoryKey: 'restaurantDecorCategory',
    title: 'PHUONG & HIEN',
    author: 'Ant Wedding',
    descriptionKey: 'phuongHien2Desc',
    image: IMAGES.phuongxhien2_10,
    likes: 25,
    endpoint: 'phuongxhien2'
  },
  {
    id: 31,
    date: { day: '15', month: 'TH6', year: '2022' },
    categoryKey: 'weddingDecor',
    title: 'PHUONG & HIEN',
    author: 'Ant Wedding',
    descriptionKey: 'phuongHien3Desc',
    image: IMAGES.phuongxhien3_2,
    likes: 26,
    endpoint: 'phuongxhien3'
  },
  {
    id: 11,
    date: { day: '15', month: 'TH3', year: '2022' },
    categoryKey: 'weddingDecor',
    title: 'ELOPE WEDDING',
    author: 'Ant Wedding',
    descriptionKey: 'elopementDesc',
    image: IMAGES.elopement,
    likes: 21,
    endpoint: 'elopement'
  },
  {
    id: 12,
    date: { day: '17', month: 'TH6', year: '2023' },
    categoryKey: 'weddingDecor',
    title: 'HIẾU & BRIAN',
    author: 'Ant Wedding',
    descriptionKey: 'hieuBrianDesc',
    image: IMAGES.hieuxbrian,
    likes: 23,
    endpoint: 'hieuxbrian'
  },
  {
    id: 13,
    date: { day: '10', month: 'TH5', year: '2023' },
    categoryKey: 'PRE WEDDING',
    title: 'DUY & YEN',
    author: 'Ant Wedding',
    descriptionKey: 'duyYenDesc',
    image: IMAGES.duyxyen,
    likes: 20,
    endpoint: 'duyxyen'
  },
  {
    id: 14,
    date: { day: '15', month: 'TH4', year: '2023' },
    categoryKey: 'ancestorDecorCategory',
    title: 'THOA & BINH',
    author: 'Ant Wedding',
    descriptionKey: 'thoaBinhDesc',
    image: IMAGES.thoaxbinh,
    likes: 18,
    endpoint: 'thoaxbinh'
  },
  {
    id: 15,
    date: { day: '08', month: 'TH3', year: '2023' },
    categoryKey: 'weddingDecor',
    title: 'AN & NGHI',
    author: 'Ant Wedding',
    descriptionKey: 'anNghiDesc',
    image: IMAGES.anxnghi,
    likes: 19,
    endpoint: 'anxnghi'
  },
  {
    id: 16,
    date: { day: '22', month: 'TH2', year: '2023' },
    categoryKey: 'ancestorDecorCategory',
    title: 'AN & TOAN',
    author: 'Ant Wedding',
    descriptionKey: 'anhToanDesc',
    image: IMAGES.anxtoan,
    likes: 21,
    endpoint: 'anxtoan'
  },
  {
    id: 17,
    date: { day: '12', month: 'TH1', year: '2023' },
    categoryKey: 'weddingDecor',
    title: 'HAN & TUNG',
    author: 'Ant Wedding',
    descriptionKey: 'hanTungDesc',
    image: IMAGES.hanxtung,
    likes: 17,
    endpoint: 'hanxtung'
  },
  {
    id: 18,
    date: { day: '05', month: 'TH12', year: '2022' },
    categoryKey: 'weddingDecor',
    title: 'JOSH & LINDA',
    author: 'Ant Wedding',
    descriptionKey: 'joshLindaDesc',
    image: IMAGES.joshxlinda,
    likes: 24,
    endpoint: 'joshxlinda'
  },
  {
    id: 19,
    date: { day: '18', month: 'TH11', year: '2022' },
    categoryKey: 'weddingDecor',
    title: 'MAI MY & TOAN EM',
    author: 'Ant Wedding',
    descriptionKey: 'maiMyToanEmDesc',
    image: IMAGES.maimyxtoanem,
    likes: 22,
    endpoint: 'maimyxtoanem'
  },
  {
    id: 20,
    date: { day: '25', month: 'TH10', year: '2022' },
    categoryKey: 'weddingDecor',
    title: 'NGAN & NHAT',
    author: 'Ant Wedding',
    descriptionKey: 'nganNhatDesc',
    image: IMAGES.nganxnhat,
    likes: 20,
    endpoint: 'nganxnhat'
  },
  {
    id: 21,
    date: { day: '10', month: 'TH9', year: '2022' },
    categoryKey: 'weddingDecor',
    title: 'NGHIA & NGUYET',
    author: 'Ant Wedding',
    descriptionKey: 'nghiaNguyetDesc',
    image: IMAGES.nghiaxnguyet,
    likes: 18,
    endpoint: 'nghiaxnguyet'
  },
  {
    id: 22,
    date: { day: '28', month: 'TH8', year: '2022' },
    categoryKey: 'weddingDecor',
    title: 'THONG & HUYEN',
    author: 'Ant Wedding',
    descriptionKey: 'thongHuyenDesc',
    image: IMAGES.thongxhuyen,
    likes: 19,
    endpoint: 'thongxhuyen'
  },
  {
    id: 23,
    date: { day: '15', month: 'TH7', year: '2022' },
    categoryKey: 'weddingDecor',
    title: 'TRAM & MAX',
    author: 'Ant Wedding',
    descriptionKey: 'tramMaxDesc',
    image: IMAGES.tramxmax,
    likes: 23,
    endpoint: 'tramxmax'
  },
  {
    id: 24,
    date: { day: '05', month: 'TH6', year: '2022' },
    categoryKey: 'ancestorDecorCategory',
    title: 'TRAN & TAI',
    author: 'Ant Wedding',
    descriptionKey: 'tranTai2Desc',
    image: IMAGES.tranxtai2_4,
    likes: 16,
    endpoint: 'tranxtai2'
  },
  {
    id: 25,
    date: { day: '20', month: 'TH5', year: '2022' },
    categoryKey: 'restaurantDecorCategory',
    title: 'VIET & QUYNH',
    author: 'Ant Wedding',
    descriptionKey: 'vietQuynhDesc',
    image: IMAGES.vietxquynh1,
    likes: 21,
    endpoint: 'vietxquynh'
  },
  {
    id: 26,
    date: { day: '18', month: 'TH5', year: '2022' },
    categoryKey: 'ancestorDecorCategory',
    title: 'VIET & QUYNH ',
    author: 'Ant Wedding',
    descriptionKey: 'vietQuynh2Desc',
    image: IMAGES.vietxquynh,
    likes: 17,
    endpoint: 'vietxquynh2'
  },
  {
    id: 27,
    date: { day: '10', month: 'TH4', year: '2022' },
    categoryKey: 'ancestorDecorCategory',
    title: 'VY & KHANG',
    author: 'Ant Wedding',
    descriptionKey: 'vyKhangDesc',
    image: IMAGES.vyxkhang,
    likes: 20,
    endpoint: 'vyxkhang'
  },
  {
    id: 30,
    date: { day: '28', month: 'TH3', year: '2022' },
    categoryKey: 'weddingDecor',
    title: 'TRANG & VINI',
    author: 'Ant Wedding',
    descriptionKey: 'trangViniDesc',
    image: IMAGES.trangxvini,
    likes: 22,
    endpoint: 'trangxvini'
  },
  {
    id: 28,
    date: { day: '25', month: 'TH3', year: '2022' },
    categoryKey: 'birthday',
    title: 'EVENT BENANG',
    author: 'Ant Wedding',
    descriptionKey: 'benangDesc',
    image: IMAGES.eventxbenang,
    likes: 19,
    endpoint: 'benang'
  },
  {
    id: 32,
    date: { day: '15', month: 'TH2', year: '2022' },
    categoryKey: 'weddingDecor',
    title: 'NGOC & SHAWN',
    author: 'Ant Wedding',
    descriptionKey: 'ngocShawnDesc',
    image: IMAGES.ngocxshawn,
    likes: 24,
    endpoint: 'ngocxshawn'
  }
];
