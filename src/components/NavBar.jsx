import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";
import Logo from "../assets/img/softcom-logo.png";

const HomeNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMobile = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand
          tag={() => (
            <img
              src={Logo}
              style={{ cursor: "pointer", height: 62, width: 106 }}
              alt="Brand logo"
              data-testid="logo-svg"
            />
          )}
        />
        <NavbarToggler onClick={toggleMobile} className="float-right" />
        <Collapse isOpen={isOpen} navbar className="float-right">
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/home">Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/">Profile</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default HomeNavbar;
