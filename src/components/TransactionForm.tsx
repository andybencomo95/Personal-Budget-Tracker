import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { categories } from '../data/categories';
import type { Transaction } from '../types';

interface TransactionFormProps {
  onAddTransaction: (transaction: Omit<Transaction, 'id'>) => void;
}

export function TransactionForm({ onAddTransaction }: TransactionFormProps) {
  const [type, setType] = useState<'income' | 'expense'>('income');
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    onAddTransaction({
      type,
      amount: Number(formData.get('amount')),
      category: formData.get('category') as string,
      description: formData.get('description') as string,
      date: new Date().toISOString(),
    });
    
    form.reset();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <div className="flex gap-4 mb-4">
        <button
          type="button"
          onClick={() => setType('income')}
          className={`flex-1 py-2 px-4 rounded-lg font-medium ${
            type === 'income'
              ? 'bg-emerald-100 text-emerald-700'
              : 'bg-gray-100 text-gray-600'
          }`}
        >
          Income
        </button>
        <button
          type="button"
          onClick={() => setType('expense')}
          className={`flex-1 py-2 px-4 rounded-lg font-medium ${
            type === 'expense'
              ? 'bg-red-100 text-red-700'
              : 'bg-gray-100 text-gray-600'
          }`}
        >
          Expense
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Amount
          </label>
          <input
            type="number"
            name="amount"
            required
            min="0"
            step="0.01"
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            name="category"
            required
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            {categories[type].map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <input
            type="text"
            name="description"
            required
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <PlusCircle size={20} />
          Add {type === 'income' ? 'Income' : 'Expense'}
        </button>
      </div>
    </form>
  );
}