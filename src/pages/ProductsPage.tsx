import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/Button';
import { Modal } from '@/components/Modal';
import { useAuth } from '@/features/auth/useAuth';
import { ProductForm } from '@/features/products/ProductForm';
import { ProductTable } from '@/features/products/ProductTable';
import { useProductStore } from '@/features/products/useProductStore';
import { useToast } from '@/features/ui/useToast';

export function ProductsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { setSearchQuery } = useProductStore();
  const { showToast } = useToast();
  const logout = useAuth((s) => s.logout);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleAddSuccess = () => {
    setIsModalOpen(false);
    showToast('Товар успешно добавлен', 'success');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-900">Товары</h1>
          <div className="flex items-center gap-4">
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="search"
                placeholder="Найти"
                className="w-64 pl-9 pr-4 py-2 rounded-lg border border-gray-200 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" onClick={handleLogout} className="text-sm">
              Выйти
            </Button>
          </div>
        </div>
      </header>

      <main className="p-6">
        {/* Section header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-medium text-gray-700">Все позиции</h2>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              title="Обновить"
              onClick={() => queryClient.invalidateQueries({ queryKey: ['products'] })}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
            <Button onClick={() => setIsModalOpen(true)} className="gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Добавить
            </Button>
          </div>
        </div>

        <ProductTable />
      </main>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Добавить товар"
      >
        <ProductForm onSuccess={handleAddSuccess} />
      </Modal>
    </div>
  );
}
