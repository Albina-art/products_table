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
    background-color: ${({ theme }) => theme.colors.grey[600]};
    border-color: ${({ theme }) => theme.colors.grey[600]};
  }

  &:checked::after {
    content: '';
    position: absolute;
    left: 50%;
    top: 45%;
    width: 5px;
    height: 10px;
    margin-left: -3px;
    margin-top: -6px;
    border: solid #fff;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
    box-sizing: border-box;
  }

  &:not(:checked) {
    background-color: transparent;
    border-color: ${({ theme }) => theme.colors.grey[400]};
  }

  &:hover:not(:disabled):not(:checked) {
    background-color: ${({ theme }) => theme.colors.grey[200]};
    border-color: ${({ theme }) => theme.colors.grey[400]};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.blue[500]};
    outline-offset: 2px;
  }
`;
