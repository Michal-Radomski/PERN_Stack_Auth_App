import React from "react";
import { Button, Nav, Navbar, OverlayTrigger, Tooltip } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

import { logoutAction } from "../redux/actions";
import { useAppDispatch } from "../redux/hooks";

const HeaderContainer = styled.div`
  position: relative;
  margin-left: 1rem;
  margin-right: 1rem;
  width: calc(100% - 2rem);
  height: 58px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  align-content: center;
`;

const Header = (): JSX.Element => {
  const dispatch: AppDispatch = useAppDispatch();

  const logout = () => {
    dispatch(logoutAction());
  };

  return (
    <React.Fragment>
      <Navbar bg="secondary" variant="dark" fixed="top">
        <HeaderContainer>
          <OverlayTrigger placement={"bottom"} overlay={<Tooltip id={"headerTooltip"}>Main Page</Tooltip>}>
            <Navbar.Brand to="/" as={NavLink}>
              <h1>PERN Stack Auth App</h1>
            </Navbar.Brand>
          </OverlayTrigger>
          <Nav>
            <Nav.Link to="/login" as={NavLink}>
              Login
            </Nav.Link>
            <Nav.Link to="/register" as={NavLink}>
              Register
            </Nav.Link>
            <Nav.Link to="/dashboard" as={NavLink}>
              Dashboard
            </Nav.Link>
            <Button onClick={logout} variant="outline-light">
              Logout
            </Button>
          </Nav>
        </HeaderContainer>
      </Navbar>
    </React.Fragment>
  );
};

export default Header;
