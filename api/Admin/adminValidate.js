import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";

import TextContainer from "../TextContainer/TextContainer";
import Messages from "../Messages/Messages";
import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";

import "./Chat.css";

const ENDPOINT = "https://project-chat-application.herokuapp.com/";

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setRoom(room);
    setName(name);

    socket.emit("join", { name, room }, (error) => {
      if (error) {
        alert(error);
      }
    });
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });

    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar room={room} />
        <Messages messages={messages} name={name} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
      <TextContainer users={users} />
    </div>
  );
};

export default Chat;
import React from "react";

import onlineIcon from "../../icons/onlineIcon.png";
import closeIcon from "../../icons/closeIcon.png";

import "./InfoBar.css";

const InfoBar = ({ room }) => (
  <div className="infoBar">
    <div className="leftInnerContainer">
      <img className="onlineIcon" src={onlineIcon} alt="online icon" />
      <h3>{room}</h3>
    </div>
    <div className="rightInnerContainer">
      <a href="/">
        <img src={closeIcon} alt="close icon" />
      </a>
    </div>
  </div>
);

export default InfoBar;
import React from "react";

import "./Input.css";

const Input = ({ setMessage, sendMessage, message }) => (
  <form className="form">
    <input
      className="input"
      type="text"
      placeholder="Type a message..."
      value={message}
      onChange={({ target: { value } }) => setMessage(value)}
      onKeyPress={(event) =>
        event.key === "Enter" ? sendMessage(event) : null
      }
    />
    <button className="sendButton" onClick={(e) => sendMessage(e)}>
      Send
    </button>
  </form>
);

export default Input;

import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./Join.css";

export default function SignIn() {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Join</h1>
        <div>
          <input
            placeholder="Name"
            className="joinInput"
            type="text"
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div>
          <input
            placeholder="Room"
            className="joinInput mt-20"
            type="text"
            onChange={(event) => setRoom(event.target.value)}
          />
        </div>
        <Link
          onClick={(e) => (!name || !room ? e.preventDefault() : null)}
          to={`/chat?name=${name}&room=${room}`}
        >
          <button className={"button mt-20"} type="submit">
            Sign In
          </button>
        </Link>
      </div>
    </div>
  );
}
import React from "react";

import ScrollToBottom from "react-scroll-to-bottom";

import Message from "./Message/Message";

import "./Messages.css";

const Messages = ({ messages, name }) => (
  <ScrollToBottom className="messages">
    {messages.map((message, i) => (
      <div key={i}>
        <Message message={message} name={name} />
      </div>
    ))}
  </ScrollToBottom>
);

export default Messages;
import React from "react";

import onlineIcon from "../../icons/onlineIcon.png";

import "./TextContainer.css";

const TextContainer = ({ users }) => (
  <div className="textContainer">
    <div>
      <h1>
        Realtime Chat Application{" "}
        <span role="img" aria-label="emoji">
          💬
        </span>
      </h1>
      <h2>
        Created with React, Express, Node and Socket.IO{" "}
        <span role="img" aria-label="emoji">
          ❤️
        </span>
      </h2>
      <h2>
        Try it out right now!{" "}
        <span role="img" aria-label="emoji">
          ⬅️
        </span>
      </h2>
    </div>
    {users ? (
      <div>
        <h1>People currently chatting:</h1>
        <div className="activeContainer">
          <h2>
            {users.map(({ name }) => (
              <div key={name} className="activeItem">
                {name}
                <img alt="Online Icon" src={onlineIcon} />
              </div>
            ))}
          </h2>
        </div>
      </div>
    ) : null}
  </div>
);

export default TextContainer;
import { Sequelize } from "sequelize";

const db = new Sequelize("ecoAgri", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default db;

import Advertisements from "../models/advertisementModel.js";

//Advertisement SAVE
export const saveAdvertisement = async (req, res) => {
  try {
    const newAdvertisements = await Advertisements.create(req.body);
    res.status(201).json(newAdvertisements);
  } catch (error) {
    res.status(500).json(error);
  }
};

//ALL Advertisements
export const getAdvertisements = async (req, res) => {
  try {
    const advertisements = await Advertisements.findAll();
    res.status(200).json(advertisements);
  } catch (error) {
    res.status(500).json(error);
  }
};

// ONE Advertisement
export const getAdvertisement = async (req, res) => {
  try {
    const advertisements = await Advertisements.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(advertisements);
  } catch (error) {
    res.status(500).json(error);
  }
};

// UPDATE
export const updateAdvertisement = async (req, res) => {
  try {
    const Advertisement_update = await Advertisements.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    const advertisement = await Advertisements.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(advertisement);
  } catch (error) {
    res.status(500).json(error);
  }
};

//DELETE
export const deleteAdvertisement = async (req, res) => {
  try {
    const advertisement = await Advertisements.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json("Advertisement has been deleted...");
  } catch (error) {
    res.status(500).json(error);
  }
};

import Articles from "../models/articleModel.js";

//Article SAVE
export const saveArticle = async (req, res) => {
  try {
    const newArticles = await Articles.create(req.body);
    res.status(201).json(newArticles);
  } catch (error) {
    res.status(500).json(error);
  }
};

//ALL Articles
export const getArticles = async (req, res) => {
  try {
    const articles = await Articles.findAll();
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json(error);
  }
};

// ONE Article
export const getArticle = async (req, res) => {
  try {
    const articles = await Articles.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json(error);
  }
};

// UPDATE
export const updateArticle = async (req, res) => {
  try {
    const article_update = await Articles.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    const article = await Articles.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(article);
  } catch (error) {
    res.status(500).json(error);
  }
};

//DELETE
export const deleteArticle = async (req, res) => {
  try {
    const articles = await Articles.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json("Article has been deleted...");
  } catch (error) {
    res.status(500).json(error);
  }
};

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
    if (!match)
      return res
        .status(500)
        .json({ message: "Wrong Password or phone_number" });
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
  const { confPassword, password, ...other } = req.body;
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

  const userData = { ...other, password: hashPassword };
  console.log(userData);

  try {
    await Users.create(userData);
    res.send({ message: "Registration Successfull" });
  } catch (error) {
    // console.log(error);
    res.status(500).json(error);
  }
};
export const allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};
export const userBoard = (req, res) => {
  res.status(200).send("User Content.");
};
export const adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};
export const moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};

import Users from "../models/userModel.js";

export const Logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  //   res.send(refreshToken);

  if (!refreshToken) return res.sendStatus(204);
  const user = await Users.findAll({
    where: {
      refresh_token: refreshToken,
    },
  });
  if (!user[0]) return res.sendStatus(204);
  const userId = user[0].id;
  await Users.update(
    { refresh_token: null },
    {
      where: {
        id: userId,
      },
    }
  );
  res.clearCookie("refreshToken");
  return res.sendStatus(200);
};

import Orders from "../models/orderModel.js";
import Products from "../models/productsModel.js";
import Users from "../models/userModel.js";

//Order SAVE
export const saveOrder = async (req, res) => {
  try {
    const newOrders = await Orders.create(req.body);
    res.status(201).json(newOrders);
  } catch (error) {
    res.status(500).json(error);
  }
};

//ALL Orders
export const getOrders = async (req, res) => {
  try {
    // const orders = await Orders.findAll(
    //   {
    //     include: Users
    //   }
    // );
    const orders = await Orders.findAll({
      include: Users,
    });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json(error);
  }
};

// ONE Order
export const getOrder = async (req, res) => {
  try {
    const orders = await Orders.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json(error);
  }
};

// UPDATE
export const updateOrder = async (req, res) => {
  try {
    const orders = await Orders.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json(error);
  }
};

//DELETE
export const deleteOrder = async (req, res) => {
  try {
    const orders = await Orders.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json("Order has been deleted...");
  } catch (error) {
    res.status(500).json(error);
  }
};
import Payments from "../models/paymentModel.js";

//Payment SAVE
export const savePayment = async (req, res) => {
  try {
    const newPayments = await Payments.create(req.body);
    res.status(201).json(newPayments);
  } catch (error) {
    res.status(500).json(error);
  }
};

//ALL Payments
export const getPayments = async (req, res) => {
  try {
    const payments = await Payments.findAll();
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json(error);
  }
};

// ONE Payment
export const getPayment = async (req, res) => {
  try {
    const payments = await Payments.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json(error);
  }
};

// UPDATE
export const updatePayment = async (req, res) => {
  try {
    const payments = await Payments.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json(error);
  }
};

//DELETE
export const deletePayment = async (req, res) => {
  try {
    const payments = await Payments.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json("Payment has been deleted...");
  } catch (error) {
    res.status(500).json(error);
  }
};
import Products from "../models/productsModel.js";
import ProductImage from "../models/productImagesModel.js";

//PRODUCT SAVE
export const saveProduct = async (req, res) => {
  // const { productImage, ...others } = req.body;
  try {
    const newProducts = await Products.create(req.body);
    // const newProductImages = await ProductImage.create(productImage);
    // const result = await newProducts.addProductImage(newProductImages, { through: { selfGranted: false } });

    res.status(201).json(newProducts);

    // req.body.productImage.map(async (item)=>{
    //   try {
    //     const newProductImages = await ProductImage.create({
    //       productImages:item,
    //       productId: req.body.id
    //     });
    //     res.status(201).json({...newProducts,...newProductImages});
    //   } catch (error) {
    //     res.status(500).json(error);
    //   }
    // });
    // try {
    //   const products = await Products.findAll();
    //   res.status(201).json(products);
    // } catch (error) {
    //   res.status(501).json(error);
    // }
  } catch (error) {
    res.status(500).json(error);
  }
};

//ALL PRODUCTS
export const getProducts = async (req, res) => {
  try {
    // const users = await Users.findAll({
    //   attributes: ["id", "username", "email", "userrole", "refresh_token"],
    // });
    const products = await Products.findAll();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getProductsWithProductImage = async (req, res) => {
  try {
    // const users = await Users.findAll({
    //   attributes: ["id", "username", "email", "userrole", "refresh_token"],
    // });
    const products = await Products.findAll({
      include: ["productImage"],
    });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error);
  }
};

// ONE PRODUCT
export const getProduct = async (req, res) => {
  try {
    const products = await Products.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error);
  }
};

// UPDATE
export const updateProduct = async (req, res) => {
  try {
    // const product_update = await Products.update(
    //   {
    //     address: "466",
    //   },
    //   {
    //     where: {
    //       id: req.params.id,
    //     },
    //   }
    // );
    const products = await Products.findOne({
      where: {
        id: req.params.id,
      },
    });
    // const users = await Users.findOrCreate(
    //   {
    //     where: {
    //       id: req.params.id,
    //     },
    //     defaults: {
    //       address: 'Technical Lead JavaScript'
    //     }
    //   }
    // );
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error);
  }
};

//DELETE
export const deleteProduct = async (req, res) => {
  try {
    const products = await Products.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json("User has been deleted...");
  } catch (error) {
    res.status(500).json(error);
  }
};
import Users from "../models/userModel.js";

//ALL USERS
export const getUsers = async (req, res) => {
  try {
    // const users = await Users.findAll({
    //   attributes: ["id", "username", "email", "userrole", "refresh_token"],
    // });
    const users = await Users.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};

//ONE USER
export const getUser = async (req, res) => {
  try {
    const users = await Users.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};

//UPDATE
export const updateUser = async (req, res) => {
  try {
    const user_update = await Users.update(
      {
        address: "466",
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    const users = await Users.findOne({
      where: {
        id: req.params.id,
      },
    });
    // const users = await Users.findOrCreate(
    //   {
    //     where: {
    //       id: req.params.id,
    //     },
    //     defaults: {
    //       address: 'Technical Lead JavaScript'
    //     }
    //   }
    // );
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};

//DELETE
export const deleteUser = async (req, res) => {
  try {
    const users = await Users.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json("User has been deleted...");
  } catch (error) {
    res.status(500).json(error);
  }
};
