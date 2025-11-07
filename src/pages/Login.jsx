import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import "../styles/Login.css"; // custom style file
import "../styles/global.css"; // global style file

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Invalid credentials");
      } else {
        // Store JWT token
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        // Redirect to admin dashboard for now
        window.location.href = "/admin/dashboard";
      }
    } catch (err) {
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper d-flex align-items-center justify-content-center">
      <Container>
        <Row className="justify-content-center">
          <Col md={6} lg={5}>
            <Card className="shadow-sm border-0 rounded-4 p-4">
              <div className="text-center">
                <h3 className="app-title p-1">
                  <span className="brand-name">Dialysis</span>
                  <span className="brand-accent">Center Pro</span>
                </h3>
              </div>
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter your email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label className="fw-semibold">Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter your password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  {error && <p className="text-danger small err-font text-center">{error}</p>}

                  <div className="d-grid">
                    <Button
                      variant="primary"
                      type="submit"
                      className="rounded-pill"
                      disabled={loading}
                    >
                      {loading ? "Logging in..." : "Log In"}
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>

            <p className="text-center mt-4 small text-muted">
              © {new Date().getFullYear()} DialysisCenter Pro
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Login;
