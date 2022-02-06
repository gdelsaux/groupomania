import React, { useState } from "react";
import styled from "styled-components";
import Axios from "axios";
import Compressor from "compressorjs";

const CreatePost = ({ setCount, post, setPost }) => {
  //get sessionStorage
  const userId = JSON.parse(sessionStorage.getItem("user"));

  //set original states for the fromData
  const [input, setInput] = useState("");
  const [img, setImg] = useState();
  const [preview, setPreview] = useState({
    file: "",
  });

  //event handlers
  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const imagePreview = (e) => {
    console.log(e.target.files[0]);
    setImg(e.target.files[0]);
    setPreview({ file: URL.createObjectURL(e.target.files[0]) });
  };

  //set default headers for our API request
  if (userId) {
    Axios.defaults.headers.common["authorization"] = "Bearer " + userId.token;
  }

  //POST to API / change count's value to re-render the posts array / /reset value of the input
  const send = (e) => {
    e.preventDefault();

    const file = new FormData();

    file.append("file", img);
    file.append("post", input);
    file.append("userId", userId.id);

    Axios.post("https://groupo-mania.herokuapp.com/post/createpost", file)
      .then((res) => {
        console.log(res);
        setInput("");
        setImg("");
        setPreview("");
      })
      .catch((err) => console.log(err));
  };

  const handleCompressedUpload = (e) => {
    const image = e.target.files[0];
    console.log(image);
    new Compressor(image, {
      quality: 0.6, // 0.6 can also be used, but its not recommended to go below.
      success: (compressedResult) => {
        console.log(compressedResult);
        // compressedResult has the compressed file.
        // Use the compressed file to upload the images to your server.
        setPreview({ file: URL.createObjectURL(compressedResult) });
        setImg(e.target.files[0]);
      },
    });
  };

  return (
    <Form enctype="multipart/form-data">
      <Textarea
        placeholder="Write a post here ..."
        onChange={handleChange}
        name="input"
        value={input}
        type="text"
      />
      <Img src={preview.file} />
      <div>
        <Label htmlFor="file" className="custom-file-upload">
          Upload Image
        </Label>
        <File
          id="file"
          type="file"
          accept="image/*"
          name="image"
          // onChange={imagePreview}
          onChange={handleCompressedUpload}
        />
        <Button onClick={send}>Post</Button>
      </div>
    </Form>
  );
};

export default CreatePost;

const Form = styled.form`
  margin-top: 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 1rem;
`;

const Img = styled.img`
  max-width: 280px;
  margin-bottom: 20px;
`;

const Textarea = styled.input`
  height: 10rem;
  width: 100%;
  max-width: 700px;
  border: none;
  box-shadow: 5px 0 10px -1px #c2c2c2, -5px 0 10px -1px #c2c2c2;
  border-radius: 10px;
  padding: 15px;
  font-size: 1.5rem;
  :focus {
    outline: none;
  }
`;

const Label = styled.label`
  border: 1px solid gray;
  display: inline-block;
  padding: 6px 12px;
  cursor: pointer;
  margin-right: 40px;
  border-radius: 15px;
`;

const File = styled.input`
  display: none;
`;

const Button = styled.button`
  background-color: white;
  border: solid 1px gray;
  border-radius: 15px;
  padding: 6px 12px;

  :hover {
    cursor: pointer;
  }
`;
