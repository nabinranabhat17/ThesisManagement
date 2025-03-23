import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";
import AdminHeader from "./AdminHeader";
import Container from "../ui/Container";

const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  background-color: #f9fafb;
`;

const Main = styled.main`
  padding: 2rem 0;
  flex: 1;
  width: 100%;
  background-color: #f9fafb;
`;

const MainContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if admin is logged in
    const token = localStorage.getItem("adminToken");
    if (!token) {
      setLoading(false);
      return;
    }

    // Validate token (you could make an API call to verify)
    setIsAuthenticated(true);
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setIsAuthenticated(false);
    navigate("/admin/login");
  };

  return (
    <LayoutWrapper>
      <AdminHeader onLogout={handleLogout} />
      <Main>
        <Container>
          <MainContent>{children}</MainContent>
        </Container>
      </Main>
    </LayoutWrapper>
  );
}
