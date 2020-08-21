import React, {useState, useContext} from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText,
    Button
  } from 'reactstrap';

import { Context } from './Context/AuthContext';

  const Menu = (props) => {
    const [isOpen, setIsOpen] = useState(false);
  
    const toggle = () => setIsOpen(!isOpen);
    const { handleLogout } = useContext(Context);
  
    return (
      <div>
        <Navbar color="dark" dark expand="md">
          <NavbarBrand>Agro Data</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink href="/home/">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/relatorio/">Relatorio</NavLink>
              </NavItem>
              
            </Nav>
            <Button onClick={handleLogout}>Logout</Button>
          </Collapse>
        </Navbar>
      </div>
    );
  }
  

export default Menu;