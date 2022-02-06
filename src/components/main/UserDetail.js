import React from "react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import exit from "../../assets/exit.svg";
import admin from "../../assets/admin.svg";

const UserDetail = ({ setNav }) => {
  //Get sessionStorage
  const user = JSON.parse(sessionStorage.getItem("user"));

  let history = useHistory();

  //Logout button , clear sessionStorage / reset nav state / redirect to login page
  const handleClick = () => {
    sessionStorage.clear();
    setNav(false);
    history.push("./");
  };

  return (
    <Container>
      <div className="userName">
        {user.first_name} {user.last_name}
      </div>
      {user.isAdmin === true ? (
        <Link to="/admin">
          <Button>Admin</Button>
        </Link>
      ) : (
        <div></div>
      )}
      <div className="exit" onClick={handleClick}>
        <img src={exit} alt="exit button" />
      </div>
    </Container>
  );
};

export default UserDetail;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  /* margin: 20px 0 20px  */
  .userName {
    font-size: 1.2rem;
    text-align: center;
  }
  .exit {
    width: 4rem;
    cursor: pointer;
  }
  a {
    text-decoration: none;
    color: black;
  }
  @media (max-width: 1200px) {
    font-size: 1rem;
  }
  @media (max-width: 450px) {
    .userName {
      font-size: 1rem;
    }
    .exit{
      width: 4rem;
    }
  }
`;

const Button = styled.button`
  background: white;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  margin-top: 1rem;
  color: black;
  border-radius: 1rem;
  width: 100%;
  :hover {
    cursor: pointer;
  }
  @media (max-width: 450px) {
    font-size: 0.8rem;
    padding: 0.3rem 0.7rem;
  }
`;
