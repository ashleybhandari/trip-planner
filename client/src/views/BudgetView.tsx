import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { useParams } from "react-router";

import AddExpenseForm from "@/components/budget/AddExpenseForm";
import { addExpenseFormSchema } from "@/components/budget/add-expense-form-schema";
import { budgetColumns } from "@/components/budget/budget-columns";
import {Card} from "@/components/ui/card";
import DataTable from "@/components/ui/DataTable";
import PageSection from "@/components/ui/PageSection";
import Spinner from "@/components/ui/Spinner";
import {createBudgetItem, getBudgetByTripSlug} from "@/api/budget";


import { Expense } from "@/types/Expense";
import { formatAsUsd } from "@/utils/format-as-usd";
import { MOCK_EXPENSES } from "@/mock/mock-expenses";
import { MOCK_USERS } from "@/mock/mock-expenses"; 

type expenseItem = {
  expense: string;
  amount: string;
  date: string;
  paidBy: string;
  _id: string;

};


export default function MyTripView() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const users = Object.values(MOCK_USERS);
  const { tripId } = useParams();  
  const tripSlug= tripId;
  const token = localStorage.getItem("token"); 


  // Total amount collectively spent
  const totalSpent = useMemo(
    () => expenses.reduce((acc, cur) => acc + cur.amount, 0),
    [expenses]
  );

  // How much each user has spent and currently owes
  const balances = useMemo(
    () =>
      users.map((user) => {
        const spent = expenses.reduce(
          (acc, cur) =>
            cur.payer.toLowerCase() === user.toLowerCase()
              ? acc + cur.amount
              : acc,
          0
        );
        const owes = (totalSpent - spent) / users.length;
        return { user, spent, owes };
      }),
    [expenses, totalSpent, users]
  );

  // Get a particular user's balance
  const getBalance = (user: string) => {
    return balances.find((b) => b.user.toLowerCase() === user.toLowerCase());
  };

  // Add an expense to the table
  const handleAddExpense = async (values: z.infer<typeof addExpenseFormSchema>) => {
    console.log(values); 
    const token = localStorage.getItem("token");
    const date= new Date();
    const newBudgetItemData = await createBudgetItem(token, tripSlug, values.name, date, values.amount, values.payer);

    setExpenses((prev) => [{ ...values, date: new Date() }, ...prev]);
  };

  // Make expense more reader-friendly so it can be supplied to the table
  const stringifyExpense = (e: Expense) => ({
    name: e.name,
    date: e.date.toLocaleDateString(),
    amount: formatAsUsd(e.amount),
    payer: e.payer,
  });

 
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const budgetItemsData = await getBudgetByTripSlug(token, tripSlug);
        const formattedBudgetItemsData: Expense[] = budgetItemsData.map((budget_item: any) => ({
          name: budget_item.expense,
          date: new Date(budget_item.date),
          amount: Number(budget_item.amount),
          payer: budget_item.paidBy,
        }));
  
        setExpenses(formattedBudgetItemsData.sort((a, b) => (a.date < b.date ? 1 : -1)));
      } catch (err) {
        console.error("Error fetching budget:", err);
      } finally {
        setIsLoading(false);
      }
    };
  
    if (tripSlug && token) fetchExpenses();
  }, [tripSlug, token]);
  
  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="w-full h-full flex flex-col gap-3">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <Card title="total spent" className="bg-primary text-on-primary">
              {formatAsUsd(totalSpent)}
            </Card>
            {users.map((user) => (
              <Card key={user} title={user}>
                <div>spent {formatAsUsd(getBalance(user)?.spent)}</div>
                <div>owes {formatAsUsd(getBalance(user)?.owes)}</div>
              </Card>
            ))}
          </div>
          <PageSection className="flex items-center p-5">
            <AddExpenseForm onSubmit={handleAddExpense} />
          </PageSection>
          <DataTable
            columns={budgetColumns}
            data={expenses.map(stringifyExpense)}
          />
        </div>
      )}
    </>
  );
}
