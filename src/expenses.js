// A tiny expense tracker. Amounts are in cents, dates are YYYY-MM-DD strings.

export function addExpense(expenses, { amount, category, date, note = "" }) {
  if (!Number.isInteger(amount) || amount <= 0) throw new Error("Amount must be a positive number of cents.");
  if (!category) throw new Error("Category is required.");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) throw new Error("Date must look like 2026-09-18.");
  return [...expenses, { id: expenses.length + 1, amount, category, date, note }];
}

export function totalByCategory(expenses) {
  const totals = {};
  for (const e of expenses) totals[e.category] = (totals[e.category] ?? 0) + e.amount;
  return totals;
}

export function monthlyTotal(expenses, month) {
  return expenses.filter((e) => e.date.startsWith(month)).reduce((sum, e) => sum + e.amount, 0);
}
