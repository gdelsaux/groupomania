import React from "react";
import styled from "styled-components";

import logo from "../assets/logo.svg";
import UserDetail from "./main/UserDetail";

const Navbar = ({ setNav, nav }) => {
  //get sessionStorage
  const user = JSON.parse(sessionStorage.getItem("user"));
  //change state of nav to display user details
  if (user) {
    setNav(true);
  }

  return (
    <Nav  style={{ 'justify-content': nav ? 'space-between' : 'space-around' }}>
      <div>
        <Img src={logo} alt="groupomania" />
      </div>
      {nav ? <UserDetail setNav={setNav} /> : ""}
    </Nav>
  );
};

export default Navbar;

const Nav = styled.nav`
  background: #eeeeee;
  max-height: 18vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: solid 1px #e5e5e5;
  padding: 2rem 10rem;
  top: 0px;

  @media (max-width: 1200px) {
    padding: 1rem 2rem;
  }
`;

const Img = styled.img`
  width: 8rem;
  @media (max-width: 450px) {
    width: 7rem;
  }
`;
