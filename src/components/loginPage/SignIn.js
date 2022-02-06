import React, { useState } from "react";
import styled from "styled-components";
import { useHistory, withRouter } from "react-router-dom";

const Signin = ({ setNav, nav }) => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  console.log(nav);

  const [message, setMessage] = useState();

  const handleChange = (e, value) => {
    setInput(e.target.value);
    switch (value) {
      case "email":
        setInput({
          ...input,
          email: e.target.value,
        });
        break;
      case "password":
        setInput({
          ...input,
          password: e.target.value,
        });
        break;
      default:
    }
  };

  let history = useHistory();

  const handleClick = (e) => {
    e.preventDefault();
    fetch("https://groupo-mania.herokuapp.com/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          return setMessage(data.error);
        } else if (data.message) {
          return setMessage(data.message);
        } else if (data.id) {
          sessionStorage.setItem("user", JSON.stringify(data));
        }
        history.push("/main");
        setNav(!nav);
        // window.location.reload();
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <Form>
      <div className="label">
        <Input
          type="email"
          // placeholder="Email"
          onChange={(e) => handleChange(e, "email")}
        />
        <p>email</p>
      </div>
      <div className="label">
        <Input
          type="password"
          // placeholder="Password"
          onChange={(e) => handleChange(e, "password")}
        />
        <p>password</p>
      </div>
      <Button type="submit" onClick={(e) => handleClick(e)}>
        Sign In
      </Button>
      <ErrorMsg>{message}</ErrorMsg>
    </Form>
  );
};

export default withRouter(Signin);

const Form = styled.form`
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  height: 450px;
  width: 90%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  -webkit-box-shadow: 0px 0px 10px 2px #b3b3b3;
  box-shadow: 0px 0px 10px 2px #b3b3b3;
  .label {
    padding: 1rem 0rem;
    p {
      padding: 0.5rem 0rem 0rem 1rem;
      font-weight: 100;
    }
  }
  @media (max-width: 955px) {
    margin-top: 2rem;
  }
`;

const Input = styled.input`
  width: 100%;
  border: none;
  border-bottom: solid 1px #e5e5e5;
  font-size: 1.7rem;
  padding-left: 1rem;
  :focus {
    outline: none;
  }
`;

const Button = styled.button`
  padding: 0.5rem 2rem;
  width: 10rem;
  font-size: 1.25em;
  margin-top: 2rem;
  border-radius: 15px;
  border: solid 1px #bebebe;
  background: #f3f3f3;
  color: black;
  cursor: pointer;
  &:hover {
    transform: scale(1.2);
    transition: 600ms;
  }
  a {
    text-decoration: none;
  }
`;

const ErrorMsg = styled.div`
  margin-top: 10px;
  color: red;
  text-align: center;
`;
