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
import {
  getStudents,
  getDepartments,
  Student,
  Department,
  createStudent,
  updateStudent,
} from "../../services/api";

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

// Helper function to add student API methods
const createStudentApi = async (
  student: Omit<Student, "id" | "department_name">
) => {
  // Make API call to create student
  const response = await fetch("/api/students", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
    },
    body: JSON.stringify(student),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to create student");
  }

  return await response.json();
};

const updateStudentApi = async (id: number, student: Partial<Student>) => {
  // Make API call to update student
  const response = await fetch(`/api/students/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
    },
    body: JSON.stringify(student),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to update student");
  }

  return await response.json();
};

export default function StudentsForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [formData, setFormData] = useState<Partial<Student>>({
    name: "",
    email: "",
    student_id: "",
    department_id: 0,
    enrollment_year: new Date().getFullYear(),
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
          const studentsData = await getStudents();
          const student = studentsData.find(
            (s) => s.id === parseInt(id as string)
          );
          if (student) {
            setFormData({
              name: student.name,
              email: student.email,
              student_id: student.student_id,
              department_id: student.department_id,
              enrollment_year: student.enrollment_year,
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
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "department_id" || name === "enrollment_year"
          ? parseInt(value)
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.student_id) {
      setError("Please fill in all required fields");
      return;
    }

    try {
      setLoading(true);

      if (isEditMode) {
        await updateStudentApi(parseInt(id as string), formData);
      } else {
        await createStudentApi(formData as any);
      }

      navigate("/admin/students");
    } catch (err: any) {
      console.error("Error saving student:", err);
      setError(err.message || "Failed to save student");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageWrapper>
      <PageHeader>
        <Title>{isEditMode ? "Edit Student" : "Add New Student"}</Title>
      </PageHeader>

      <Card>
        <CardHeader>
          <CardTitle>Student Information</CardTitle>
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
              <Label htmlFor="student_id">Student ID *</Label>
              <Input
                type="text"
                id="student_id"
                name="student_id"
                value={formData.student_id}
                onChange={handleInputChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="department_id">Department</Label>
              <Select
                id="department_id"
                name="department_id"
                value={formData.department_id || ""}
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
              <Label htmlFor="enrollment_year">Enrollment Year</Label>
              <Input
                type="number"
                id="enrollment_year"
                name="enrollment_year"
                value={formData.enrollment_year || ""}
                onChange={handleInputChange}
                min="1900"
                max={new Date().getFullYear()}
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
              onClick={() => navigate("/admin/students")}
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
