const Comment = require('../models/Comment');
const User = require('../models/User');
const Post = require('../models/Post');

exports.getComment = async (req, res) => {
  const {
    id
  } = req.params;
  const comment = await Comment.findOne({
    where: {
      id
    },
  });
  if (!comment) {
    return res.status(400).json({
      message: 'comment not found'
    });
  }
  return res.send(
    comment
  );
};

exports.getAllComment = async (req, res) => {
  const {PostId} = req.params;
  try {
    const allComments = await Comment.findAll({
      where: {PostId},
      include: [User, Post]
    });
    if (!allComments) {
      return res.status(400).json({
        message: "No post found"
      })
    }
    return res.status(200).send(allComments);
  } catch (err) {
    res.send({
      message: err.message
    })
  }
};

exports.createComment = async (req, res) => {
  const data = req.body.post;
  const UserId = req.body.userId;
  const PostId = req.body.PostId;
  let comment_img;
  console.log(req.body)
  if(req.files){
    comment_img = req.files.file.data.toString('base64');
  }

  if (!data && !comment_img) {
    return res.status(400).json({
      message: 'please write a comment before making a request'
    })
  }
  
  // let comment = {};
  
  // if (req.files) {
  //   comment = {
  //     postId: PostId,
  //     userId: UserId,
  //     comment_img: req.files.file.data.toString('base64'),
  //     date: Date.now(),
  //     data: data
  //   }
  // } else {
  //   comment = {
  //     postId: PostId,
  //     userId: UserId,
  //     comment_img: '',
  //     date: Date.now(),
  //     data: data
  //   }
  // }

  try { 
    // console.log(comment)
    // let newComment = await Comment.create(comment);
    // return res.send(newComment);
    Comment.create({
      postId: PostId,
      userId: UserId,
      date: Date.now(),
      data: data,
      comment_img: comment_img,
    }).then(response => res.send('comment created'))
  } catch (err) {
    return res.status(400).json({
      message: `Error: ${err.message}`
    })
  }
};

exports.deleteComment = async (req, res) => {
  const {
    id
  } = req.params;
  const comment = await Comment.findOne({
    where: {
      id
    }
  });
  if (!id) {
    return res.status(400).json({
      message: `no comment with commentId ${id} was found`
    })
  }
  try {
    await comment.destroy();
    res.send({
      message: `comment ${id} deleted successfully`
    })
  } catch (err) {
    return res.status(500).send({
      message: `Error: ${err.message}`
    });
  }
}