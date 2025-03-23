import styled from "styled-components";
import { Link } from "react-router-dom";
import Container from "../ui/Container";
import Button from "../ui/Button";

const HeaderContainer = styled.header`
  background-color: #1e40af;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 4rem;
`;

const Logo = styled(Link)`
  font-size: 1.25rem;
  font-weight: 700;
  color: white;
  text-decoration: none;
`;

const Nav = styled.nav`
  display: flex;
  gap: 2rem;
`;

const NavLink = styled(Link)`
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  font-weight: 500;

  &:hover {
    color: white;
  }
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

interface AdminHeaderProps {
  onLogout: () => void;
}

export default function AdminHeader({ onLogout }: AdminHeaderProps) {
  return (
    <HeaderContainer>
      <Container>
        <HeaderContent>
          <Logo to="/admin">Admin Dashboard</Logo>
          <Nav>
            <NavLink to="/admin/theses">Theses</NavLink>
            <NavLink to="/admin/students">Students</NavLink>
            <NavLink to="/admin/supervisors">Supervisors</NavLink>
            <NavLink to="/admin/departments">Departments</NavLink>
            <NavLink to="/" target="_blank">
              View Public Site
            </NavLink>
          </Nav>
          <Actions>
            <Button variant="danger" size="sm" onClick={onLogout}>
              Logout
            </Button>
          </Actions>
        </HeaderContent>
      </Container>
    </HeaderContainer>
  );
}
