const moment = require('moment');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../../db/connection');

const auth = {

  encodeToken(user) {
    const playload = {
      exp: moment().add(14, 'days').unix(),
      iat: moment().unix(),
      sub: user._id,
      username: user.username // do you need this?
    };
    return jwt.sign(playload, process.env.TOKEN_SECRET);
  },

  decodeToken(token) {
    const payload = jwt.verify(token, process.env.TOKEN_SECRET);
    const now = moment().unix();
    return new Promise((resolve, reject) => {
      if (!payload) {
        reject('Invalid token.');
      } else if (payload.exp && now > payload.exp) {
        reject('Token has expired.');
      } else {
        resolve(payload);
      }
    });
  },

  comparePass(userpass, dbpass) {
    return bcrypt.compare(userpass, dbpass);
  },

  checkAuthentication(req, res, next) {
    if (!(req.headers && req.headers.authorization)) {
      return res.status(400).json({
        message: 'Please log in.'
      });
    }
    // decode the token
    var header = req.headers.authorization.split(' ');
    var token = header[1];
    auth.decodeToken(token)
    .then((payload) => {
      return db.users.findOne({_id: payload.sub});
    })
    .then((user) => {
      req.userId = user._id;
      next();
    })
    .catch((err) => {
      return res.status(401).json({
        message: err
      });
    });
  },

  createUser(user) {
    return new Promise((resolve, reject) => {
      this.userValidation(user)
      .then(() => {
        const salt = bcrypt.genSaltSync();
        const hash = bcrypt.hashSync(user.password, salt);
        new db.user({
          username: user.username,
          password: hash
        })
        .save()
        .then(resolve)
        .catch(reject);
      })
      .catch(reject);
    });
  },

  userValidation(user) {
    return new Promise((resolve,reject) => {
      if (user.username.length < 6) {
        reject({
          err:'username_length',
          message:'Username must be longer than 6 characters'
        });
      } else if (user.password.length < 6) {
        reject({
          err:'password_length',
          message:'Password must be longer than 6 characters'
        });
      } else {
        resolve();
      }
    });
  },

  registerUser(req, res, next) {
    auth.createUser(req.body.user)
    .then((user) => { return auth.encodeToken(user); })
    .then((token) => {
      res.status(200).json({
        message: `Success. '${req.body.user.username}' has been created.`,
        token: token
      });
    })
    .catch((err) => {
      if (err) {
        if ((err.code === 11000) && err.errmsg.includes('username')) {
          res.status(400).json({message: `Please choose a different 'username'.`});
        } else {
          res.status(400).json({message: 'Regsitration failed'});
        }
      } else {
        res.status(400).json({message: 'Regsitration failed'});
      }
    });
  },

  login(req, res, next) {
    let user;
    const username = req.body.user.username;
    const password = req.body.user.password;
    return db.users.findOne({username})
    .then((dbUser) => {
      user = dbUser;
      return auth.comparePass(password, user.password);
    })
    .then((result) => {
      if (!result) throw new Error();
      return auth.encodeToken(user);
    })
    .then((token) => {
      res.status(200).json({
        message: 'Success',
        token: token
      });
    })
    .catch((err) => {
      res.status(400).json({message: 'Login failed.'});
    });
  },

  getCurrentUser(req, res) {
    db.users.findOne({_id: req.userId})
    .then((user) => {
      let result = Object.assign({}, user._doc);
      delete result.password;
      res.status(200).json({data: result, message: 'Success'});
    })
    .catch((err) => {
      res.status(500).json({err: 'not-found', message: 'An error ocurred while getting the current user.'});
    });
  }

};

module.exports = auth;
