import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

//icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

const AllUsers = ({ count, setCount }) => {
  //get sessionStorage
  const user = JSON.parse(sessionStorage.getItem("user"));
  //set Initial state
  let [users, setUsers] = useState([]);
  //get all users from the API and listen to the count's value
  useEffect(() => {
    fetch(`https://groupo-mania.herokuapp.com/user/admin/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        authorization: "Bearer " + user.token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      });
  }, [count, user]);

  //delete user with a given id
  const handleUserDelete = (id) => {
    fetch(`https://groupo-mania.herokuapp.com/user/admin/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        authorization: "Bearer " + user.token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setCount((count = count + 1));
      });
  };

  //send details of the user to be updated to sessionStorage
  const handleEdit = (id) => {
    sessionStorage.setItem("update", JSON.stringify(id));
  };

  return (
    <Wrapper>
      {users.map((user) => (
        <Card key={user.id}>
          <Div>
            <Name>
              Name: {user.first_name} {user.last_name}
            </Name>
            <P>Email: {user.email}</P>
            <P>Is admin: {JSON.stringify(user.isAdmin)}</P>
            <P>User id: {user.id}</P>
          </Div>
          <Icon>
            <Delete onClick={() => handleUserDelete(user.id)}>
              <FontAwesomeIcon icon={faTrashAlt} />
            </Delete>
            <Update>
              <Link to="/updateUser">
                <FontAwesomeIcon
                  icon={faEdit}
                  onClick={() => handleEdit(user)}
                />
              </Link>
            </Update>
          </Icon>
        </Card>
      ))}
    </Wrapper>
  );
};

export default AllUsers;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 80vh;
  min-width: 200px;
  width: 70%;
  margin: 20px 0 50px 0;
  /* overflow-x: hidden; */
`;

const Card = styled.div`
  width: 70%;
  max-width: 700px;
  box-shadow: 5px 0 6px -1px #c2c2c2, -5px 0 6px -1px #c2c2c2;
  padding: 30px;
  margin: 30px 0;
  border-radius: 15px;
`;

const Div = styled.div`
  display: inline-block;
`;

const Name = styled.p`
  display: inline;
`;

const P = styled.p`
  margin-top: 10px;
`;

const Icon = styled.div`
  float: right;
  font-size: 13px;
  cursor: pointer;
`;

const Delete = styled.span`
  margin: 10px;
`;

const Update = styled.span``;
