import _ from "lodash";
import errorController from "./../helpers/dbErrorHandler";
import User from "./../models/user.model";

// /api/user
const create = (req, res, next) => {
  const user = new User(req.body);
  user.save((err, result) => {
    if (err) {
      return res.status(400).json({
        error: errorController.getErrorMessage(err)
      });
    }
    res.status(200).json({
      message: "Successfully signed up!"
    });
  });
};

const list = (req, res) => {
  User.find((err, users) => {
    if (err) {
      return res.status(400).json({
        error: errorController.getErrorMessage(err)
      });
    }
    res.json(users);
  }).select("name email updated created");
};

// /api/user/:userId
const read = (req, res) => {
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  return res.json(req.profile);
};

const update = (req, res) => {
  let user = req.profile;
  user = _.extend(user, req.body);
  user.save((err, result) => {
    if (err) {
      return res.status(400).json({
        error: errorController.getErrorMessage(err)
      });
    }
    user.hashed_password = undefined;
    user.salt = undefined;
    res.json(user);
  });
};
const remove = (req, res) => {
  let user = req.profile;
  user.remove((err, deletedUser) => {
    if (err) {
      return res.status(400).json({
        error: errorController.getErrorMessage(err)
      });
    }
    deletedUser.hashed_password = undefined;
    deletedUser.salt = undefined;
    res.json(deletedUser);
  });
};

const userById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User is not found!"
      });
    }
    req.profile = user;
    next();
  });
};

export default {
  create,
  list,
  read,
  update,
  remove,
  userById
};
