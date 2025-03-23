import styled from "styled-components";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
}

const SelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const SelectLabel = styled.label`
  font-weight: 500;
  font-size: 0.875rem;
  color: #4b5563;
  margin-bottom: 0.25rem;
`;

const StyledSelect = styled.select`
  padding: 0.5rem;
  border-radius: 0.375rem;
  border: 1px solid #d1d5db;
  background-color: white;
  min-width: 200px;
  color: #1f2937;
  font-size: 0.875rem;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
  }
`;

export default function Select({ label, id, ...props }: SelectProps) {
  return (
    <SelectContainer>
      {label && <SelectLabel htmlFor={id}>{label}</SelectLabel>}
      <StyledSelect id={id} {...props} />
    </SelectContainer>
  );
}
