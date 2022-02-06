import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Axios from 'axios';

//components
import CreatePost from './CreatePost';
import Loading from './Loading';
import Content from './Content';

const Feed = () => {
  //set original states
  const [posts, setPosts] = useState([]);
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // get sessionStorage
  const userId = JSON.parse(sessionStorage.getItem('user'));

  if(userId){
    Axios.defaults.headers.common['authorization'] = 'Bearer ' + userId.token;
  }

  //fetch all posts from the api and listen to counts changes
  useEffect(() => {

    fetch(`https://groupo-mania.herokuapp.com/post/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'authorization': 'Bearer ' + userId.token,
        },
      }).then(response => response.json())
      .then(data => {
        let post = data.reverse();
        setPosts(post);
        setIsLoading(false)
        }
      ).catch(
        err => setPosts([])
      );

  }, [count]);

  return (
    <Container>
      <CreatePost posts={posts} setPosts={setPosts} setCount={setCount} />
      {isLoading ? <Loading /> : ''}
      <Content posts={posts} setPosts={setPosts} setCount={setCount} />
    </Container>
)
};

export default Feed;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  margin-bottom: 60px;
`;

