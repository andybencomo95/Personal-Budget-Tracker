import React from 'react';
import { categories } from '../data/categories';
import type { Transaction } from '../types';

interface TransactionListProps {
  transactions: Transaction[];
  filter: string;
}

export function TransactionList({ transactions, filter }: TransactionListProps) {
  const filteredTransactions = filter === 'all' 
    ? transactions 
    : transactions.filter(t => t.category === filter);

  return (
    <div className="space-y-4">
      {filteredTransactions.map((transaction) => {
        const category = [...categories.income, ...categories.expense].find(
          (c) => c.id === transaction.category
        );

        return (
          <div
            key={transaction.id}
            className="bg-white rounded-lg shadow p-4 flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center bg-${category?.color}-100`}
              >
                <span className={`text-${category?.color}-700 text-lg font-semibold`}>
                  {transaction.type === 'income' ? '+' : '-'}
                </span>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">
                  {transaction.description}
                </h3>
                <p className="text-sm text-gray-500">{category?.name}</p>
              </div>
            </div>
            <div
              className={`text-lg font-semibold ${
                transaction.type === 'income'
                  ? 'text-emerald-600'
                  : 'text-red-600'
              }`}
            >
              {transaction.type === 'income' ? '+' : '-'}$
              {transaction.amount.toFixed(2)}
            </div>
          </div>
        );
      })}
      
      {filteredTransactions.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No transactions found
        </div>
      )}
    </div>
  );
}