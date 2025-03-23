import styled from "styled-components";
import Header from "./Header";
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

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <LayoutWrapper>
      <Header />
      <Main>
        <Container>
          <MainContent>{children}</MainContent>
        </Container>
      </Main>
    </LayoutWrapper>
  );
}
