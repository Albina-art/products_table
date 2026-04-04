import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { IconRefresh } from '@/components/icons';
import { IconPlusCircle } from '@/components/icons/IconPlusCircle';
import { Modal } from '@/components/Modal';
import { useAuth } from '@/features/auth/useAuth';
import { ProductForm } from '@/features/products/ProductForm';
import { ProductTable } from '@/features/products/ProductTable';
import { useProductStore } from '@/features/products/useProductStore';
import { useToast } from '@/features/ui/useToast';

import * as S from './ProductsPage.styles';

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
    <S.Page>
      <S.Header>
        <S.Container>
          <S.HeaderInner>
            <S.PageTitle>Товары</S.PageTitle>
            <S.HeaderActions>
              <S.SearchContainer>
                <S.SearchWrap>
                  <S.SearchIcon aria-hidden />
                  <S.SearchInput
                    type="search"
                    placeholder="Найти"
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </S.SearchWrap>
              </S.SearchContainer>
              <S.LogoutButton variant="outline" onClick={handleLogout}>
                Выйти
              </S.LogoutButton>
            </S.HeaderActions>
          </S.HeaderInner>
        </S.Container>
      </S.Header>

      <S.Main>
        <S.Container>
          <S.SectionHead>
            <S.SectionTitle>Все позиции</S.SectionTitle>
            <S.Toolbar>
              <S.IconButton
                type="button"
                title="Обновить"
                onClick={() => queryClient.invalidateQueries({ queryKey: ['products'] })}
              >
                <IconRefresh />
              </S.IconButton>
              <S.AddButton onClick={() => setIsModalOpen(true)} variant="primary">
                <IconPlusCircle />
                Добавить
              </S.AddButton>
            </S.Toolbar>
          </S.SectionHead>

          <ProductTable />
        </S.Container>
      </S.Main>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Добавить товар">
        <ProductForm onSuccess={handleAddSuccess} />
      </Modal>
    </S.Page>
  );
}
