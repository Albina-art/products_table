import styled, { css } from 'styled-components';

import { Button } from '@/components/Button';
import { IconSearch } from '@/components/icons';


export const Page = styled.div`
  min-height: 100vh;
  width: 100%;
  font-family: ${({ theme }) => theme.fonts.cairo};
  background-color: ${({ theme }) => theme.colors.grey[28]};
  padding-top: 22.5px;
`;

export const Container = styled.div`
  max-width: 1920px;
  margin: 0 auto;
  width: 100%;
`;

export const Header = styled.header`
  background: #fff;
  padding-bottom: 20px;
  border-radius: 10px;
  height: 105px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;
  margin-bottom: 30px;
`;

export const HeaderInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const PageTitle = styled.h1`
  ${({ theme }) => theme.typography.title}
  font-family: ${({ theme }) => theme.fonts.cairo};
  color: ${({ theme }) => theme.colors.grey[900]};
  margin: 0;
`;

export const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
`;

export const SearchContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

export const SearchWrap = styled.div`
  position: relative;
  max-width: 1023px;
  width: 80%;
`;

export const SearchIcon = styled(IconSearch)`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.grey[600]};
`;

export const SearchInput = styled.input`
  ${({ theme }) => css`
    width: 100%;
    height: 48px;
    padding: 0 20px 0 52px;
    border: none;
    border-radius: ${theme.borderRadius.sm};
    font-size: ${theme.typography.bodySm.fontSize};
    background-color: ${theme.colors.grey[30]};
    &::placeholder {
      color: ${theme.colors.grey[400]};
    }
    &:focus {
      outline: none;
      box-shadow: 0 0 0 2px ${theme.colors.grey[200]};
    }
  `}
`;

export const LogoutButton = styled(Button)`
  ${({ theme }) => css`
    height: 48px;
    font-size: ${theme.typography.bodySm.fontSize};
    font-weight: ${theme.fontWeight.semibold};
    border-color: ${theme.colors.grey[300]};
      &:hover {
        background: ${theme.colors.grey[100]};
        border-color: ${theme.colors.grey[300]};
      }
  `}
`;

export const Main = styled.main`
  background-color: #fff;
  padding: 30px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

export const SectionHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 40px;
`;

export const SectionTitle = styled.h2`
  margin: 0;
  ${({ theme }) => css`
    font-size: ${theme.typography.subtitle.fontSize};
    font-weight: ${theme.fontWeight.semibold};
    color: ${theme.colors.grey[700]};
  `}
`;

export const Toolbar = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  height: 42px;
`;

export const IconButton = styled.button`
  height: 100%;
  width: auto;
  aspect-ratio: 1/1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: 1px solid ${({ theme }) => theme.colors.grey[50]};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  color: ${({ theme }) => theme.colors.second.DEFAULT};
  cursor: pointer;
  &:hover {
    background: ${({ theme }) => theme.colors.grey[100]};
    color: ${({ theme }) => theme.colors.grey[700]};
  }
`;

export const AddButton = styled(Button)`
  gap: 15px;
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  border-radius: ${({ theme }) => theme.borderRadius.xs};
  ${({ theme }) => theme.typography.caption};
`;
