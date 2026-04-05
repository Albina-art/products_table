import styled from 'styled-components';

export const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  appearance: none;
  -webkit-appearance: none;
  margin: 0;
  flex-shrink: 0;
  position: relative;
  box-sizing: border-box;
  width: 22px;
  height: 22px;
  border-radius: ${({ theme }) => theme.borderRadius.xxs};
  border: 1px solid ${({ theme }) => theme.colors.grey[400]};
  background-color: transparent;
  cursor: pointer;

  &:checked {
    background-color: ${({ theme }) => theme.colors.blue[550]};
  }

  &:hover:not(:disabled):not(:checked) {
    background-color: ${({ theme }) => theme.colors.grey[200]};
    border-color: ${({ theme }) => theme.colors.blue[550]};

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.blue[500]};
    outline-offset: 2px;
  }
`;
