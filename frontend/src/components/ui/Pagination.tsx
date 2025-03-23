import styled from "styled-components";
import Button from "./Button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1.5rem;
`;

const PageInfo = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0 1rem;
`;

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  return (
    <PaginationContainer>
      <Button
        variant="secondary"
        size="sm"
        onClick={() => onPageChange(1)}
        disabled={currentPage <= 1}
      >
        First
      </Button>
      <Button
        variant="secondary"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
      >
        Previous
      </Button>

      <PageInfo>
        Page {currentPage} of {totalPages}
      </PageInfo>

      <Button
        variant="secondary"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
      >
        Next
      </Button>
      <Button
        variant="secondary"
        size="sm"
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage >= totalPages}
      >
        Last
      </Button>
    </PaginationContainer>
  );
}
