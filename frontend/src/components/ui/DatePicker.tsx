import styled from "styled-components";

interface DatePickerProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const DatePickerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const DatePickerLabel = styled.label`
  font-weight: 500;
  font-size: 0.875rem;
  color: #4b5563;
  margin-bottom: 0.25rem;
`;

const StyledDatePicker = styled.input`
  padding: 0.5rem;
  border-radius: 0.375rem;
  border: 1px solid #d1d5db;
  background-color: white;
  color: #1f2937;
  font-size: 0.875rem;
  min-width: 160px;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
  }

  /* Customize the calendar icon */
  &::-webkit-calendar-picker-indicator {
    cursor: pointer;
    opacity: 0.6;
    &:hover {
      opacity: 1;
    }
  }
`;

export default function DatePicker({ label, id, ...props }: DatePickerProps) {
  return (
    <DatePickerContainer>
      {label && <DatePickerLabel htmlFor={id}>{label}</DatePickerLabel>}
      <StyledDatePicker type="date" id={id} {...props} />
    </DatePickerContainer>
  );
}
