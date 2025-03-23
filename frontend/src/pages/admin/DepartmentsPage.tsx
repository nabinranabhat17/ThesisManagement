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
import { getDepartments, Department } from "../../services/api";

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

export default function AdminDepartmentsPage() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        setLoading(true);
        const data = await getDepartments();
        setDepartments(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching departments:", err);
        setError("Failed to load departments");
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  return (
    <PageWrapper>
      <PageHeader>
        <Title>Manage Departments</Title>
        <Link to="/admin/departments/new">
          <Button>Add New Department</Button>
        </Link>
      </PageHeader>

      <Card>
        <CardHeader>
          <CardTitle>All Departments</CardTitle>
        </CardHeader>
        <CardBody>
          {loading ? (
            <div>Loading departments...</div>
          ) : error ? (
            <div>{error}</div>
          ) : (
            <Table>
              <THead>
                <TR>
                  <TH>Department Name</TH>
                  <TH>Actions</TH>
                </TR>
              </THead>
              <TBody>
                {departments.length === 0 ? (
                  <TR>
                    <TD colSpan={2} style={{ textAlign: "center" }}>
                      No departments found.
                    </TD>
                  </TR>
                ) : (
                  departments.map((department) => (
                    <TR key={department.id}>
                      <TD>{department.name}</TD>
                      <TD>
                        <ActionButtons>
                          <Link to={`/admin/departments/${department.id}`}>
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
