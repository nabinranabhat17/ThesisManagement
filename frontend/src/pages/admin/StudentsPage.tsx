import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
} from "../../components/ui/Card";
import { Table, THead, TBody, TR, TH, TD } from "../../components/ui/Table";
import Button from "../../components/ui/Button";
import { getStudents, Student } from "../../services/api";

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

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export default function AdminStudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        const data = await getStudents();
        setStudents(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching students:", err);
        setError("Failed to load students");
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  return (
    <PageWrapper>
      <PageHeader>
        <Title>Manage Students</Title>
        <Link to="/admin/students/new">
          <Button>Add New Student</Button>
        </Link>
      </PageHeader>

      <Card>
        <CardHeader>
          <CardTitle>All Students</CardTitle>
        </CardHeader>
        <CardBody>
          {loading ? (
            <div>Loading students...</div>
          ) : error ? (
            <div>{error}</div>
          ) : (
            <Table>
              <THead>
                <TR>
                  <TH>Name</TH>
                  <TH>Email</TH>
                  <TH>Student ID</TH>
                  <TH>Department</TH>
                  <TH>Enrollment Year</TH>
                  <TH>Actions</TH>
                </TR>
              </THead>
              <TBody>
                {students.length === 0 ? (
                  <TR>
                    <TD colSpan={6} style={{ textAlign: "center" }}>
                      No students found.
                    </TD>
                  </TR>
                ) : (
                  students.map((student) => (
                    <TR key={student.id}>
                      <TD>{student.name}</TD>
                      <TD>{student.email}</TD>
                      <TD>{student.student_id}</TD>
                      <TD>{student.department_name || "N/A"}</TD>
                      <TD>{student.enrollment_year}</TD>
                      <TD>
                        <ActionButtons>
                          <Link to={`/admin/students/${student.id}`}>
                            <Button variant="secondary" size="sm">
                              Edit
                            </Button>
                          </Link>
                        </ActionButtons>
                      </TD>
                    </TR>
                  ))
                )}
              </TBody>
            </Table>
          )}
        </CardBody>
      </Card>
    </PageWrapper>
  );
}
