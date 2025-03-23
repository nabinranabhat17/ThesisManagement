import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { format, parseISO } from "date-fns";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  CardFooter,
} from "../../components/ui/Card";
import { Table, THead, TBody, TR, TH, TD } from "../../components/ui/Table";
import Button from "../../components/ui/Button";
import { getTheses, deleteThesis, Thesis } from "../../services/api";

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

export default function AdminThesesPage() {
  const [theses, setTheses] = useState<Thesis[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTheses = async () => {
    try {
      setLoading(true);
      const data = await getTheses();
      setTheses(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching theses:", err);
      setError("Failed to load theses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTheses();
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this thesis?")) {
      return;
    }

    try {
      setLoading(true);
      await deleteThesis(id);
      fetchTheses();
    } catch (err) {
      console.error("Error deleting thesis:", err);
      setError("Failed to delete thesis");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageWrapper>
      <PageHeader>
        <Title>Manage Theses</Title>
        <Link to="/admin/theses/new">
          <Button>Add New Thesis</Button>
        </Link>
      </PageHeader>

      <Card>
        <CardHeader>
          <CardTitle>All Theses</CardTitle>
        </CardHeader>
        <CardBody>
          {loading ? (
            <div>Loading theses...</div>
          ) : error ? (
            <div>{error}</div>
          ) : (
            <Table>
              <THead>
                <TR>
                  <TH>Title</TH>
                  <TH>Student</TH>
                  <TH>Supervisor</TH>
                  <TH>Submission Date</TH>
                  <TH>Grade</TH>
                  <TH>Actions</TH>
                </TR>
              </THead>
              <TBody>
                {theses.length === 0 ? (
                  <TR>
                    <TD colSpan={6} style={{ textAlign: "center" }}>
                      No theses found.
                    </TD>
                  </TR>
                ) : (
                  theses.map((thesis) => (
                    <TR key={thesis.id}>
                      <TD>{thesis.title}</TD>
                      <TD>{thesis.student_name || "N/A"}</TD>
                      <TD>{thesis.supervisor_name || "N/A"}</TD>
                      <TD>
                        {thesis.submission_date
                          ? format(
                              parseISO(thesis.submission_date),
                              "MMM d, yyyy"
                            )
                          : "N/A"}
                      </TD>
                      <TD>{thesis.grade || "N/A"}</TD>
                      <TD>
                        <ActionButtons>
                          <Link to={`/admin/theses/${thesis.id}`}>
                            <Button variant="secondary" size="sm">
                              Edit
                            </Button>
                          </Link>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleDelete(thesis.id)}
                          >
                            Delete
                          </Button>
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
