import styled from "styled-components";

type BadgeVariant = "primary" | "success" | "warning" | "danger" | "info";

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
}

const BadgeContainer = styled.span<{ $variant: BadgeVariant }>`
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 600;
  line-height: 1;
  border-radius: 9999px;
  text-transform: capitalize;

  ${({ $variant }) => {
    switch ($variant) {
      case "primary":
        return `
          color: #3b82f6;
          background-color: #dbeafe;
        `;
      case "success":
        return `
          color: #10b981;
          background-color: #d1fae5;
        `;
      case "warning":
        return `
          color: #f59e0b;
          background-color: #fef3c7;
        `;
      case "danger":
        return `
          color: #ef4444;
          background-color: #fee2e2;
        `;
      case "info":
        return `
          color: #6366f1;
          background-color: #e0e7ff;
        `;
      default:
        return `
          color: #6b7280;
          background-color: #f3f4f6;
        `;
    }
  }}
`;

export default function Badge({ variant = "primary", children }: BadgeProps) {
  return <BadgeContainer $variant={variant}>{children}</BadgeContainer>;
}
