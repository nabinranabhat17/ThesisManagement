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
import DatePicker from "../../components/ui/DatePicker";
import {
  getTheses,
  getSupervisors,
  getStudents,
  createThesis,
  updateThesis,
  Thesis,
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

export default function ThesesForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [formData, setFormData] = useState<Partial<Thesis>>({
    title: "",
    description: "",
    student_id: 0,
    supervisor_id: 0,
    submission_date: "",
    grade: "",
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [students, setStudents] = useState<any[]>([]);
  const [supervisors, setSupervisors] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [studentsData, supervisorsData] = await Promise.all([
          getStudents(),
          getSupervisors(),
        ]);

        setStudents(studentsData);
        setSupervisors(supervisorsData);

        if (isEditMode) {
          const theses = await getTheses();
          const thesis = theses.find((t) => t.id === parseInt(id as string));
          if (thesis) {
            setFormData({
              title: thesis.title,
              description: thesis.description,
              student_id: thesis.student_id,
              supervisor_id: thesis.supervisor_id,
              submission_date: thesis.submission_date,
              grade: thesis.grade,
            });
          }
        }
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

    if (
      !formData.title ||
      !formData.student_id ||
      !formData.supervisor_id ||
      !formData.submission_date
    ) {
      setError("Please fill in all required fields");
      return;
    }

    try {
      setLoading(true);

      if (isEditMode) {
        await updateThesis(parseInt(id as string), formData);
      } else {
        await createThesis(formData as any);
      }

      navigate("/admin/theses");
    } catch (err) {
      console.error("Error saving thesis:", err);
      setError("Failed to save thesis");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageWrapper>
      <PageHeader>
        <Title>{isEditMode ? "Edit Thesis" : "Add New Thesis"}</Title>
      </PageHeader>

      <Card>
        <CardHeader>
          <CardTitle>Thesis Information</CardTitle>
        </CardHeader>
        <CardBody>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="title">Title *</Label>
              <Input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="description">Description</Label>
              <TextArea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="student_id">Student *</Label>
              <Select
                id="student_id"
                name="student_id"
                value={formData.student_id}
                onChange={handleInputChange}
                required
              >
                <option value="">Select a student</option>
                {students.map((student) => (
                  <option key={student.id} value={student.id}>
                    {student.name}
                  </option>
                ))}
              </Select>
            </FormGroup>

            <FormGroup>
              <Label htmlFor="supervisor_id">Supervisor *</Label>
              <Select
                id="supervisor_id"
                name="supervisor_id"
                value={formData.supervisor_id}
                onChange={handleInputChange}
                required
              >
                <option value="">Select a supervisor</option>
                {supervisors.map((supervisor) => (
                  <option key={supervisor.id} value={supervisor.id}>
                    {supervisor.name}
                  </option>
                ))}
              </Select>
            </FormGroup>

            <FormGroup>
              <Label htmlFor="submission_date">Submission Date *</Label>
              <Input
                type="date"
                id="submission_date"
                name="submission_date"
                value={formData.submission_date}
                onChange={handleInputChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="grade">Grade</Label>
              <Input
                type="text"
                id="grade"
                name="grade"
                value={formData.grade}
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
              onClick={() => navigate("/admin/theses")}
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
