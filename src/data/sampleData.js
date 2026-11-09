// Static data for the prototype. Nothing here comes from a server.

export const summary = {
  balance: 12450000,
  period: 'Oktober 2026',
};

// icon names come from Ionicons (@expo/vector-icons)
export const categories = {
  income: { label: 'Pemasukan', icon: 'wallet-outline' },
  household: { label: 'Kebutuhan rumah', icon: 'cart-outline' },
  bills: { label: 'Tagihan', icon: 'flash-outline' },
  food: { label: 'Makanan', icon: 'restaurant-outline' },
  transport: { label: 'Transportasi', icon: 'car-outline' },
  fun: { label: 'Hiburan', icon: 'film-outline' },
};

export const transactions = [
  {
    id: 'TRX-1001',
    title: 'Gaji Oktober',
    categoryId: 'income',
    date: '1 Okt 2026',
    time: '09.00',
    amount: 8500000,
    method: 'Transfer bank',
    note: 'Gaji bulanan dari kantor.',
  },
  {
    id: 'TRX-1002',
    title: 'Belanja bulanan',
    categoryId: 'household',
    date: '3 Okt 2026',
    time: '16.20',
    amount: -1240000,
    method: 'Kartu debit',
    note: 'Beras, minyak, sabun dan kebutuhan dapur lain.',
  },
  {
    id: 'TRX-1003',
    title: 'Listrik PLN',
    categoryId: 'bills',
    date: '5 Okt 2026',
    time: '08.45',
    amount: -485000,
    method: 'Dompet digital',
    note: 'Token listrik untuk satu bulan.',
  },
  {
    id: 'TRX-1004',
    title: 'Makan siang',
    categoryId: 'food',
    date: '8 Okt 2026',
    time: '12.30',
    amount: -65000,
    method: 'QRIS',
    note: 'Makan siang dengan tim.',
  },
  {
    id: 'TRX-1005',
    title: 'Transfer dari Sari',
    categoryId: 'income',
    date: '10 Okt 2026',
    time: '19.05',
    amount: 250000,
    method: 'Transfer bank',
    note: 'Bayar patungan kado.',
  },
  {
    id: 'TRX-1006',
    title: 'Bensin',
    categoryId: 'transport',
    date: '11 Okt 2026',
    time: '07.40',
    amount: -150000,
    method: 'Tunai',
    note: '',
  },
  {
    id: 'TRX-1007',
    title: 'Internet rumah',
    categoryId: 'bills',
    date: '12 Okt 2026',
    time: '10.15',
    amount: -350000,
    method: 'Autodebet',
    note: 'Langganan internet 50 Mbps.',
  },
  {
    id: 'TRX-1008',
    title: 'Nonton bioskop',
    categoryId: 'fun',
    date: '13 Okt 2026',
    time: '20.00',
    amount: -120000,
    method: 'QRIS',
    note: 'Dua tiket.',
  },
];


export const budgets = [
  { categoryId: 'household', limit: 2000000 },
  { categoryId: 'bills', limit: 800000 },
  { categoryId: 'food', limit: 1000000 },
  { categoryId: 'transport', limit: 500000 },
  { categoryId: 'fun', limit: 300000 },
];
