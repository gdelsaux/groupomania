const fs = require("fs");

const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "us-cdbr-east-04.cleardb.com",
  user: "bfae55586ecfc5",
  database: "heroku_ce52f1f101a24d1",
  password: "eb0c9ed6@us",
});

const Post = require("../models/Post");
const User = require("../models/User");
const Comment = require("../models/Comment");
const Like = require("../models/Like");

exports.getPost = async (req, res, next) => {
  const { id } = req.params;
  const post = await Post.findOne({
    where: {
      id,
    },
    include: { model: Like, Post },
  });
  if (!post) {
    return res.status(400).json({
      message: "post not found",
    });
  }
  console.log(post);

  return res.send(post);
};

exports.getAllPost = async (req, res) => {
  // res.send('a string')
  try {
    const allPosts = await Post.findAll({
      include: [
        { model: User },
        { model: Comment, include: User },
        { model: Like },
      ],
      raw: false,
      // limit: -2
    });
    if (!allPosts) {
      return res.status(400).json({
        message: "No post found",
      });
    }
    res.status(200).send(allPosts);
  } catch (err) {
    res.send({
      message: err.message,
    });
  }
};

exports.createPost = async (req, res) => {
  const data = req.body.post;
  const userId = req.body.userId;
  let post_img;
  console.log(req.files);
  if (req.files) {
    post_img = req.files.file.data.toString("base64");
  }

  if (!post_img && !data) {
    return res.status(400).json({
      message: "details need to be filled in to create a post",
    });
  }
  try {
    Post.create({
      userId: userId,
      date: Date.now(),
      data: data,
      post_img: post_img,
    }).then((response) => res.send("post created"));
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

exports.deletePost = async (req, res) => {
  // res.send('delete')
  const { id } = req.params;

  const post = await Post.findOne({
    where: {
      id,
    },
  });

  if (!post) {
    return res.status(400).json({
      message: `no post with postId${id} was found`,
    });
  }

  try {
    await post.destroy();
    res.send({
      message: `post ${id} deleted successfully`,
    });
  } catch (err) {
    return res.status(500).send({
      message: `Error: ${err.message}`,
    });
  }
};
