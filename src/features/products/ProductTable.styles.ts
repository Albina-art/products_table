import styled from 'styled-components';

export const SortBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  border: none;
  background: none;
  padding: 0;
  font: inherit;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.grey[400]};
  cursor: pointer;
  transition: color 0.15s;
  &:hover {
    color: ${({ theme }) => theme.colors.blue[600]};
  }
`;

export const SortArrow = styled.span`
  color: ${({ theme }) => theme.colors.blue[600]};
`;

export const TableWrap = styled.div`
  position: relative;
  background: #fff;
  overflow: hidden;
`;

export const FetchingBar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: ${({ theme }) => theme.colors.grey[100]};
  overflow: hidden;
  border-radius: ${({ theme }) => theme.borderRadius.lg} ${({ theme }) => theme.borderRadius.lg} 0 0;
  z-index: 10;
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-family: ${({ theme }) => theme.fonts.robotoMono};
`;

export const Th = styled.th<{ $narrow?: boolean }>`
  padding: 0.75rem 1rem;
  text-align: left;
  font-weight: inherit;
  width: ${({ $narrow }) => ($narrow ? '3rem' : 'auto')};
`;

export const TheadRow = styled.tr`
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey[200]};
  background: rgba(249, 250, 251, 0.5);
`;

export { Checkbox } from './ProductCheckbox.styles';

export const ErrorText = styled.p`
  padding: 2rem 0;
  color: ${({ theme }) => theme.colors.red[600]};
`;

export const Pagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  border-top: 1px solid ${({ theme }) => theme.colors.grey[200]};
  background: rgba(249, 250, 251, 0.3);
`;

export const PageInfo = styled.span`
  font-size: ${({ theme }) => theme.typography.bodySm.fontSize};
  color: ${({ theme }) => theme.colors.grey[600]};
`;

export const PageNav = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

export const PageBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border: none;
  background: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  color: inherit;
  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.grey[200]};
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const PageNum = styled.button<{ $active?: boolean }>`
  min-width: 2rem;
  height: 2rem;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.bodySm.fontSize};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  cursor: pointer;
  background: ${({ theme, $active }) => ($active ? theme.colors.blue[600] : 'transparent')};
  color: ${({ theme, $active }) => ($active ? '#fff' : theme.colors.grey[600])};
  &:hover {
    background: ${({ theme, $active }) => ($active ? theme.colors.blue[600] : theme.colors.grey[200])};
  }
`;
