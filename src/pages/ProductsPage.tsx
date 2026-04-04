import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { Button } from '@/components/Button';
import { Modal } from '@/components/Modal';
import { useAuth } from '@/features/auth/useAuth';
import { ProductForm } from '@/features/products/ProductForm';
import { ProductTable } from '@/features/products/ProductTable';
import { useProductStore } from '@/features/products/useProductStore';
import { useToast } from '@/features/ui/useToast';

const Page = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.grey[50]};
  font-family: ${({ theme }) => theme.fonts.inter};
`;

const Header = styled.header`
  background: #fff;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey[200]};
  padding: 1rem 1.5rem;
`;

const HeaderInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const PageTitle = styled.h1`
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.grey[900]};
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const SearchWrap = styled.div`
  position: relative;
`;

const SearchIcon = styled.svg`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  width: 1rem;
  height: 1rem;
  color: ${({ theme }) => theme.colors.grey[400]};
`;

const SearchInput = styled.input`
  width: 16rem;
  padding: 0.5rem 1rem 0.5rem 2.25rem;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid ${({ theme }) => theme.colors.grey[200]};
  font-size: ${({ theme }) => theme.typography.bodySm.fontSize};
  &::placeholder {
    color: ${({ theme }) => theme.colors.grey[400]};
  }
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.blue[500]};
    border-color: transparent;
  }
`;

const LogoutButton = styled(Button)`
  font-size: ${({ theme }) => theme.typography.bodySm.fontSize};
`;

const Main = styled.main`
  padding: 1.5rem;
`;

const SectionHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const SectionTitle = styled.h2`
  margin: 0;
  font-size: 1rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.grey[700]};
`;

const Toolbar = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border: none;
  background: none;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  color: ${({ theme }) => theme.colors.grey[500]};
  cursor: pointer;
  &:hover {
    background: ${({ theme }) => theme.colors.grey[100]};
    color: ${({ theme }) => theme.colors.grey[700]};
  }
`;

const AddButton = styled(Button)`
  gap: 0.5rem;
`;

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
              <SearchIcon fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </SearchIcon>
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
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </IconButton>
            <AddButton onClick={() => setIsModalOpen(true)}>
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
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
