import React from 'react';
import styled from 'styled-components';

//Components
import SignIn from './SignIn';
import SignUp from './SignUp';

const LoginForm = ({setNav, nav}) => {

  return (
    <Wrapper>
        <SignIn setNav={setNav} nav={nav} />
        <SignUp setNav={setNav} nav={nav}  />                  
    </Wrapper>
  );
};

export default LoginForm;

const Wrapper = styled.section`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  padding: 2rem;
  margin-top: 3rem;
  @media (max-width: 955px) {
    flex-direction: column;
    padding: 1rem;
    margin-top: 2rem;
  }
`;