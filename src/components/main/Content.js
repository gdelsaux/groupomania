import React from "react";
import styled from "styled-components";

//trash svg
import trash from "../../assets/trash.svg";
//icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

//component
import Comment from "./Comment";
import Like from "./Like";

const Content = ({ posts, setCount, setPosts }) => {
  //get sessionStorage
  const userId = JSON.parse(sessionStorage.getItem("user"));

  //delete the post with a given postId / change count's value to re-render the posts array
  const handlePostDelete = (post) => {
    fetch(`https://groupo-mania.herokuapp.com/post/${post}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        authorization: "Bearer " + userId.token,
      },
    })
      .then((response) => {
        response.json();
      })
      .then(() => {
        setCount((count) => count + 1);
      });
  };

  //delete the comment with a given postId / change count's value to re-render the posts array
  const handleCommentDelete = (comment) => {
    fetch(
      `https://groupo-mania.herokuapp.com/comment/deleteComment/${comment}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          authorization: "Bearer " + userId.token,
        },
      }
    )
      .then((response) => {
        response.json();
      })
      .then((data) => {
        console.log(data);
        setCount((count) => count + 1);
      });
  };

  //map over the posts array to render JSX for each object in the array
  return (
    <Wrapper>
      {posts.map((post) => (
        <Card key={post.id}>
          <Name>
            {post.user.first_name} {post.user.last_name}
          </Name>
          {userId.isAdmin === true || userId.id === post.user.id ? (
            <Delete onClick={() => handlePostDelete(post.id)}>
              <FontAwesomeIcon icon={faTrashAlt} />
            </Delete>
          ) : (
            ""
          )}
          <Time>
            {post.date.split("T")[0]} at {post.date.slice(11, 19)}{" "}
          </Time>

          {post.post_img === null ? (
            ""
          ) : (
            <Image src={`data:image/jpeg;base64,${post.post_img}`} />
          )}
          <Text>{post.data}</Text>
          <P> {post.comments.length} Comments </P>
          <Like post={post} />
          <ContenWrapper>
            {post.comments.map((element) => {
              return (
                <Div key={element.id}>
                  <CommentName>
                    {element.user.first_name} {element.user.last_name}
                  </CommentName>
                  {userId.isAdmin === true || userId.id === element.user.id ? (
                    <Delete>
                      <FontAwesomeIcon
                        icon={faTrashAlt}
                        onClick={() => handleCommentDelete(element.id)}
                      />
                    </Delete>
                  ) : (
                    ""
                  )}
                  <CommentTime>
                    {element.date.split("T")[0]} at {element.date.slice(11, 19)}{" "}
                  </CommentTime>
                  <CommentData>{element.data}</CommentData>
                  {element.comment_img === null ? (
                    ""
                  ) : (
                    <CommentImg
                      src={`data:image/jpeg;base64,${element.comment_img}`}
                    ></CommentImg>
                  )}
                </Div>
              );
            })}
          </ContenWrapper>
          <Comment postId={post.id} setCount={setCount} />
        </Card>
      ))}
    </Wrapper>
  );
};

export default Content;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Card = styled.div`
  width: 100%;
  max-width: 700px;
  min-height: 400px;
  box-shadow: 2px 0 15px -1px #c2c2c2, -2px 0 15px -1px #c2c2c2;
  padding: 2rem;
  padding-bottom: 10px;
  margin-top: 1rem;
  border-radius: 10px;
`;

const Name = styled.div`
  display: inline;
`;

const Delete = styled.div`
  float: right;
  color: #4d5255;
  font-size: 1.5rem;
  cursor: pointer;
  margin-right: 30px;
  color: lightgray;
  :hover {
    color: darkgray;
  }
`;

const Time = styled.div`
  margin-top: 3px;
  font-size: 12px;
`;

const P = styled.div`
  display: inline;
`;

const Image = styled.img`
  display: block;
  margin: 20px auto;
  width: 100%;
  max-height: 700px;
  object-fit: cover;
  border: none;
`;

const Text = styled.div`
  display: block;
  margin: 20px auto;
  background-color: white;
  width: 90%;
  border-radius: 15px;
  min-height: 5rem;
  padding-top: 1rem;
`;

const ContenWrapper = styled.div`
  display: block;
  margin: auto;
  width: 100%;
  max-height: 320px;
  border-radius: 15px;
  border: solid 1px #eeeeee;
  overflow-x: auto;
  margin-top: 20px;
`;

const Div = styled.div`
  margin-top: 10px;
  padding: 10px;
`;

const CommentName = styled.div`
  display: inline-block;
  font-size: 15px;
  color: #e9383c;
`;

const CommentTime = styled.div`
  font-size: 10px;
  display: inline-block;
  margin-left: 10px;
`;

const CommentImg = styled.img`
  display: block;
  margin: 20px auto;
  max-width: 290px;
  width: 100%;
  border: none;
`;

const CommentData = styled.div`
  margin-top: 10px;
  margin-left: 15px;
`;
