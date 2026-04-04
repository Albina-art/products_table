import styled from 'styled-components';

import { Button } from '@/components/Button';
import { IconSearch } from '@/components/icons';

export const Page = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.grey[50]};
  font-family: ${({ theme }) => theme.fonts.inter};
`;

export const Header = styled.header`
  background: #fff;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey[200]};
  padding: 1rem 1.5rem;
`;

export const HeaderInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const PageTitle = styled.h1`
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.grey[900]};
`;

export const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const SearchWrap = styled.div`
  position: relative;
`;

export const SearchIcon = styled(IconSearch)`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  width: 1rem;
  height: 1rem;
  color: ${({ theme }) => theme.colors.grey[400]};
`;

export const SearchInput = styled.input`
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

export const LogoutButton = styled(Button)`
  font-size: ${({ theme }) => theme.typography.bodySm.fontSize};
`;

export const Main = styled.main`
  padding: 1.5rem;
`;

export const SectionHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

export const SectionTitle = styled.h2`
  margin: 0;
  font-size: 1rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.grey[700]};
`;

export const Toolbar = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const IconButton = styled.button`
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

export const AddButton = styled(Button)`
  gap: 0.5rem;
`;
