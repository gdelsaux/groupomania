import React, {useState } from 'react';
import styled from 'styled-components';

//components
import CreateUser from './CreateUser';
import AllUsers from './AllUsers';

const Admin = () => {

  //set initial state
  const [count, setCount] = useState(0);

  return (
    <Section>
      <Div>
        <CreateUser setCount={setCount} />
        <AllUsers setCount={setCount} count={count} />
      </Div>
    </Section>
  )
};

export default Admin;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Div = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  width: 100%;
`;