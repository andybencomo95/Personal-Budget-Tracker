import React, { useState } from 'react';
import { Wallet } from 'lucide-react';
import { TransactionForm } from './components/TransactionForm';
import { TransactionList } from './components/TransactionList';
import { Summary } from './components/Summary';
import { categories } from './data/categories';
import type { Transaction } from './types';

function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filter, setFilter] = useState('all');

  const handleAddTransaction = (newTransaction: Omit<Transaction, 'id'>) => {
    setTransactions((prev) => [
      {
        ...newTransaction,
        id: crypto.randomUUID(),
      },
      ...prev,
    ]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Wallet className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">
              Personal Budget Tracker
            </h1>
          </div>
          <p className="text-gray-600">
            Keep track of your income and expenses easily
          </p>
        </header>

        <Summary transactions={transactions} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Add Transaction
            </h2>
            <TransactionForm onAddTransaction={handleAddTransaction} />
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">
                Transaction History
              </h2>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="all">All Categories</option>
                <optgroup label="Income">
                  {categories.income.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </optgroup>
                <optgroup label="Expenses">
                  {categories.expense.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </optgroup>
              </select>
            </div>
            <TransactionList transactions={transactions} filter={filter} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;