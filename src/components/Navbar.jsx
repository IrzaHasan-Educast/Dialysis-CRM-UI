import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Nav, Navbar, Form, FormControl, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStethoscope } from "@fortawesome/free-solid-svg-icons";
import "../styles/Navbar.css";


const HeaderNavbar = () => {
  return (
    <Navbar expand="lg" fixed="top" bg="white" className=" myNav border-bottom shadow-sm py-2">
      <Container>
        {/* Left Section — Logo */}
        <Navbar.Brand href="/" className="fw-bold logo-text d-flex align-items-center">
          <FontAwesomeIcon icon={faStethoscope} className="me-2 text-info" />
          Dialysis<span style={{ color: "#74b9b1" }}>Center</span> Pro
        </Navbar.Brand>

        {/* Navbar Toggle (for small screens) */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {/* Center Section — Navigation Links */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto gap-3">
            <Nav.Link href="/admin/dashboard" className="nav-link-custom active">
              Dashboard
            </Nav.Link>
            <Nav.Link href="/admin/patient" className="nav-link-custom">
              Patients
            </Nav.Link>
            <Nav.Link href="scheduling" className="nav-link-custom">
              Scheduling
            </Nav.Link>
            <Nav.Link href="/analytics" className="nav-link-custom">
              Analytics
            </Nav.Link>
          </Nav>

          {/* Right Section — Search and Profile */}
          <div className="d-flex align-items-center gap-3">
            {/* Search bar */}
            <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2 rounded-pill px-3"
                aria-label="Search"
              />
            </Form>

            {/* Profile Section */}
            <div className="d-flex align-items-center">
              <div
                className="profile-icon d-flex align-items-center justify-content-center rounded-circle text-white fw-bold me-2"
                style={{
                  width: "40px",
                  height: "40px",
                  backgroundColor: "#74b9b1",
                }}
              >
                IH
              </div>
              <div className="profile-details lh-sm">
                <div className="fw-semibold">Irza Hasan</div>
                <div className="text-secondary small">Software Engineer</div>
              </div>
            </div>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default HeaderNavbar;
