import React from "react";
import { Button, Container, Form, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

function NavBar(props) {
  return (
    <div style={{ position: "sticky", top: "0" }}>
      <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand>
            <Link style={{ textDecoration: "none" }} to="/">
              <h2 className="">
                <span className="text-blue-400">3K</span>
                <span className="text-slate-500">CarSer</span>
              </h2>
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              {" "}
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search..."
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="outline-dark">Search</Button>
              </Form>
            </Nav>
            <Nav>
              <Link style={{ textDecoration: "none" }} to="/about">
                <h5 className="text-slate-700 ">
                  About &nbsp;&nbsp; &nbsp;&nbsp;
                </h5>
              </Link>
              <Link style={{ textDecoration: "none" }} to="/sign-in">
                <h5 className="text-slate-700 ">
                  Sign In &nbsp;&nbsp; &nbsp;&nbsp;
                </h5>
              </Link>
              <Link style={{ textDecoration: "none" }} to="/sign-up">
                <h5 className="text-slate-700 ">Sign Up </h5>
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavBar;
