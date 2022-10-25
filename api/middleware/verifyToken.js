import jwt from "jsonwebtoken";

//TOKEN VERIFY
export const verifyToken = (req, res, next) => {
  let authHeader = req.headers["token"];
  console.log(authHeader);
  if (!authHeader) {
    return res.status(403).send({
      message: "No token provided!",
    });
  }
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.JWT_SEC, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }
    req.userId = decoded.id;
    // res.send(req.userId);
    next();
  });
};

import Users from "../models/userModel.js";

export const isAdmin = async (req, res, next) => {
  const user = await Users.findAll({
    where: {
      //decoded id
      id: req.userId,
    },
  });
  if (user[0].userrole === "admin") {
    next();
    return;
  } else {
    res.send("Require Admin Role");
  }
  next();
};
export const isModerator = async (req, res, next) => {
  const user = await Users.findAll({
    where: {
      id: req.userId,
    },
  });

  //   res.send(user);
  //   res.send(user[0].userrole);
  next();
};

export const checkDuplicateUsernameOrEmail = async (req, res, next) => {
  Users.findOne({
    where: {
      username: req.body.username,
    },
  }).then((user) => {
    if (user) {
      res.status(500).send({
        message: "Failed! Username is already in use!",
      });
      return;
    }
    // Email
    Users.findOne({
      where: {
        phone_number: req.body.phone_number,
      },
    }).then((user) => {
      if (user) {
        res.status(500).send({
          message: "Failed! Phone Number is already in use!",
        });
        return;
      }
      next();
    });
  });
};
import jwt from "jsonwebtoken";

//TOKEN VERIFY
export const verifyToken = (req, res, next) => {
  let authHeader = req.headers["token"];
  console.log(authHeader);
  if (!authHeader) {
    return res.status(403).send({
      message: "No token provided!",
    });
  }
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.JWT_SEC, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }
    req.userId = decoded.id;
    // res.send(req.userId);
    next();
  });
};

import Users from "../models/userModel.js";

export const isAdmin = async (req, res, next) => {
  const user = await Users.findAll({
    where: {
      //decoded id
      id: req.userId,
    },
  });
  if (user[0].userrole === "admin") {
    next();
    return;
  } else {
    res.send("Require Admin Role");
  }
  next();
};
export const isModerator = async (req, res, next) => {
  const user = await Users.findAll({
    where: {
      id: req.userId,
    },
  });

  //   res.send(user);
  //   res.send(user[0].userrole);
  next();
};

export const checkDuplicateUsernameOrEmail = async (req, res, next) => {
  Users.findOne({
    where: {
      username: req.body.username,
    },
  }).then((user) => {
    if (user) {
      res.status(500).send({
        message: "Failed! Username is already in use!",
      });
      return;
    }
    // Email
    Users.findOne({
      where: {
        phone_number: req.body.phone_number,
      },
    }).then((user) => {
      if (user) {
        res.status(500).send({
          message: "Failed! Phone Number is already in use!",
        });
        return;
      }
      next();
    });
  });
};
