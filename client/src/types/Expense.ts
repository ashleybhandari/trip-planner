export type Expense = {
  id: string;
  name: string;
  date: Date;
  amount: number;
  payer: string;
};

export type ExpenseTableRow = {
  name: string;
  date: string;
  amount: string;
  payer: string;
};
