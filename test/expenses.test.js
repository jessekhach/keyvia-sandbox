import { test } from "node:test";
import assert from "node:assert/strict";
import { addExpense, monthlyTotal, totalByCategory } from "../src/expenses.js";

const sample = [
  { id: 1, amount: 1200, category: "travel", date: "2026-09-02", note: "" },
  { id: 2, amount: 450, category: "meals", date: "2026-09-10", note: "" },
  { id: 3, amount: 800, category: "travel", date: "2026-08-28", note: "" },
];

test("adds an expense", () => {
  const next = addExpense([], { amount: 999, category: "software", date: "2026-09-18" });
  assert.equal(next.length, 1);
  assert.equal(next[0].category, "software");
});

test("rejects amounts that aren't positive cents", () => {
  assert.throws(() => addExpense([], { amount: 0, category: "meals", date: "2026-09-18" }));
  assert.throws(() => addExpense([], { amount: 1.5, category: "meals", date: "2026-09-18" }));
});

test("totals by category", () => {
  assert.deepEqual(totalByCategory(sample), { travel: 2000, meals: 450 });
});

test("totals a month", () => {
  assert.equal(monthlyTotal(sample, "2026-09"), 1650);
});
