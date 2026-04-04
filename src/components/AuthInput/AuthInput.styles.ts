import * as Label from '@radix-ui/react-label';
import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const StyledLabel = styled(Label.Root)`
  display: block;
  ${({ theme }) => theme.typography.lead};
`;

export const InputWrap = styled.div`
  position: relative;
`;

export const IconLeft = styled.div`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
`;

export const StyledInput = styled.input<{
  $hasError?: boolean;
  $padLeft?: boolean;
  $padRight?: boolean;
}>`
  width: 100%;
  height: 55px;
  padding: 0 54px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1.5px solid
    ${({ theme, $hasError }) => ($hasError ? theme.colors.red[500] : theme.colors.grey[100])};
  background: #fff;
  font-size: ${({ theme }) => theme.typography.body.fontSize};
  &::placeholder {
    color: ${({ theme }) => theme.colors.grey[400]};
  }
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${({ theme, $hasError }) => ($hasError ? 'transparent' : theme.colors.blue[500])};
  }
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

export const Trailing = styled.div`
  position: absolute;
  right: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

export const IconButton = styled.button`
  border: none;
  background: none;
  padding: 0.25rem;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  color: ${({ theme }) => theme.colors.grey[400]};
  cursor: pointer;
  display: flex;
  &:hover {
    color: ${({ theme }) => theme.colors.grey[600]};
  }
`;

export const ErrorText = styled.span`
  font-size: ${({ theme }) => theme.typography.bodySm.fontSize};
  color: ${({ theme }) => theme.colors.red[600]};
`;
