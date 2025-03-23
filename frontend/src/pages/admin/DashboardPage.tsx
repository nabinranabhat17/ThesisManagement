import { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
} from "../../components/ui/Card";
import Container from "../../components/ui/Container";
import Button from "../../components/ui/Button";
import {
  getTheses,
  getDepartments,
  getSupervisors,
  getStudents,
} from "../../services/api";

const PageWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const PageTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 1.5rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatCard = styled(Card)`
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }
`;

const StatValue = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: #2563eb;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
`;

const ActionLink = styled(Link)`
  text-decoration: none;
`;

const ActionContainer = styled.div`
  margin-top: 1.5rem;
`;

const ActionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
`;

interface StatCount {
  theses: number;
  departments: number;
  supervisors: number;
  students: number;
}

export default function DashboardPage() {
  const [counts, setCounts] = useState<StatCount>({
    theses: 0,
    departments: 0,
    supervisors: 0,
    students: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [theses, departments, supervisors, students] = await Promise.all([
          getTheses(),
          getDepartments(),
          getSupervisors(),
          getStudents(),
        ]);

        setCounts({
          theses: theses.length,
          departments: departments.length,
          supervisors: supervisors.length,
          students: students.length,
        });

        setError(null);
      } catch (err) {
        console.error("Error fetching stats:", err);
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <PageWrapper>
        <PageTitle>Admin Dashboard</PageTitle>
        <div>Loading dashboard data...</div>
      </PageWrapper>
    );
  }

  if (error) {
    return (
      <PageWrapper>
        <PageTitle>Admin Dashboard</PageTitle>
        <div>{error}</div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <PageTitle>Admin Dashboard</PageTitle>

      <Grid>
        <StatCard>
          <CardBody>
            <StatValue>{counts.theses}</StatValue>
            <StatLabel>Total Theses</StatLabel>
          </CardBody>
        </StatCard>

        <StatCard>
          <CardBody>
            <StatValue>{counts.students}</StatValue>
            <StatLabel>Students</StatLabel>
          </CardBody>
        </StatCard>

        <StatCard>
          <CardBody>
            <StatValue>{counts.supervisors}</StatValue>
            <StatLabel>Supervisors</StatLabel>
          </CardBody>
        </StatCard>

        <StatCard>
          <CardBody>
            <StatValue>{counts.departments}</StatValue>
            <StatLabel>Departments</StatLabel>
          </CardBody>
        </StatCard>
      </Grid>

      <ActionContainer>
        <h2>Quick Actions</h2>
        <ActionGrid>
          <ActionLink to="/admin/theses/new">
            <Button fullWidth>Add New Thesis</Button>
          </ActionLink>
          <ActionLink to="/admin/students/new">
            <Button fullWidth variant="secondary">
              Add Student
            </Button>
          </ActionLink>
          <ActionLink to="/admin/supervisors/new">
            <Button fullWidth variant="secondary">
              Add Supervisor
            </Button>
          </ActionLink>
          <ActionLink to="/admin/departments/new">
            <Button fullWidth variant="secondary">
              Add Department
            </Button>
          </ActionLink>
        </ActionGrid>
      </ActionContainer>
    </PageWrapper>
  );
}
