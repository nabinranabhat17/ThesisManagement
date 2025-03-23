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
import { getSupervisors, getDepartments, Department } from "../../services/api";

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

const TextArea = styled.textarea`
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: #1f2937;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  background-color: white;
  min-height: 6rem;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const Select = styled.select`
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

// Helper function to create supervisor
const createSupervisor = async (supervisor: any) => {
  const response = await fetch("/api/supervisors", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
    },
    body: JSON.stringify(supervisor),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to create supervisor");
  }

  return await response.json();
};

// Helper function to update supervisor
const updateSupervisor = async (id: number, supervisor: any) => {
  const response = await fetch(`/api/supervisors/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
    },
    body: JSON.stringify(supervisor),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to update supervisor");
  }

  return await response.json();
};

export default function SupervisorsForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department_id: "",
    specialization: "",
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [departments, setDepartments] = useState<Department[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const departmentsData = await getDepartments();
        setDepartments(departmentsData);

        if (isEditMode) {
          const supervisorsData = await getSupervisors();
          const supervisor = supervisorsData.find(
            (s) => s.id === parseInt(id as string)
          );
          if (supervisor) {
            setFormData({
              name: supervisor.name,
              email: supervisor.email,
              department_id: supervisor.department_id?.toString() || "",
              specialization: supervisor.specialization || "",
            });
          }
        }
        setError(null);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, isEditMode]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email) {
      setError("Please fill in all required fields");
      return;
    }

    try {
      setLoading(true);

      const supervisorData = {
        ...formData,
        department_id: formData.department_id
          ? parseInt(formData.department_id)
          : null,
      };

      if (isEditMode) {
        await updateSupervisor(parseInt(id as string), supervisorData);
      } else {
        await createSupervisor(supervisorData);
      }

      navigate("/admin/supervisors");
    } catch (err: any) {
      console.error("Error saving supervisor:", err);
      setError(err.message || "Failed to save supervisor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageWrapper>
      <PageHeader>
        <Title>{isEditMode ? "Edit Supervisor" : "Add New Supervisor"}</Title>
      </PageHeader>

      <Card>
        <CardHeader>
          <CardTitle>Supervisor Information</CardTitle>
        </CardHeader>
        <CardBody>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="name">Name *</Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="email">Email *</Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="department_id">Department</Label>
              <Select
                id="department_id"
                name="department_id"
                value={formData.department_id}
                onChange={handleInputChange}
              >
                <option value="">Select a department</option>
                {departments.map((department) => (
                  <option key={department.id} value={department.id}>
                    {department.name}
                  </option>
                ))}
              </Select>
            </FormGroup>

            <FormGroup>
              <Label htmlFor="specialization">Specialization</Label>
              <TextArea
                id="specialization"
                name="specialization"
                value={formData.specialization}
                onChange={handleInputChange}
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
              onClick={() => navigate("/admin/supervisors")}
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
