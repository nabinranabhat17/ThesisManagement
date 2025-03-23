import styled from "styled-components";
import { Link } from "react-router-dom";
import Container from "./Container";

const HeaderContainer = styled.header`
  background-color: white;
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
  color: #3b82f6;
  text-decoration: none;
`;

const Nav = styled.nav`
  display: flex;
  gap: 2rem;
`;

const NavLink = styled(Link)`
  color: #4b5563;
  text-decoration: none;
  font-weight: 500;

  &:hover {
    color: #3b82f6;
  }
`;

export default function Header() {
  return (
    <HeaderContainer>
      <Container>
        <HeaderContent>
          <Logo to="/">Thesis Management</Logo>
          <Nav>
            <NavLink to="/">Theses</NavLink>
          </Nav>
        </HeaderContent>
      </Container>
    </HeaderContainer>
  );
}
