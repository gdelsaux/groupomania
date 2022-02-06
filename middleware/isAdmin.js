const User = require('../models/User');

module.exports = async (req, res, next) => {
  const {
    id
  } = req.params;
  const user = await User.findOne({
    where: {
      id
    }
  });
  if (!user) {
    return res.send({
      message: `user ${id} not found`
    })
  }
  if (user.isAdmin === true) {
    return next()
  } else {
    return res.status(400).json({
      message: 'Access only available for admins'
    })
  }
}