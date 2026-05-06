/**
 * Categorical budget summary, in INR thousands.
 * Sourced from "London Trip" tab summary block.
 */
export interface BudgetCategory {
  name: string;
  budgeted: number;
  actual: number | null; // null where not yet realized
  color: string;
}

export const BUDGET: BudgetCategory[] = [
  { name: "Stays",        budgeted: 216, actual: 190.4, color: "#1f3a5f" },
  { name: "Flights",      budgeted: 100, actual: 96,    color: "#8b3a3a" },
  { name: "Tours",        budgeted: 60,  actual: 48,    color: "#4a5c3a" },
  { name: "Train Tickets",budgeted: 100, actual: 39,    color: "#a0723a" },
  { name: "Food",         budgeted: 80,  actual: null,  color: "#5a4a35" },
  { name: "Transport",    budgeted: 10,  actual: null,  color: "#7a6a55" },
  { name: "Attractions",  budgeted: 10,  actual: null,  color: "#6a5a45" },
];

export const BUDGET_TOTAL = {
  budgeted: BUDGET.reduce((s, c) => s + c.budgeted, 0),
  actual: BUDGET.reduce((s, c) => s + (c.actual ?? 0), 0),
};
