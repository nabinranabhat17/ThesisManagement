import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  CardFooter,
} from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import { loginAdmin } from "../../services/api";

const LoginContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100%;
  background-color: #f9fafb;
  padding: 1rem;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const LoginCard = styled(Card)`
  width: 100%;
  max-width: 400px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 500;
  font-size: 0.875rem;
  color: #4b5563;
`;

const Input = styled.input`
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: #1f2937;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  background-color: white;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const Error = styled.div`
  color: #ef4444;
  font-size: 0.875rem;
  margin-top: 0.5rem;
`;

export default function LoginPage() {
  const [username, setUsername] = useState("admin"); // Default to admin for easier testing
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      setError("Please enter both username and password");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      console.log("Attempting login with:", { username, password });
      const response = await loginAdmin({ username, password });
      console.log("Login successful:", response);

      // Save token to localStorage
      localStorage.setItem("adminToken", response.token);

      // Redirect to admin dashboard
      navigate("/admin");
    } catch (err: any) {
      console.error("Login error:", err);

      const errorMessage =
        err.response?.data?.error ||
        "Login failed. Please check your credentials.";

      setError(errorMessage);

      console.log("Error response:", err.response?.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginContainer>
      <LoginCard>
        <CardHeader>
          <CardTitle>Admin Login</CardTitle>
        </CardHeader>
        <CardBody>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                disabled={loading}
                required
                autoFocus
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                disabled={loading}
                required
              />
            </FormGroup>
            {error && (
              <Error>
                {error}
                <div style={{ fontSize: "0.75rem", marginTop: "0.25rem" }}>
                  Default credentials: admin / admin123
                </div>
              </Error>
            )}
            <Button type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
          </Form>
        </CardBody>
        <CardFooter>
          <Button
            variant="ghost"
            size="sm"
            fullWidth
            onClick={() => navigate("/")}
          >
            Return to Public Site
          </Button>
        </CardFooter>
      </LoginCard>
    </LoginContainer>
  );
}
