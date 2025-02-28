import React, { useState } from 'react';
import {
  Collapse,Navbar,NavbarToggler,NavbarBrand,Nav,NavItem,NavLink
} from 'reactstrap';
import { Outlet } from "react-router-dom";

const Layout: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">Mi App</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink href="/listaproducto">Stock</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/nuevoproducto">Agregar Producto</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
      <Outlet />
    </>
  );
};

export default Layout;
