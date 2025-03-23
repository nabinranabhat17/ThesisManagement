import styled from "styled-components";
import Header from "./Header";

const Main = styled.main`
  padding: 2rem 0;
  min-height: calc(100vh - 4rem);
`;

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <Main>{children}</Main>
    </>
  );
}
