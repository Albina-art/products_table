import styled from 'styled-components';

import { Button } from '@/components/Button';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  text-align: left;
`;

export const RememberLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.grey[500]};
`;

export const Checkbox = styled.input`
  width: 1rem;
  height: 1rem;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  border-color: ${({ theme }) => theme.colors.grey[300]};
  accent-color: ${({ theme }) => theme.colors.blue[600]};
`;

export const ErrorAlert = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.bodySm.fontSize};
  color: ${({ theme }) => theme.colors.red[600]};
`;

export const SubmitButton = styled(Button)`
  width: 100%;
  min-height: 54px;
  font-size: ${({ theme }) => theme.typography.lead.fontSize};
  font-weight: 600;
`;

export const DividerWrap = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

export const DividerLine = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.grey[100]};
  flex: 1;
`;

export const Footer = styled.p`
  margin: 16px 0 0;
  text-align: center;
  font-size: ${({ theme }) => theme.typography.lead.fontSize};
  font-weight: 400;
  color: ${({ theme }) => theme.colors.grey[600]};
`;

export const FooterLink = styled.button`
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  padding: 0;
  margin: 0;
  font-size: ${({ theme }) => theme.typography.lead.fontSize};
  font-weight: 600;
  margin-left: 4px;
  color: ${({ theme }) => theme.colors.primary.DEFAULT};
  text-decoration: underline;
  &:hover {
    color: ${({ theme }) => theme.colors.primary.light};
    text-decoration: underline;
  }
`;

export const LeadIconWrap = styled.span<{ $tone?: 'default' | 'light' }>`
  display: flex;
  color: ${({ theme, $tone }) =>
    $tone === 'light' ? theme.colors.grey[100] : theme.colors.grey[300]};
`;
