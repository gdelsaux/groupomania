import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import styled from 'styled-components';

//icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const Update = () => {

  //set initail state
  const [input, setInput] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    isAdmin: '',
  });

  const [message, setMessage] = useState();

  //get local storage
  const user = JSON.parse(sessionStorage.getItem('user'));
  const userToUpdate = JSON.parse(sessionStorage.getItem('update'));

  let history = useHistory();

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

  //set format of an email
  function emailChecker (email){
    let format = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return format.test(email);
  };

  //send new details of the user to the API then redirect to the admin page
  const handleClick = (e) => {
    e.preventDefault();

    //check if the email is of correct format
    if(input.email === ''){
      setMessage('');
    } else if (emailChecker(input.email) !== true){
      return setMessage('Enter a valid email');
    }

    fetch(`https://groupo-mania.herokuapp.com/user/updateUser/${userToUpdate.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'authorization': 'Bearer ' + user.token,
        },
        body: JSON.stringify(input),
    }).then(response => response.json())
    .then(data => {
        if(data.error){
          setMessage(data.message);
        } else if(data.message){
          setMessage(data.message);
        } else if(data.id){
          setMessage('')
        }
        history.push('/admin');
    });
  };

  return (
    <Container>
      <Card>
        <Back><Link to='/admin'><FontAwesomeIcon icon={faTimes} /></Link></Back>
        <Form>
          <Input type="text" placeholder={userToUpdate.first_name} onChange={(e) => {handleChange(e, 'firstName')}} />
          <Input type="text" placeholder={userToUpdate.last_name} onChange={(e) => {handleChange(e, 'lastName')}} />
          <Input type="email" placeholder={userToUpdate.email} onChange={(e) => {handleChange(e, 'email')}} />
          <Input type="password" placeholder="New Password" onChange={(e) => {handleChange(e, 'password')}} />
          <label htmlFor='admin'>Admin?</label>   
          <select id='admin' onChange={(e) => {handleChange(e, 'isAdmin')}}>
            <option value='select'>Select</option>
            <option value='false'>No</option>
            <option value='true'>Yes</option>
          </select>
          <Button type='submit' onClick={handleClick} >Update User</Button>
          <ErrorMsg>{message}</ErrorMsg>
        </Form>
      </Card>
    </Container>
  )
};

export default Update;

const Container = styled.section`
width: 100%;
height: 90vh;
display: flex;
flex-direction: row;
justify-content: space-around;
align-items: center;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;  
  padding: 30px;
  width: 80%;
  max-width: 600px;
  box-shadow: 5px 0 6px -1px #c2c2c2, -5px 0 6px -1px #c2c2c2;
  border-radius: 15px;
  flex-wrap: wrap;
`;

const Form = styled.form`
  min-width: 170px;
  display: flex;
  flex-direction: column;
  justify-content: center;
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
`;

const ErrorMsg = styled.div`
  margin-top: 10px;
  color: red;
  text-align: center;
`;

const Back = styled.button`
  align-self: flex-end;
  background-color: white;
  border: none;
`;