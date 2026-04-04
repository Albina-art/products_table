import styled from 'styled-components';

export const Text = styled.text<{ $fontSize: string }>`
  background: transparent;
  fill: ${({ theme }) => theme.colors.grey[200]};
  font-size: ${({ $fontSize }: { $fontSize: string }) => $fontSize};
`;
