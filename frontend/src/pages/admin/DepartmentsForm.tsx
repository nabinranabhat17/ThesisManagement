import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  CardFooter,
} from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import { getDepartments } from "../../services/api";

const PageWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const PageHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  color: #111827;
  margin: 0;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 500;
  font-size: 0.875rem;
  color: #4b5563;
`;

const Input = styled.input`
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: #1f2937;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  background-color: white;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const Error = styled.div`
  color: #ef4444;
  font-size: 0.875rem;
  margin-top: 0.5rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
`;

// Helper function for creating department
const createDepartment = async (name: string) => {
  const response = await fetch("/api/departments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
    },
    body: JSON.stringify({ name }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to create department");
  }

  return await response.json();
};

// Helper function for updating department
const updateDepartment = async (id: number, name: string) => {
  const response = await fetch(`/api/departments/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
    },
    body: JSON.stringify({ name }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to update department");
  }

  return await response.json();
};

export default function DepartmentsForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [name, setName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDepartmentData = async () => {
      if (!isEditMode) return;

      try {
        setLoading(true);
        const departments = await getDepartments();
        const department = departments.find(
          (d) => d.id === parseInt(id as string)
        );
        if (department) {
          setName(department.name);
        }
        setError(null);
      } catch (err) {
        console.error("Error fetching department:", err);
        setError("Failed to load department data");
      } finally {
        setLoading(false);
      }
    };

    fetchDepartmentData();
  }, [id, isEditMode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setError("Department name is required");
      return;
    }

    try {
      setLoading(true);
      if (isEditMode) {
        await updateDepartment(parseInt(id as string), name);
      } else {
        await createDepartment(name);
      }
      navigate("/admin/departments");
    } catch (err: any) {
      console.error("Error saving department:", err);
      setError(err.message || "Failed to save department");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageWrapper>
      <PageHeader>
        <Title>{isEditMode ? "Edit Department" : "Add New Department"}</Title>
      </PageHeader>

      <Card>
        <CardHeader>
          <CardTitle>Department Information</CardTitle>
        </CardHeader>
        <CardBody>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="name">Department Name *</Label>
              <Input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoFocus
              />
            </FormGroup>

            {error && <Error>{error}</Error>}
          </Form>
        </CardBody>
        <CardFooter>
          <ButtonGroup>
            <Button
              variant="secondary"
              type="button"
              onClick={() => navigate("/admin/departments")}
            >
              Cancel
            </Button>
            <Button type="submit" onClick={handleSubmit} disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
    </PageWrapper>
  );
}
