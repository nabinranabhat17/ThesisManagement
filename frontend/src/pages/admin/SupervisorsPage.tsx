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
import { getSupervisors, Supervisor } from "../../services/api";

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

export default function AdminSupervisorsPage() {
  const [supervisors, setSupervisors] = useState<Supervisor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSupervisors = async () => {
      try {
        setLoading(true);
        const data = await getSupervisors();
        setSupervisors(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching supervisors:", err);
        setError("Failed to load supervisors");
      } finally {
        setLoading(false);
      }
    };

    fetchSupervisors();
  }, []);

  return (
    <PageWrapper>
      <PageHeader>
        <Title>Manage Supervisors</Title>
        <Link to="/admin/supervisors/new">
          <Button>Add New Supervisor</Button>
        </Link>
      </PageHeader>

      <Card>
        <CardHeader>
          <CardTitle>All Supervisors</CardTitle>
        </CardHeader>
        <CardBody>
          {loading ? (
            <div>Loading supervisors...</div>
          ) : error ? (
            <div>{error}</div>
          ) : (
            <Table>
              <THead>
                <TR>
                  <TH>Name</TH>
                  <TH>Email</TH>
                  <TH>Department</TH>
                  <TH>Specialization</TH>
                  <TH>Actions</TH>
                </TR>
              </THead>
              <TBody>
                {supervisors.length === 0 ? (
                  <TR>
                    <TD colSpan={5} style={{ textAlign: "center" }}>
                      No supervisors found.
                    </TD>
                  </TR>
                ) : (
                  supervisors.map((supervisor) => (
                    <TR key={supervisor.id}>
                      <TD>{supervisor.name}</TD>
                      <TD>{supervisor.email}</TD>
                      <TD>{supervisor.department_name || "N/A"}</TD>
                      <TD>{supervisor.specialization || "N/A"}</TD>
                      <TD>
                        <ActionButtons>
                          <Link to={`/admin/supervisors/${supervisor.id}`}>
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
