import React, {useState} from 'react';
import styled from 'styled-components';
import Axios from 'axios';
import Compressor from 'compressorjs';

//icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera} from '@fortawesome/free-solid-svg-icons';
import { faPaperPlane} from '@fortawesome/free-solid-svg-icons';

const Comment = ({postId , setCount}) => {

  //set original states for forData
  const [commentInput, setCommentInput] = useState('');
  const [commenImg, setCommentImg] = useState();
  const [commentPreview, setCommentPreview] = useState({
    file: ''
  });

  //get sessionStorage
  const userId = JSON.parse(sessionStorage.getItem('user'));


  //event handlers
  const commentHandleChange = (e) => {
    setCommentInput(e.target.value)
  }

  const handleCompressedUpload = (e) => {
    const image = e.target.files[0];
    console.log(image);
    new Compressor(image, {
      quality: 0.6, // 0.6 can also be used, but its not recommended to go below.
      success: (compressedResult) => {
        console.log(compressedResult);
        // compressedResult has the compressed file.
        // Use the compressed file to upload the images to your server.
        setCommentPreview({ file: URL.createObjectURL(compressedResult) });
        setCommentImg(e.target.files[0]);
      },
    });
  };

  //set default headers from the API
  Axios.defaults.headers.common['authorization'] = 'Bearer ' + userId.token;

  //POST to API to create a new comment/ change count's value to re-render the posts array /reset value of the input
  const send = (e) => {
    e.preventDefault();

    const file = new FormData();

    file.append('file', commenImg); 
    file.append('post', commentInput);
    file.append('userId', userId.id); 
    file.append('PostId', postId);

    Axios.post('https://groupo-mania.herokuapp.com/comment/createComment', file)
      .then(res => {
        setCount( count => count +1);
        setCommentInput('');
        setCommentPreview('');
        setCommentImg();
        console.log(commenImg);
      })
      .catch(err => console.log(err));
  };


  return (
    <Wrapper>
        <Form >
          <Textarea  placeholder='write a comment...' onChange={commentHandleChange} value={commentInput}/>
          <Img  src={commentPreview.file}/>
          <Div>            
            <Label  htmlFor='upload'><FontAwesomeIcon icon={faCamera} />  add a photo</Label>
            <File id='upload' type='file' accept='image/*' onChange={handleCompressedUpload}/>            
            <Button onClick={send}><FontAwesomeIcon icon={faPaperPlane} /></Button>
          </Div>
        </Form>
    </Wrapper>
  )
};

export default Comment;

const Wrapper = styled.div`
  display: block;
  margin: auto;
  min-height: 100px;
  width: 100%;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
`;

const Textarea = styled.input`
  min-height: 30px;
  width: 90%;
  padding-left: 10px;
  border-radius: 15px;
  border: none;
  background-color: #eeeeee;
  :focus{
    outline: none;
  }
`;

const Img = styled.img`
  display: block;
  max-width: 220px;
  margin: 10px auto;
`;

const Div = styled.div`
  margin-top: 10px;
`;

const Label = styled.label`
  align-self: left;
  margin-right: 15px;
  padding: 5px;
  border: solid 1px gray;
  border-radius: 15px;
  background-color: white;
  color: gray;

  :hover{
    cursor: pointer;
  }
`;

const File = styled.input`
  display: none;
`;

const Button = styled.button`
  color: gray;
  padding: 7px;
  background-color: white;
  border: solid 1px gray;
  border-radius: 50%;

  :hover {
    cursor: pointer;
  }
`;