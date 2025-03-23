import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import ThesesPage from "./pages/ThesesPage";
import DepartmentsPage from "./pages/DepartmentsPage";
import SupervisorsPage from "./pages/SupervisorsPage";
import Layout from "./components/layout/Layout";
import AdminLayout from "./components/layout/AdminLayout";
import LoginPage from "./pages/admin/LoginPage";
import DashboardPage from "./pages/admin/DashboardPage";
import AdminThesesPage from "./pages/admin/ThesesPage";
import AdminThesesForm from "./pages/admin/ThesesForm";
import AdminStudentsPage from "./pages/admin/StudentsPage";
import AdminStudentsForm from "./pages/admin/StudentsForm";
import AdminSupervisorsPage from "./pages/admin/SupervisorsPage";
import AdminSupervisorsForm from "./pages/admin/SupervisorsForm";
import AdminDepartmentsPage from "./pages/admin/DepartmentsPage";
import AdminDepartmentsForm from "./pages/admin/DepartmentsForm";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    height: 100%;
    width: 100%;
  }

  body {
    font-family: 'Inter', sans-serif;
    font-size: 16px;
    line-height: 1.5;
    color: #374151;
    background-color: #f9fafb;
    min-height: 100%;
    width: 100%;
    overflow-x: hidden;
    position: relative;
  }

  #root {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: #f9fafb;
  }

  button {
    cursor: pointer;
  }
`;

function App() {
  return (
    <Router>
      <GlobalStyle />
      <Routes>
        {/* Public routes */}
        <Route
          path="/"
          element={
            <Layout>
              <ThesesPage />
            </Layout>
          }
        />
        <Route
          path="/departments"
          element={
            <Layout>
              <DepartmentsPage />
            </Layout>
          }
        />
        <Route
          path="/supervisors"
          element={
            <Layout>
              <SupervisorsPage />
            </Layout>
          }
        />

        {/* Admin login route (accessible without auth) */}
        <Route path="/admin/login" element={<LoginPage />} />

        {/* Protected admin routes */}
        <Route
          path="/admin"
          element={
            <AdminLayout>
              <DashboardPage />
            </AdminLayout>
          }
        />

        {/* Admin Theses Management */}
        <Route
          path="/admin/theses"
          element={
            <AdminLayout>
              <AdminThesesPage />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/theses/new"
          element={
            <AdminLayout>
              <AdminThesesForm />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/theses/:id"
          element={
            <AdminLayout>
              <AdminThesesForm />
            </AdminLayout>
          }
        />

        {/* Admin Students Management */}
        <Route
          path="/admin/students"
          element={
            <AdminLayout>
              <AdminStudentsPage />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/students/new"
          element={
            <AdminLayout>
              <AdminStudentsForm />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/students/:id"
          element={
            <AdminLayout>
              <AdminStudentsForm />
            </AdminLayout>
          }
        />

        {/* Admin Supervisors Management */}
        <Route
          path="/admin/supervisors"
          element={
            <AdminLayout>
              <AdminSupervisorsPage />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/supervisors/new"
          element={
            <AdminLayout>
              <AdminSupervisorsForm />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/supervisors/:id"
          element={
            <AdminLayout>
              <AdminSupervisorsForm />
            </AdminLayout>
          }
        />

        {/* Admin Departments Management */}
        <Route
          path="/admin/departments"
          element={
            <AdminLayout>
              <AdminDepartmentsPage />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/departments/new"
          element={
            <AdminLayout>
              <AdminDepartmentsForm />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/departments/:id"
          element={
            <AdminLayout>
              <AdminDepartmentsForm />
            </AdminLayout>
          }
        />

        {/* 404 fallback */}
        <Route
          path="*"
          element={
            <Layout>
              <div style={{ padding: "2rem", textAlign: "center" }}>
                <h1>Page Not Found</h1>
                <p>The page you are looking for does not exist.</p>
              </div>
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
