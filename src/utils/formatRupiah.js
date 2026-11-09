// 1250000 -> "Rp 1.250.000"
// Done by hand so it looks the same on every platform.
export default function formatRupiah(amount, { showSign = false } = {}) {
  const digits = Math.abs(Math.round(amount))
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  let sign = '';
  if (amount < 0) sign = '- ';
  else if (showSign && amount > 0) sign = '+ ';

  return `${sign}Rp ${digits}`;
}
