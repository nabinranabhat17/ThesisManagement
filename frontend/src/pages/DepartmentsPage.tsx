import { useState, useEffect } from "react";
import styled from "styled-components";
import Container from "../components/ui/Container";
import { Card, CardHeader, CardTitle, CardBody } from "../components/ui/Card";
import { Table, THead, TBody, TR, TH, TD } from "../components/ui/Table";
import { getDepartments, Department } from "../services/api";

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
  width: 100%;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  color: #111827;
  margin: 0;
`;

export default function DepartmentsPage() {
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
        <Title>Academic Departments</Title>
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
                  <TH>Number of Supervisors</TH>
                  <TH>Number of Students</TH>
                </TR>
              </THead>
              <TBody>
                {departments.length === 0 ? (
                  <TR>
                    <TD colSpan={3} style={{ textAlign: "center" }}>
                      No departments found.
                    </TD>
                  </TR>
                ) : (
                  departments.map((department) => (
                    <TR key={department.id}>
                      <TD>{department.name}</TD>
                      <TD>-</TD>
                      <TD>-</TD>
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
