import React from 'react';
import { DollarSign, TrendingUp, TrendingDown } from 'lucide-react';
import type { Transaction } from '../types';

interface SummaryProps {
  transactions: Transaction[];
}

export function Summary({ transactions }: SummaryProps) {
  const income = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const expenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = income - expenses;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center gap-4">
          <div className="bg-emerald-100 p-3 rounded-lg">
            <TrendingUp className="w-6 h-6 text-emerald-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Income</p>
            <p className="text-2xl font-semibold text-emerald-600">
              ${income.toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center gap-4">
          <div className="bg-red-100 p-3 rounded-lg">
            <TrendingDown className="w-6 h-6 text-red-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Expenses</p>
            <p className="text-2xl font-semibold text-red-600">
              ${expenses.toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center gap-4">
          <div className="bg-blue-100 p-3 rounded-lg">
            <DollarSign className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Current Balance</p>
            <p className={`text-2xl font-semibold ${
              balance >= 0 ? 'text-blue-600' : 'text-red-600'
            }`}>
              ${balance.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}