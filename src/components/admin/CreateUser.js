import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const CreateUser = ({setCount}) => {

  //set initial states
  const [input, setInput] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    isAdmin: '',
    });
  
  const [message, setMessage] = useState();
  
  //event handlers
  const handleChange = (e, value) => {
    setInput(e.target.value);
    switch(value) {
      case 'firstName':
        setInput({
          ...input,
          first_name: e.target.value,
        });
      break;
      case 'lastName':
        setInput({
          ...input,
          last_name: e.target.value,
        });
      break;
      case 'email':
        setInput({
          ...input,
          email: e.target.value,
        });
      break;
      case 'password':
        setInput({
          ...input,
          password: e.target.value,
        });
      break;
      case 'isAdmin':
        setInput({
          ...input,
          isAdmin: e.target.value,
        });
      break;
      default:
    };
  };

  //set format of email
  function emailChecker (email){
    let format = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return format.test(email);
  };
  
  //request to the API to create new user / chang count's value to render the users array
  const handleClick = (e) => {

    e.preventDefault();

    //check if admin status has been selected
    if(input.isAdmin === 'Select' || input.isAdmin === ''){
      return setMessage('Choose admin status')
    }
    //then check if the email is in right format
    else if(emailChecker(input.email) !== true){
      return setMessage('Enter a valid email')
    }
    fetch('https://groupo-mania.herokuapp.com/user/createUser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(input),
    }).then(response => response.json())
    .then(data => {
      if(data.error){
        setMessage(data.message);
      } else if(data.message){
        setMessage(data.message);
      } else if(data.id){
        setMessage(`user ${data.id} created`)
      }
      setCount(count => count + 1);
    });
  };

  return (
    <Div>
      <Link to='/main'><Button>Home</Button></Link>
      <Title>Create a user</Title>
      <Form>
        <Input type="text" placeholder="First Name" onChange={(e) => {handleChange(e, 'firstName')}} value={input.first_name.value} />
        <Input type="text" placeholder="Last Name" onChange={(e) => {handleChange(e, 'lastName')}} value={input.last_name.value} />
        <Input type="email" placeholder="Email" onChange={(e) => {handleChange(e, 'email')}} value={input.email.value} />
        <Input type="password" placeholder="Password" onChange={(e) => {handleChange(e, 'password')}} value={input.password.value} />
        <p>Admin?</p>   
        <select onChange={(e) => {handleChange(e, 'isAdmin')}}>
          <option >Select</option>
          <option value='true'>Yes</option>
          <option value='false'>No</option>
        </select>
        <Button onClick={handleClick}>Create</Button>
        <ErrorMsg>{message}</ErrorMsg>
      </Form>
    </Div>
  );
};

export default CreateUser;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  /* width: 100%; */
  /* min-width: 150px; */
`;

const Title = styled.h3`
  margin-top: 20px;
`;

const Input = styled.input`
  margin: 5px 0 10px 0;
  border: none;
  border-bottom: solid 1px #e5e5e5;

  :focus {
    outline: none;
  };
`;

const Button = styled.button`

  margin-top: 10px;
  border-radius: 15px;
  border: solid 2px lightgrey;
  :hover{
    cursor: pointer;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const ErrorMsg = styled.div`
  margin-top: 10px;
  color: red;
  text-align: center;
`;