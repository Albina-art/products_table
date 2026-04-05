import styled, { css } from 'styled-components';

export const SortBtn = styled.button<{ $isLeftTextAlign?: boolean }>`
  display: flex;
  align-items: center;
  margin: ${({ $isLeftTextAlign }) => ($isLeftTextAlign ? 0 : '0 auto')};
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

export const TableScroll = styled.div`
  overflow-x: auto;
  overflow-y: visible;
  -webkit-overflow-scrolling: touch;
  max-width: 100%;
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
  z-index: 2;
`;

export const StyledTable = styled.table`
  width: 100%;
  min-width: max-content;
  border-collapse: collapse;
  font-family: ${({ theme }) => theme.fonts.robotoMono};
`;

export const Th = styled.th<{ $narrow?: boolean }>`
  padding: 25.5px 2px 25.5px 18px;
  text-align: center;
  font-weight: inherit;
  width: ${({ $narrow }) => ($narrow ? '3rem' : 'auto')};
  max-width: max-content;
  flex-direction: column;
`;

export const TheadRow = styled.tr`
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey[150]};
`;

export { Checkbox } from './ProductCheckbox.styles';

export const EmptyText = styled.p`
  padding: 2rem 0;
  color: ${({ theme }) => theme.colors.grey[400]};
  text-align: center;
  font-size: ${({ theme }) => theme.typography.body.fontSize};
`;

export const ErrorText = styled.p`
  padding: 2rem 0;
  color: ${({ theme }) => theme.colors.red[600]};
`;

export const Pagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  border-top: 1px solid ${({ theme }) => theme.colors.grey[150]};
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
  min-width: 30px;
  height: 30px;
  ${({ theme, $active }) => css`
    border: 1px solid ${$active ? theme.colors.blue[300] : theme.colors.grey[50]};
    border-radius: ${theme.borderRadius.xxs};
    font-size: ${theme.typography.bodySm.fontSize};
    font-weight: ${theme.fontWeight.medium};
    cursor: pointer;
    background: ${($active ? theme.colors.blue[300] : 'transparent')};
    color: ${($active ? '#fff' : theme.colors.grey[400])};
    &:hover {
      background: ${($active ? theme.colors.blue[500] : theme.colors.grey[200])};
    }
  }
  `}
`;
