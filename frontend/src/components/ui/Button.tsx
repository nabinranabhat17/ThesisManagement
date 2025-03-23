import styled from "styled-components";

type ButtonVariant = "primary" | "secondary" | "danger" | "success" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  children: React.ReactNode;
}

const StyledButton = styled.button<{
  $variant: ButtonVariant;
  $size: ButtonSize;
  $fullWidth: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.375rem;
  font-weight: 500;
  transition: all 0.15s ease;

  ${({ $fullWidth }) => $fullWidth && "width: 100%;"}

  ${({ $size }) => {
    switch ($size) {
      case "sm":
        return `
          height: 2rem;
          padding: 0 0.75rem;
          font-size: 0.875rem;
        `;
      case "lg":
        return `
          height: 2.75rem;
          padding: 0 1.25rem;
          font-size: 1rem;
        `;
      default:
        return `
          height: 2.5rem;
          padding: 0 1rem;
          font-size: 0.875rem;
        `;
    }
  }}
  
  ${({ $variant }) => {
    switch ($variant) {
      case "primary":
        return `
          background-color: #3b82f6;
          color: white;
          border: none;
          &:hover:not(:disabled) {
            background-color: #2563eb;
          }
        `;
      case "secondary":
        return `
          background-color: white;
          color: #1f2937;
          border: 1px solid #e5e7eb;
          &:hover:not(:disabled) {
            background-color: #f3f4f6;
          }
        `;
      case "danger":
        return `
          background-color: #ef4444;
          color: white;
          border: none;
          &:hover:not(:disabled) {
            background-color: #dc2626;
          }
        `;
      case "success":
        return `
          background-color: #10b981;
          color: white;
          border: none;
          &:hover:not(:disabled) {
            background-color: #059669;
          }
        `;
      case "ghost":
        return `
          background-color: transparent;
          color: #6b7280;
          border: none;
          &:hover:not(:disabled) {
            background-color: #f3f4f6;
          }
        `;
      default:
        return "";
    }
  }}
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export default function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  children,
  ...props
}: ButtonProps) {
  return (
    <StyledButton
      $variant={variant}
      $size={size}
      $fullWidth={fullWidth}
      {...props}
    >
      {children}
    </StyledButton>
  );
}
