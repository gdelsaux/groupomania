const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const sequelize = require('sequelize');
const User = require('../models/User');

//get all the user from the DB (admin access only)
exports.getAllUsers = async (req, res) => {
  // res.send('get all user')
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
    const allUsers = await User.findAll();
    res.status(200).json(allUsers)
  } else {
    return res.status(400).json({
      message: 'Access only available for admins'
    })
  }
}

//create user: 1st check if detail are provided 2nd check if user exist
exports.createUser = async (req, res, next) => {
  const {
    first_name,
    last_name,
    email,
    password,
    isAdmin,
  } = req.body;
  if (!first_name || !last_name || !email || !password) {
    return res.status(400).json({
      message: 'details need to be filled in to create a user'
    });
  }

  let format = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!format.test(email)) {
    return res.send({
      message: 'email format invalid'
    })
  }

  let userNameExist = await User.findOne({
    where: {
      email
    }
  });
  if (userNameExist) {
    return res.status(400).json({
      message: `A user with ${email} already exits`
    });
  }
  try {
    //hash the password using bcrypt
    
    bcrypt.hash(password, 10)
    .then(
      (hash) => {
        let newUser = {
          first_name: first_name,
          last_name: last_name,
          email: email,
          password: hash,
          isAdmin: isAdmin,
        };

        User.create(newUser)
        .then(
          (response) => {
            console.log(response.dataValues)
            const token = jwt.sign({
                id: response.dataValues.id
              },
              'MyMorningCoffeeIsTheBestInTheWorld', {
                expiresIn: '24h'
              }
            );
            return res.send({
              id: response.dataValues.id,
              token: token,
              isAdmin: response.dataValues.isAdmin,
              first_name: response.dataValues.first_name,
              last_name: response.dataValues.last_name,
            });
          }).catch(err => res.send(err.message))           
      }
    ).catch(err => res.send('an error occured'))
  } catch (err) {
    console.log(err.message)
    return res.status(500).json({
      error: err.message
    });
  }
}

//get one user
exports.getOneUser = async (req, res, next) => {
  res.send('get on user')
  // try {
  //   const {
  //     id
  //   } = req.params;
  //   const user = await User.findOne({
  //     where: {
  //       id
  //     }
  //   });
  //   if (!user) {
  //     return res.send({
  //       message: `User ${id} not found`
  //     });
  //   }
  //   return res.send(user)
  // } catch (err) {
  //   res.send({
  //     messege: err.message
  //   });
  // };
};

//login: 
exports.login = async (req, res) => {
  const {
    email
  } = req.body;
  const {
    password
  } = req.body;
  const user = await User.findOne({
    where: {
      email
    },
  });
  if (!user) {
    return res.status(400).json({
      message: 'user not found'
    });
  }
  bcrypt.compare(password, user.password).then(
    (valid) => {
      if (!valid) {
        return res.send({
          error: "Invalide password!"
        })
      }
      const token = jwt.sign({
          id: user.id
        },
        'MyMorningCoffeeIsTheBestInTheWorld', {
          expiresIn: '24h'
        }
      );
      return res.send({
        id: user.id,
        token: token,
        isAdmin: user.isAdmin,
        first_name: user.first_name,
        last_name: user.last_name,
      });
    }
  ).catch(
    (err) => {
      res.send({
        error: err.message
      })
    }
  )
};

//update the user 1st find the user 2nd update with given detail 3rd save to the DB
exports.updateUser = async (req, res) => {
  const {
    id
  } = req.params;
  const {
    first_name,
    last_name,
    email,
    password,
    isAdmin
  } = req.body;
  const user = await User.findOne({
    where: {
      id,
    },
  });
  if (!user) {
    return res.status(400).json({
      message: `No user found with the id ${id}`,
    });
  }
  try {
    if (first_name || last_name || email || password || isAdmin) {
      const newPassword = await bcrypt.hash(password, 10);
      user.first_name = first_name ? first_name : user.first_name;
      user.last_name = last_name ? last_name : user.last_name;
      user.email = email ? email : user.email;
      user.password = password ? newPassword : user.password;
      user.isAdmin = isAdmin ? isAdmin : user.isAdmin;
      user.save();
      return res.send({
        message: `User ${id} has been updated!`,
      });
    }
  } catch (err) {
    return res.status(500).send({
      message: `Error: ${err.message}`,
    });
  }
};

//delete user: 1st get the userId, 2nd check if user exist 3rd delete the user
exports.deleteUser = async (req, res) => {
  //1st
  const {
    id
  } = req.params;
  if (!id) {
    return res.status(400).send({
      message: 'Please provide a id for the user you are trying to delete!',
    });
  }
  //2nd
  const user = await User.findOne({
    where: {
      id,
    },
  });
  if (!user) {
    return res.status(400).send({
      message: `user ${id} could not be found`,
    });
  }
  //3rd
  try {
    await user.destroy();
    return res.send({
      message: `User ${id} has been deleted!`,
    });
  } catch (err) {
    return res.status(500).send({
      error: err,
    });
  }
};