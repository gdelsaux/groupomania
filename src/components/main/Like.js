import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

//icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';

const Like = (props) => {
  //Get user id from sessionStorage
  const user = JSON.parse(sessionStorage.getItem('user'));
  //state management
  const [color, setColor] = useState('lightgray');
  const [likeId, setLikeId] = useState([]);
  let [amontOfLike, setAmontOfLike] = useState();

  //check if user already likes
  let liked = props.post.likes.some(info => info.userId === user.id);

  // set the color of the icon and if liked get the like id
  useEffect(() => {

    setAmontOfLike(props.post.likes.length);

    if(liked){
      let id = props.post.likes.filter(info => info.userId === user.id);
      setLikeId(id[0].id)
      setColor('black')
    } else {
      setColor('lightgray')
    }
  }, [props]);

  //delete the like
  const destroy = () => {
    fetch(`https://groupo-mania.herokuapp.com/like/delete/${likeId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'authorization': 'Bearer ' + user.token,
      }
    }).then(response => {response.json()})
    .then( data => {
      // setAmontOfLike(amontOfLike -= 1)
    })
  };

  //create a like
  const create = () => {
    const body = {
      postId: props.post.id,
      userId: user.id,
    };
    fetch('https://groupo-mania.herokuapp.com/like/like', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'authorization': 'Bearer ' + user.token,
      },
      body: JSON.stringify(body),
    }).then(response => response.json())
    .then( data => {
      setLikeId(data.id)
    })
  };

  //handle the change liked/not liked and add/delete like to the Like array of the post
  const handleClick = () => {
    if(color === 'black'){
      setColor('lightgray');
      destroy();
      setAmontOfLike(amontOfLike -= 1)
    } else {
      setColor('black');
      create();
      setAmontOfLike(amontOfLike += 1)
    }
  };

  
  return (
    <Thumb onClick={handleClick}>
      <FontAwesomeIcon icon={faThumbsUp} color={color}/>
      <Span>{amontOfLike} Like</Span>
    </Thumb>
  )
};

export default Like;

const Thumb = styled.div`
  margin-right: 20px;
  float: right;
  color: ${props => props.color};
  font-size: 18px;
  cursor: pointer;
`;

const Span = styled.span`
  display: inline-block;
  margin-left: 10px;
`;