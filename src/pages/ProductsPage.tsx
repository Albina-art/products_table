import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { IconPlus, IconRefresh } from '@/components/icons';
import { Modal } from '@/components/Modal';
import { useAuth } from '@/features/auth/useAuth';
import { ProductForm } from '@/features/products/ProductForm';
import { ProductTable } from '@/features/products/ProductTable';
import { useProductStore } from '@/features/products/useProductStore';
import { useToast } from '@/features/ui/useToast';

import {
  AddButton,
  Header,
  HeaderActions,
  HeaderInner,
  IconButton,
  LogoutButton,
  Main,
  Page,
  PageTitle,
  SearchIcon,
  SearchInput,
  SearchWrap,
  SectionHead,
  SectionTitle,
  Toolbar,
} from './ProductsPage.styles';

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
    <Page>
      <Header>
        <HeaderInner>
          <PageTitle>Товары</PageTitle>
          <HeaderActions>
            <SearchWrap>
              <SearchIcon aria-hidden />
              <SearchInput
                type="search"
                placeholder="Найти"
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </SearchWrap>
            <LogoutButton variant="outline" onClick={handleLogout}>
              Выйти
            </LogoutButton>
          </HeaderActions>
        </HeaderInner>
      </Header>

      <Main>
        <SectionHead>
          <SectionTitle>Все позиции</SectionTitle>
          <Toolbar>
            <IconButton
              type="button"
              title="Обновить"
              onClick={() => queryClient.invalidateQueries({ queryKey: ['products'] })}
            >
              <IconRefresh size={20} />
            </IconButton>
            <AddButton onClick={() => setIsModalOpen(true)}>
              <IconPlus size={16} />
              Добавить
            </AddButton>
          </Toolbar>
        </SectionHead>

        <ProductTable />
      </Main>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Добавить товар">
        <ProductForm onSuccess={handleAddSuccess} />
      </Modal>
    </Page>
  );
}
