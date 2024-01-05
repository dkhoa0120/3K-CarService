import React, { useRef } from "react";
import {
  Button,
  Container,
  Dropdown,
  Form,
  Nav,
  Navbar,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  signOutUserStart,
  deleteUserSuccess,
  deleteUserFailure,
} from "../redux/user/userSlice";
import { useDispatch } from "react-redux";

function NavBar() {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const dropDownRef = useRef();

  const handleClick = () => {
    dropDownRef.current.click();
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch("/api/auth/signout", {
        method: "POST",
      });

      if (res.status === 404) {
        console.error("Logout endpoint not found");
        return;
      }

      const data = await res.json();
      console.log("Response data:", data);

      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      console.error("Error parsing JSON:", error);
      console.log("Non-JSON response:", await res.text());
      dispatch(deleteUserFailure(error.message));
    }
  };

  return (
    <div style={{ position: "sticky", top: "0", zIndex: "999" }}>
      <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand>
            <Link style={{ textDecoration: "none" }} to="/">
              <h2 className="">
                <span className="text-blue-400">3K</span>
                <span className="text-slate-500">CarService</span>
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
            <hr />
            <Nav>
              <Dropdown>
                <Dropdown.Toggle
                  id="dropdown-button-dark-example1"
                  variant="secondary"
                  ref={dropDownRef}
                  style={{ display: "none" }}
                >
                  Dropdown Button
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => navigate("/profile")}>
                    Profile
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => navigate("/list")}>
                    Manage List
                  </Dropdown.Item>
                  <Dropdown.Item onClick={handleSignOut}>
                    Sign Out
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              {currentUser ? (
                <div onClick={handleClick} style={{ cursor: "pointer" }}>
                  <img
                    alt="avatar"
                    className="rounded-full h-10 w-10 object-cover"
                    src={currentUser.avatar}
                  />
                </div>
              ) : (
                <>
                  <Link style={{ textDecoration: "none" }} to="/sign-in">
                    <h5 className="text-slate-700 ">
                      Sign In &nbsp;&nbsp; &nbsp;&nbsp;
                    </h5>
                  </Link>
                  <Link style={{ textDecoration: "none" }} to="/sign-up">
                    <h5 className="text-slate-700 ">Sign Up </h5>
                  </Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavBar;
