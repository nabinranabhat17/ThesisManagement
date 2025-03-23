import styled from "styled-components";

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
`;

export const THead = styled.thead`
  background-color: #f9fafb;
`;

export const TH = styled.th`
  padding: 0.75rem 1.5rem;
  text-align: left;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #6b7280;
  border-bottom: 1px solid #e5e7eb;
`;

export const TR = styled.tr`
  &:not(:last-child) {
    border-bottom: 1px solid #e5e7eb;
  }

  &:hover {
    background-color: #f9fafb;
  }
`;

export const TD = styled.td`
  padding: 1rem 1.5rem;
  font-size: 0.875rem;
  color: #374151;
`;

export const TBody = styled.tbody``;
