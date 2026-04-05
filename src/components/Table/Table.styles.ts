import styled from 'styled-components';

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;
`;

export const Th = styled.th`
  padding: 0.75rem 1rem;
  text-align: center;
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.colors.grey[700]};
`;

export const TheadRow = styled.tr`
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey[200]};
`;

export const BodyRow = styled.tr`
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey[100]};
  &:hover {
    background: rgba(249, 250, 251, 0.5);
  }
`;

export const Td = styled.td`
  padding: 0.75rem 1rem;
  font-size: ${({ theme }) => theme.typography.bodySm.fontSize};
  color: ${({ theme }) => theme.colors.grey[600]};
`;

export const SortBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  border: none;
  background: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  color: inherit;
  &:hover {
    color: ${({ theme }) => theme.colors.blue[600]};
  }
`;

export const Arrow = styled.span`
  color: ${({ theme }) => theme.colors.blue[600]};
`;