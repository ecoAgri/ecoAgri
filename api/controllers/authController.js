import Users from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const Login = async (req, res) => {
  const { phone_number, password } = req.body;
  console.log("Login phone_number---- " + phone_number);
  try {
    //find the user in users table
    const userphone_number = await Users.findOne({
      where: {
        phone_number: phone_number,
      },
    });

    if (userphone_number === null)
      return res.json({ message: "Wrong Password or phone_number" });

    const match = await bcrypt.compare(password, userphone_number.password);
    // res.send(match);
    if (!match) return res.status(500).json({ message: "Wrong Password or phone_number" });
    const userId = userphone_number.id;

    // const accessToken = jwt.sign({ id: userId }, "SECRET_ACCESS", {
    //   expiresIn: "60s",
    // });
    const accessToken = jwt.sign(
      {
        id: userId,
      },
      process.env.JWT_SEC,
      { algorithm: "HS256", expiresIn: "3d" }
    );
    const refreshToken = jwt.sign({ id: userId }, "SECRET_REFRESH", {
      expiresIn: "86400s",
    });

    await Users.update(
      {
        refresh_token: refreshToken,
      },
      {
        where: {
          id: userId,
        },
      }
    );
    const updateUser = await Users.findOne({
      where: {
        id: userId,
      },
    });

    const response = { ...updateUser.dataValues, accessToken: accessToken };
    res.status(200).json(response);
  } catch (err) {
    // res.send({ message: "phone_number is invalid" });
    res.status(500).json(err);
  }
};

//register
export const Register = async (req, res) => {
  const { confPassword,password, ...other } = req.body;
  if (password !== confPassword)
    return res.send({
      message: "Password and Confirm Password does not match",
    });
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);
  if (hashPassword) {
    console.log("Successfull hashing");
  } else {
    console.log("Error in hashing");
  }

  const userData = { ...other, password:hashPassword};
  console.log(userData);

  try {
    await Users.create(userData);
    res.send({ message: "Registration Successfull" });
  } catch (error) {
    // console.log(error);
    res.status(500).json(error);
  }
};
