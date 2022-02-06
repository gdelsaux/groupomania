const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'MyMorningCoffeeIsTheBestInTheWorld');
    const userId = decodedToken.id;
    if (req.body.id && req.body.id !== userId) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch (err){
    res.status(401).json({
      message: err.message
    });
  }
};