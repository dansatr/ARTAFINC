import { transactions } from '../data/sampleData';

export function getSpent(categoryId) {
  return transactions
    .filter((item) => item.categoryId === categoryId && item.amount < 0)
    .reduce((total, item) => total + Math.abs(item.amount), 0);
}

export function getTotals() {
  let income = 0;
  let expense = 0;

  transactions.forEach((item) => {
    if (item.amount > 0) income += item.amount;
    else expense += Math.abs(item.amount);
  });

  return { income, expense };
}
