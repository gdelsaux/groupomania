const Like = require ('../models/Like');
const User = require('../models/User');
const Post = require('../models/Post');

exports.like = async (req, res) => {
  
  const { postId, userId, id } = req.body;

  try {
    const newLike = await Like.create({
      userId: userId,
      postId: postId,
      id: id,
    });
    return res.send(newLike);
  }catch(err){
    return res.send({
      message: err.message
    });
  };
};

exports.delete = async (req, res) => {
  const { id } = req.params;

  const like = await Like.findOne({
    where: {
      id
    }
  });

  if(!like){
    return res.send({
      message: 'Post not liked'
    })
  }

  try {
    await like.destroy();
    res.send({
        message: `like ${id} deleted successfully`
    })
  } catch (err){
    return res.status(500).send({
        message: `Error: ${err.message}`,
    });
  }
};