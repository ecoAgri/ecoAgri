import axios from "axios";

const url = "https://covid19.mathdro.id/api";

export const fetchData = async (country) => {
  let changeableUrl = url;

  if (country) {
    changeableUrl = `${url}/countries/${country}`;
  }

  try {
    const {
      data: { confirmed, recovered, deaths, lastUpdate },
    } = await axios.get(changeableUrl);

    return { confirmed, recovered, deaths, lastUpdate };
  } catch (error) {
    return error;
  }
};

// export const fetchDailyData = async () => {
//   try {
//     const { data } = await axios.get(`${url}/daily`);

//     return data.map(({ confirmed, deaths, reportDate: date }) => ({ confirmed: confirmed.total, deaths: deaths.total, date }));
//   } catch (error) {
//     return error;
//   }
// };

// Instead of Global, it fetches the daily data for the US
export const fetchDailyData = async () => {
  try {
    const { data } = await axios.get(
      "https://api.covidtracking.com/v1/us/daily.json"
    );

    return data.map(({ positive, recovered, death, dateChecked: date }) => ({
      confirmed: positive,
      recovered,
      deaths: death,
      date,
    }));
  } catch (error) {
    return error;
  }
};

export const fetchCountries = async () => {
  try {
    const {
      data: { countries },
    } = await axios.get(`${url}/countries`);

    return countries.map((country) => country.name);
  } catch (error) {
    return error;
  }
};

import React from "react";
import { Typography, Grid } from "@material-ui/core";
import CardComponent from "./Card/Card";
import styles from "./Cards.module.css";

const Info = ({ data: { confirmed, recovered, deaths, lastUpdate } }) => {
  if (!confirmed) {
    return "Loading...";
  }

  return (
    <div className={styles.container}>
      <Typography gutterBottom variant="h4" component="h2">
        Global
      </Typography>
      <Grid container spacing={3} justify="center">
        <CardComponent
          className={styles.infected}
          cardTitle="Infected"
          value={confirmed.value}
          lastUpdate={lastUpdate}
          cardSubtitle="Number of active cases from COVID-19."
        />
        <CardComponent
          className={styles.recovered}
          cardTitle="Recovered"
          value={recovered.value}
          lastUpdate={lastUpdate}
          cardSubtitle="Number of recoveries from COVID-19."
        />
        <CardComponent
          className={styles.deaths}
          cardTitle="Deaths"
          value={deaths.value}
          lastUpdate={lastUpdate}
          cardSubtitle="Number of deaths caused by COVID-19."
        />
      </Grid>
    </div>
  );
};

export default Info;

import React from "react";
import { Card, CardContent, Typography, Grid } from "@material-ui/core";
import CountUp from "react-countup";
import cx from "classnames";

import styles from "./Card.module.css";

const CardComponent = ({
  className,
  cardTitle,
  value,
  lastUpdate,
  cardSubtitle,
}) => (
  <Grid
    item
    xs={12}
    md={3}
    component={Card}
    className={cx(styles.card, className)}
  >
    <CardContent>
      <Typography color="textSecondary" gutterBottom>
        {cardTitle}
      </Typography>
      <Typography variant="h5" component="h2">
        <CountUp start={0} end={value} duration={2.75} separator="," />
      </Typography>
      <Typography color="textSecondary">
        {new Date(lastUpdate).toDateString()}
      </Typography>
      <Typography variant="body2" component="p">
        {cardSubtitle}
      </Typography>
    </CardContent>
  </Grid>
);

export default CardComponent;
import React, { useState, useEffect } from "react";
import { Line, Bar } from "react-chartjs-2";

import { fetchDailyData } from "../../api";

import styles from "./Chart.module.css";

const Chart = ({ data: { confirmed, recovered, deaths }, country }) => {
  const [dailyData, setDailyData] = useState({});

  useEffect(() => {
    const fetchMyAPI = async () => {
      const initialDailyData = await fetchDailyData();

      setDailyData(initialDailyData);
    };

    fetchMyAPI();
  }, []);

  const barChart = confirmed ? (
    <Bar
      data={{
        labels: ["Infected", "Recovered", "Deaths"],
        datasets: [
          {
            label: "People",
            backgroundColor: [
              "rgba(0, 0, 255, 0.5)",
              "rgba(0, 255, 0, 0.5)",
              "rgba(255, 0, 0, 0.5)",
            ],
            data: [confirmed.value, recovered.value, deaths.value],
          },
        ],
      }}
      options={{
        legend: { display: false },
        title: { display: true, text: `Current state in ${country}` },
      }}
    />
  ) : null;

  const lineChart = dailyData[0] ? (
    <Line
      data={{
        labels: dailyData.map(({ date }) =>
          new Date(date).toLocaleDateString()
        ),
        datasets: [
          {
            data: dailyData.map((data) => data.confirmed),
            label: "Infected",
            borderColor: "#3333ff",
            fill: true,
          },
          {
            data: dailyData.map((data) => data.deaths),
            label: "Deaths",
            borderColor: "red",
            backgroundColor: "rgba(255, 0, 0, 0.5)",
            fill: true,
          },
          {
            data: dailyData.map((data) => data.recovered),
            label: "Recovered",
            borderColor: "green",
            backgroundColor: "rgba(0, 255, 0, 0.5)",
            fill: true,
          },
        ],
      }}
    />
  ) : null;

  return (
    <div className={styles.container}>{country ? barChart : lineChart}</div>
  );
};

export default Chart;

import React, { useState, useEffect } from "react";
import { NativeSelect, FormControl } from "@material-ui/core";

import { fetchCountries } from "../../api";

import styles from "./CountryPicker.module.css";

const Countries = ({ handleCountryChange }) => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      setCountries(await fetchCountries());
    };

    fetchAPI();
  }, []);

  return (
    <FormControl className={styles.formControl}>
      <NativeSelect
        defaultValue=""
        onChange={(e) => handleCountryChange(e.target.value)}
      >
        <option value="">United States</option>
        {countries.map((country, i) => (
          <option key={i} value={country}>
            {country}
          </option>
        ))}
      </NativeSelect>
    </FormControl>
  );
};

export default Countries;

import React from "react";

import { Cards, CountryPicker, Chart } from "./components";
import { fetchData } from "./api/";
import styles from "./App.module.css";

import image from "./images/image.png";

class App extends React.Component {
  state = {
    data: {},
    country: "",
  };

  async componentDidMount() {
    const data = await fetchData();

    this.setState({ data });
  }

  handleCountryChange = async (country) => {
    const data = await fetchData(country);

    this.setState({ data, country: country });
  };

  render() {
    const { data, country } = this.state;

    return (
      <div className={styles.container}>
        <img className={styles.image} src={image} alt="COVID-19" />
        <Cards data={data} />
        <CountryPicker handleCountryChange={this.handleCountryChange} />
        <Chart data={data} country={country} />
      </div>
    );
  }
}

export default App;

import React, { Component } from "react";
import Title from "../Title";
import CartColumns from "./CartColumns";
import EmptyCart from "./EmptyCart";
import { ProductConsumer } from "../../context";
import CartList from "./CartList";
import CartTotals from "./CartTotals";

export default class Store extends Component {
  render() {
    return (
      <section>
        <ProductConsumer>
          {(value) => {
            const { cart } = value;
            if (cart.length > 0) {
              return (
                <React.Fragment>
                  <Title name="your" title="cart" />
                  <CartColumns />
                  <CartList value={value} />
                  <CartTotals value={value} history={this.props.history} />
                </React.Fragment>
              );
            } else {
              return <EmptyCart />;
            }
          }}
        </ProductConsumer>
      </section>
    );
  }
}

import React from "react";

export default function CartColumns() {
  return (
    <div className="container-fluid text-center d-none d-lg-block">
      <div className="row">
        <div className="col-10 mx-auto col-lg-2">
          <p className="text-uppercase">products</p>
        </div>
        <div className="col-10 mx-auto col-lg-2">
          <p className="text-uppercase">name of product</p>
        </div>
        <div className="col-10 mx-auto col-lg-2">
          <p className="text-uppercase">price</p>
        </div>
        <div className="col-10 mx-auto col-lg-2">
          <p className="text-uppercase">quantity</p>
        </div>
        <div className="col-10 mx-auto col-lg-2">
          <p className="text-uppercase">remove</p>
        </div>
        <div className="col-10 mx-auto col-lg-2">
          <p className="text-uppercase">total</p>
        </div>
      </div>
    </div>
  );
}

import React from "react";

export default function CartItem({ item, value }) {
  const { id, title, img, price, total, count } = item;
  const { increment, decrement, removeItem } = value;
  return (
    <div className="row my-2 text-capitalize text-center">
      <div className="col-10 mx-auto col-lg-2">
        <img
          src={img}
          style={{ width: "5rem", height: "5rem" }}
          className="img-fluid"
          alt="product"
        />
      </div>
      <div className="col-10 mx-auto col-lg-2">
        <span className="d-lg-none">product : </span>
        {title}
      </div>
      <div className="col-10 mx-auto col-lg-2">
        <span className="d-lg-none">price : </span>
        {price}
      </div>
      <div className="col-10 mx-auto col-lg-2 my-2 my-lg-2-0">
        <div className="d-flex justify-content-center">
          <div>
            <span className="btn btn-black mx-1" onClick={() => decrement(id)}>
              -
            </span>
            <span className="btn btn-black mx-1">{count}</span>
            <span className="btn btn-black mx-1" onClick={() => increment(id)}>
              +
            </span>
          </div>
        </div>
      </div>
      {/**/}
      <div className="col-10 mx-auto col-lg-2">
        <div className="cart-icon" onClick={() => removeItem(id)}>
          <i className="fas fa-trash"></i>
        </div>
      </div>
      <div className="col-10 mx-auto col-lg-2">
        <strong>item total : $ {total}</strong>
      </div>
    </div>
  );
}

import React from "react";
import CartItem from "./CartItem";

export default function CartList({ value }) {
  const { cart } = value;

  return (
    <div className="container-fluid">
      {cart.map((item) => {
        return <CartItem key={item.id} item={item} value={value} />;
      })}
    </div>
  );
}

import React from "react";
import { Link } from "react-router-dom";

export default function CartTotals({ value }) {
  const { cartSubTotal, cartTax, cartTotal, clearCart } = value;
  return (
    <React.Fragment>
      <div className="container">
        <div className="row">
          <div className="col-10 mt-2 ml-sm-5 ml-md-auto col-sm-8 text-capitalize text-right">
            <Link to="/">
              <button
                className="btn btn-outline-danger text-uppercase mb-3 px-5"
                type="button"
                onClick={() => {
                  clearCart();
                }}
              >
                clear cart
              </button>
            </Link>
            <h5>
              <span className="text-title">subtotal :</span>
              <strong>{cartSubTotal}</strong>
            </h5>
            <h5>
              <span className="text-title">subtotal :</span>
              <strong>{cartTax}</strong>
            </h5>
            <h5>
              <span className="text-title">subtotal :</span>
              <strong>{cartTotal}</strong>
            </h5>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
import React from "react";

export default function EmptyCart() {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-10 mx-auto text-center text-title">
          <h1>Your cart is currently empty</h1>
        </div>
      </div>
    </div>
  );
}
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
import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Advertisements = db.define(
  "advertisements",
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
    },
    des: {
      type: DataTypes.STRING,
    },
    image1: {
      type: DataTypes.STRING,
    },
    image2: {
      type: DataTypes.STRING,
    },
    image3: {
      type: DataTypes.STRING,
    },

    category: {
      type: DataTypes.STRING,
    },

    isAccept: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    createDate: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW,
    },
    createTime: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    freezeTableName: true,
  }
);

(async () => {
  await db
    .sync()
    .then(() => {
      console.log("Table created");
    })
    .catch((err) => {
      console.log(err);
    });
})();

export default Advertisements;
import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Articles = db.define(
  "articles",
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
    },
    des: {
      type: DataTypes.STRING,
    },
    image1: {
      type: DataTypes.STRING,
    },
    image2: {
      type: DataTypes.STRING,
    },
    image3: {
      type: DataTypes.STRING,
    },

    category: {
      type: DataTypes.STRING,
    },

    isAccept: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    createDate: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW,
    },
    createTime: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    freezeTableName: true,
  }
);

(async () => {
  await db
    .sync()
    .then(() => {
      console.log("Table created");
    })
    .catch((err) => {
      console.log(err);
    });
})();

export default Articles;
import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Users from "./userModel.js";

const { DataTypes } = Sequelize;

const Orders = db.define(
  "orders",
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    unitPrice: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    fieldAddress: {
      type: DataTypes.STRING,
    },
    manuDate: {
      type: DataTypes.DATEONLY,
    },
    expireDate: {
      type: DataTypes.DATEONLY,
    },
    status: {
      type: DataTypes.STRING,
    },
    isAccept: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    createDate: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW,
    },
    location: {
      type: DataTypes.STRING,
    },
    isDonate: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    freezeTableName: true,
    // include: Users
  }
);
// Orders.belongsTo(Users);

(async () => {
  await db
    .sync()
    .then(() => {
      console.log("Table created");
    })
    .catch((err) => {
      console.log(err);
    });
})();

export default Orders;
import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Products from "./productsModel.js";

const { DataTypes } = Sequelize;

const ProductImage = db.define(
  "productImage",
  {
    productImages: {
      type: DataTypes.STRING,
      allowNull: true,
      //   defaultValue: DataTypes.UUIDV4
    },
  },
  {
    freezeTableName: true,
  }
);

// ProductImage.belongsTo(Products);
// products.belongsToMany(productImage, { through: 'ProductProductImage' });

(async () => {
  await db.sync();
})();

export default ProductImage;
import { Sequelize } from "sequelize";
import db from "../config/database.js";
import ProductImage from "./productImagesModel.js";

const { DataTypes } = Sequelize;

const Products = db.define(
  "products",
  {
    productName: {
      type: DataTypes.STRING,
    },
    productCategory: {
      type: DataTypes.STRING,
    },
    weight: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    unitPrice: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    fieldAddress: {
      type: DataTypes.STRING,
    },
    manuDate: {
      type: DataTypes.DATEONLY,
    },
    expireDate: {
      type: DataTypes.DATEONLY,
    },
    status: {
      type: DataTypes.STRING,
    },
    isAccept: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    createDate: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW,
    },
    location: {
      type: DataTypes.STRING,
    },
    isDonate: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    image1: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image3: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image4: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
  }
);

// Products.hasMany(ProductImage);
// products.belongsToMany(productImage, { through: 'ProductProductImage' });

(async () => {
  await db
    .sync()
    .then(() => {
      console.log("Table created");
    })
    .catch((err) => {
      console.log(err);
    });
})();

export default Products;
import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Users = db.define(
  "users",
  {
    username: {
      type: DataTypes.STRING,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    userrole: {
      type: DataTypes.STRING,
    },
    phone_number: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING,
    },
    city: {
      type: DataTypes.STRING,
    },
    town: {
      type: DataTypes.STRING,
    },
    img: {
      type: DataTypes.STRING,
    },
    registerNo: {
      type: DataTypes.STRING,
    },
    charityFileLocation: {
      type: DataTypes.STRING,
    },
    isAccept: {
      type: DataTypes.BOOLEAN, //user is charity organizer then default value should be false.. then moderator accept the request then this value updated.
      defaultValue: true,
    },
    isActivate: {
      type: DataTypes.BOOLEAN, //admin can be ban this member
      defaultValue: true,
    },
    isDonate: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    refresh_token: {
      type: DataTypes.TEXT,
    },
  },
  {
    freezeTableName: true,
  }
);

(async () => {
  await db.sync();
})();

export default Users;
import axios from "axios";

const url = "https://covid19.mathdro.id/api";

export const fetchData = async (country) => {
  let changeableUrl = url;

  if (country) {
    changeableUrl = `${url}/countries/${country}`;
  }

  try {
    const {
      data: { confirmed, recovered, deaths, lastUpdate },
    } = await axios.get(changeableUrl);

    return { confirmed, recovered, deaths, lastUpdate };
  } catch (error) {
    return error;
  }
};

// export const fetchDailyData = async () => {
//   try {
//     const { data } = await axios.get(`${url}/daily`);

//     return data.map(({ confirmed, deaths, reportDate: date }) => ({ confirmed: confirmed.total, deaths: deaths.total, date }));
//   } catch (error) {
//     return error;
//   }
// };

// Instead of Global, it fetches the daily data for the US
export const fetchDailyData = async () => {
  try {
    const { data } = await axios.get(
      "https://api.covidtracking.com/v1/us/daily.json"
    );

    return data.map(({ positive, recovered, death, dateChecked: date }) => ({
      confirmed: positive,
      recovered,
      deaths: death,
      date,
    }));
  } catch (error) {
    return error;
  }
};

export const fetchCountries = async () => {
  try {
    const {
      data: { countries },
    } = await axios.get(`${url}/countries`);

    return countries.map((country) => country.name);
  } catch (error) {
    return error;
  }
};

import React from "react";
import { Typography, Grid } from "@material-ui/core";
import CardComponent from "./Card/Card";
import styles from "./Cards.module.css";

const Info = ({ data: { confirmed, recovered, deaths, lastUpdate } }) => {
  if (!confirmed) {
    return "Loading...";
  }

  return (
    <div className={styles.container}>
      <Typography gutterBottom variant="h4" component="h2">
        Global
      </Typography>
      <Grid container spacing={3} justify="center">
        <CardComponent
          className={styles.infected}
          cardTitle="Infected"
          value={confirmed.value}
          lastUpdate={lastUpdate}
          cardSubtitle="Number of active cases from COVID-19."
        />
        <CardComponent
          className={styles.recovered}
          cardTitle="Recovered"
          value={recovered.value}
          lastUpdate={lastUpdate}
          cardSubtitle="Number of recoveries from COVID-19."
        />
        <CardComponent
          className={styles.deaths}
          cardTitle="Deaths"
          value={deaths.value}
          lastUpdate={lastUpdate}
          cardSubtitle="Number of deaths caused by COVID-19."
        />
      </Grid>
    </div>
  );
};

export default Info;

import React from "react";
import { Card, CardContent, Typography, Grid } from "@material-ui/core";
import CountUp from "react-countup";
import cx from "classnames";

import styles from "./Card.module.css";

const CardComponent = ({
  className,
  cardTitle,
  value,
  lastUpdate,
  cardSubtitle,
}) => (
  <Grid
    item
    xs={12}
    md={3}
    component={Card}
    className={cx(styles.card, className)}
  >
    <CardContent>
      <Typography color="textSecondary" gutterBottom>
        {cardTitle}
      </Typography>
      <Typography variant="h5" component="h2">
        <CountUp start={0} end={value} duration={2.75} separator="," />
      </Typography>
      <Typography color="textSecondary">
        {new Date(lastUpdate).toDateString()}
      </Typography>
      <Typography variant="body2" component="p">
        {cardSubtitle}
      </Typography>
    </CardContent>
  </Grid>
);

export default CardComponent;
import React, { useState, useEffect } from "react";
import { Line, Bar } from "react-chartjs-2";

import { fetchDailyData } from "../../api";

import styles from "./Chart.module.css";

const Chart = ({ data: { confirmed, recovered, deaths }, country }) => {
  const [dailyData, setDailyData] = useState({});

  useEffect(() => {
    const fetchMyAPI = async () => {
      const initialDailyData = await fetchDailyData();

      setDailyData(initialDailyData);
    };

    fetchMyAPI();
  }, []);

  const barChart = confirmed ? (
    <Bar
      data={{
        labels: ["Infected", "Recovered", "Deaths"],
        datasets: [
          {
            label: "People",
            backgroundColor: [
              "rgba(0, 0, 255, 0.5)",
              "rgba(0, 255, 0, 0.5)",
              "rgba(255, 0, 0, 0.5)",
            ],
            data: [confirmed.value, recovered.value, deaths.value],
          },
        ],
      }}
      options={{
        legend: { display: false },
        title: { display: true, text: `Current state in ${country}` },
      }}
    />
  ) : null;

  const lineChart = dailyData[0] ? (
    <Line
      data={{
        labels: dailyData.map(({ date }) =>
          new Date(date).toLocaleDateString()
        ),
        datasets: [
          {
            data: dailyData.map((data) => data.confirmed),
            label: "Infected",
            borderColor: "#3333ff",
            fill: true,
          },
          {
            data: dailyData.map((data) => data.deaths),
            label: "Deaths",
            borderColor: "red",
            backgroundColor: "rgba(255, 0, 0, 0.5)",
            fill: true,
          },
          {
            data: dailyData.map((data) => data.recovered),
            label: "Recovered",
            borderColor: "green",
            backgroundColor: "rgba(0, 255, 0, 0.5)",
            fill: true,
          },
        ],
      }}
    />
  ) : null;

  return (
    <div className={styles.container}>{country ? barChart : lineChart}</div>
  );
};

export default Chart;

import React, { useState, useEffect } from "react";
import { NativeSelect, FormControl } from "@material-ui/core";

import { fetchCountries } from "../../api";

import styles from "./CountryPicker.module.css";

const Countries = ({ handleCountryChange }) => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      setCountries(await fetchCountries());
    };

    fetchAPI();
  }, []);

  return (
    <FormControl className={styles.formControl}>
      <NativeSelect
        defaultValue=""
        onChange={(e) => handleCountryChange(e.target.value)}
      >
        <option value="">United States</option>
        {countries.map((country, i) => (
          <option key={i} value={country}>
            {country}
          </option>
        ))}
      </NativeSelect>
    </FormControl>
  );
};

export default Countries;

import React from "react";

import { Cards, CountryPicker, Chart } from "./components";
import { fetchData } from "./api/";
import styles from "./App.module.css";

import image from "./images/image.png";

class App extends React.Component {
  state = {
    data: {},
    country: "",
  };

  async componentDidMount() {
    const data = await fetchData();

    this.setState({ data });
  }

  handleCountryChange = async (country) => {
    const data = await fetchData(country);

    this.setState({ data, country: country });
  };

  render() {
    const { data, country } = this.state;

    return (
      <div className={styles.container}>
        <img className={styles.image} src={image} alt="COVID-19" />
        <Cards data={data} />
        <CountryPicker handleCountryChange={this.handleCountryChange} />
        <Chart data={data} country={country} />
      </div>
    );
  }
}

export default App;

import React, { Component } from "react";
import Title from "../Title";
import CartColumns from "./CartColumns";
import EmptyCart from "./EmptyCart";
import { ProductConsumer } from "../../context";
import CartList from "./CartList";
import CartTotals from "./CartTotals";

export default class Store extends Component {
  render() {
    return (
      <section>
        <ProductConsumer>
          {(value) => {
            const { cart } = value;
            if (cart.length > 0) {
              return (
                <React.Fragment>
                  <Title name="your" title="cart" />
                  <CartColumns />
                  <CartList value={value} />
                  <CartTotals value={value} history={this.props.history} />
                </React.Fragment>
              );
            } else {
              return <EmptyCart />;
            }
          }}
        </ProductConsumer>
      </section>
    );
  }
}

import React from "react";

export default function CartColumns() {
  return (
    <div className="container-fluid text-center d-none d-lg-block">
      <div className="row">
        <div className="col-10 mx-auto col-lg-2">
          <p className="text-uppercase">products</p>
        </div>
        <div className="col-10 mx-auto col-lg-2">
          <p className="text-uppercase">name of product</p>
        </div>
        <div className="col-10 mx-auto col-lg-2">
          <p className="text-uppercase">price</p>
        </div>
        <div className="col-10 mx-auto col-lg-2">
          <p className="text-uppercase">quantity</p>
        </div>
        <div className="col-10 mx-auto col-lg-2">
          <p className="text-uppercase">remove</p>
        </div>
        <div className="col-10 mx-auto col-lg-2">
          <p className="text-uppercase">total</p>
        </div>
      </div>
    </div>
  );
}

import React from "react";

export default function CartItem({ item, value }) {
  const { id, title, img, price, total, count } = item;
  const { increment, decrement, removeItem } = value;
  return (
    <div className="row my-2 text-capitalize text-center">
      <div className="col-10 mx-auto col-lg-2">
        <img
          src={img}
          style={{ width: "5rem", height: "5rem" }}
          className="img-fluid"
          alt="product"
        />
      </div>
      <div className="col-10 mx-auto col-lg-2">
        <span className="d-lg-none">product : </span>
        {title}
      </div>
      <div className="col-10 mx-auto col-lg-2">
        <span className="d-lg-none">price : </span>
        {price}
      </div>
      <div className="col-10 mx-auto col-lg-2 my-2 my-lg-2-0">
        <div className="d-flex justify-content-center">
          <div>
            <span className="btn btn-black mx-1" onClick={() => decrement(id)}>
              -
            </span>
            <span className="btn btn-black mx-1">{count}</span>
            <span className="btn btn-black mx-1" onClick={() => increment(id)}>
              +
            </span>
          </div>
        </div>
      </div>
      {/**/}
      <div className="col-10 mx-auto col-lg-2">
        <div className="cart-icon" onClick={() => removeItem(id)}>
          <i className="fas fa-trash"></i>
        </div>
      </div>
      <div className="col-10 mx-auto col-lg-2">
        <strong>item total : $ {total}</strong>
      </div>
    </div>
  );
}

import React from "react";
import CartItem from "./CartItem";

export default function CartList({ value }) {
  const { cart } = value;

  return (
    <div className="container-fluid">
      {cart.map((item) => {
        return <CartItem key={item.id} item={item} value={value} />;
      })}
    </div>
  );
}

import React from "react";
import { Link } from "react-router-dom";

export default function CartTotals({ value }) {
  const { cartSubTotal, cartTax, cartTotal, clearCart } = value;
  return (
    <React.Fragment>
      <div className="container">
        <div className="row">
          <div className="col-10 mt-2 ml-sm-5 ml-md-auto col-sm-8 text-capitalize text-right">
            <Link to="/">
              <button
                className="btn btn-outline-danger text-uppercase mb-3 px-5"
                type="button"
                onClick={() => {
                  clearCart();
                }}
              >
                clear cart
              </button>
            </Link>
            <h5>
              <span className="text-title">subtotal :</span>
              <strong>{cartSubTotal}</strong>
            </h5>
            <h5>
              <span className="text-title">subtotal :</span>
              <strong>{cartTax}</strong>
            </h5>
            <h5>
              <span className="text-title">subtotal :</span>
              <strong>{cartTotal}</strong>
            </h5>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
import React from "react";

export default function EmptyCart() {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-10 mx-auto text-center text-title">
          <h1>Your cart is currently empty</h1>
        </div>
      </div>
    </div>
  );
}
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
import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Advertisements = db.define(
  "advertisements",
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
    },
    des: {
      type: DataTypes.STRING,
    },
    image1: {
      type: DataTypes.STRING,
    },
    image2: {
      type: DataTypes.STRING,
    },
    image3: {
      type: DataTypes.STRING,
    },

    category: {
      type: DataTypes.STRING,
    },

    isAccept: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    createDate: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW,
    },
    createTime: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    freezeTableName: true,
  }
);

(async () => {
  await db
    .sync()
    .then(() => {
      console.log("Table created");
    })
    .catch((err) => {
      console.log(err);
    });
})();

export default Advertisements;
import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Articles = db.define(
  "articles",
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
    },
    des: {
      type: DataTypes.STRING,
    },
    image1: {
      type: DataTypes.STRING,
    },
    image2: {
      type: DataTypes.STRING,
    },
    image3: {
      type: DataTypes.STRING,
    },

    category: {
      type: DataTypes.STRING,
    },

    isAccept: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    createDate: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW,
    },
    createTime: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    freezeTableName: true,
  }
);

(async () => {
  await db
    .sync()
    .then(() => {
      console.log("Table created");
    })
    .catch((err) => {
      console.log(err);
    });
})();

export default Articles;
import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Users from "./userModel.js";

const { DataTypes } = Sequelize;

const Orders = db.define(
  "orders",
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    unitPrice: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    fieldAddress: {
      type: DataTypes.STRING,
    },
    manuDate: {
      type: DataTypes.DATEONLY,
    },
    expireDate: {
      type: DataTypes.DATEONLY,
    },
    status: {
      type: DataTypes.STRING,
    },
    isAccept: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    createDate: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW,
    },
    location: {
      type: DataTypes.STRING,
    },
    isDonate: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    freezeTableName: true,
    // include: Users
  }
);
// Orders.belongsTo(Users);

(async () => {
  await db
    .sync()
    .then(() => {
      console.log("Table created");
    })
    .catch((err) => {
      console.log(err);
    });
})();

export default Orders;
import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Products from "./productsModel.js";

const { DataTypes } = Sequelize;

const ProductImage = db.define(
  "productImage",
  {
    productImages: {
      type: DataTypes.STRING,
      allowNull: true,
      //   defaultValue: DataTypes.UUIDV4
    },
  },
  {
    freezeTableName: true,
  }
);

// ProductImage.belongsTo(Products);
// products.belongsToMany(productImage, { through: 'ProductProductImage' });

(async () => {
  await db.sync();
})();

export default ProductImage;
import { Sequelize } from "sequelize";
import db from "../config/database.js";
import ProductImage from "./productImagesModel.js";

const { DataTypes } = Sequelize;

const Products = db.define(
  "products",
  {
    productName: {
      type: DataTypes.STRING,
    },
    productCategory: {
      type: DataTypes.STRING,
    },
    weight: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    unitPrice: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    fieldAddress: {
      type: DataTypes.STRING,
    },
    manuDate: {
      type: DataTypes.DATEONLY,
    },
    expireDate: {
      type: DataTypes.DATEONLY,
    },
    status: {
      type: DataTypes.STRING,
    },
    isAccept: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    createDate: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW,
    },
    location: {
      type: DataTypes.STRING,
    },
    isDonate: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    image1: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image3: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image4: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
  }
);

// Products.hasMany(ProductImage);
// products.belongsToMany(productImage, { through: 'ProductProductImage' });

(async () => {
  await db
    .sync()
    .then(() => {
      console.log("Table created");
    })
    .catch((err) => {
      console.log(err);
    });
})();

export default Products;
import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Users = db.define(
  "users",
  {
    username: {
      type: DataTypes.STRING,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    userrole: {
      type: DataTypes.STRING,
    },
    phone_number: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING,
    },
    city: {
      type: DataTypes.STRING,
    },
    town: {
      type: DataTypes.STRING,
    },
    img: {
      type: DataTypes.STRING,
    },
    registerNo: {
      type: DataTypes.STRING,
    },
    charityFileLocation: {
      type: DataTypes.STRING,
    },
    isAccept: {
      type: DataTypes.BOOLEAN, //user is charity organizer then default value should be false.. then moderator accept the request then this value updated.
      defaultValue: true,
    },
    isActivate: {
      type: DataTypes.BOOLEAN, //admin can be ban this member
      defaultValue: true,
    },
    isDonate: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    refresh_token: {
      type: DataTypes.TEXT,
    },
  },
  {
    freezeTableName: true,
  }
);

(async () => {
  await db.sync();
})();

export default Users;

import axios from "axios";

const url = "https://covid19.mathdro.id/api";

export const fetchData = async (country) => {
  let changeableUrl = url;

  if (country) {
    changeableUrl = `${url}/countries/${country}`;
  }

  try {
    const {
      data: { confirmed, recovered, deaths, lastUpdate },
    } = await axios.get(changeableUrl);

    return { confirmed, recovered, deaths, lastUpdate };
  } catch (error) {
    return error;
  }
};

// export const fetchDailyData = async () => {
//   try {
//     const { data } = await axios.get(`${url}/daily`);

//     return data.map(({ confirmed, deaths, reportDate: date }) => ({ confirmed: confirmed.total, deaths: deaths.total, date }));
//   } catch (error) {
//     return error;
//   }
// };

// Instead of Global, it fetches the daily data for the US
export const fetchDailyData = async () => {
  try {
    const { data } = await axios.get(
      "https://api.covidtracking.com/v1/us/daily.json"
    );

    return data.map(({ positive, recovered, death, dateChecked: date }) => ({
      confirmed: positive,
      recovered,
      deaths: death,
      date,
    }));
  } catch (error) {
    return error;
  }
};

export const fetchCountries = async () => {
  try {
    const {
      data: { countries },
    } = await axios.get(`${url}/countries`);

    return countries.map((country) => country.name);
  } catch (error) {
    return error;
  }
};

import React from "react";
import { Typography, Grid } from "@material-ui/core";
import CardComponent from "./Card/Card";
import styles from "./Cards.module.css";

const Info = ({ data: { confirmed, recovered, deaths, lastUpdate } }) => {
  if (!confirmed) {
    return "Loading...";
  }

  return (
    <div className={styles.container}>
      <Typography gutterBottom variant="h4" component="h2">
        Global
      </Typography>
      <Grid container spacing={3} justify="center">
        <CardComponent
          className={styles.infected}
          cardTitle="Infected"
          value={confirmed.value}
          lastUpdate={lastUpdate}
          cardSubtitle="Number of active cases from COVID-19."
        />
        <CardComponent
          className={styles.recovered}
          cardTitle="Recovered"
          value={recovered.value}
          lastUpdate={lastUpdate}
          cardSubtitle="Number of recoveries from COVID-19."
        />
        <CardComponent
          className={styles.deaths}
          cardTitle="Deaths"
          value={deaths.value}
          lastUpdate={lastUpdate}
          cardSubtitle="Number of deaths caused by COVID-19."
        />
      </Grid>
    </div>
  );
};

export default Info;

import React from "react";
import { Card, CardContent, Typography, Grid } from "@material-ui/core";
import CountUp from "react-countup";
import cx from "classnames";

import styles from "./Card.module.css";

const CardComponent = ({
  className,
  cardTitle,
  value,
  lastUpdate,
  cardSubtitle,
}) => (
  <Grid
    item
    xs={12}
    md={3}
    component={Card}
    className={cx(styles.card, className)}
  >
    <CardContent>
      <Typography color="textSecondary" gutterBottom>
        {cardTitle}
      </Typography>
      <Typography variant="h5" component="h2">
        <CountUp start={0} end={value} duration={2.75} separator="," />
      </Typography>
      <Typography color="textSecondary">
        {new Date(lastUpdate).toDateString()}
      </Typography>
      <Typography variant="body2" component="p">
        {cardSubtitle}
      </Typography>
    </CardContent>
  </Grid>
);

export default CardComponent;
import React, { useState, useEffect } from "react";
import { Line, Bar } from "react-chartjs-2";

import { fetchDailyData } from "../../api";

import styles from "./Chart.module.css";

const Chart = ({ data: { confirmed, recovered, deaths }, country }) => {
  const [dailyData, setDailyData] = useState({});

  useEffect(() => {
    const fetchMyAPI = async () => {
      const initialDailyData = await fetchDailyData();

      setDailyData(initialDailyData);
    };

    fetchMyAPI();
  }, []);

  const barChart = confirmed ? (
    <Bar
      data={{
        labels: ["Infected", "Recovered", "Deaths"],
        datasets: [
          {
            label: "People",
            backgroundColor: [
              "rgba(0, 0, 255, 0.5)",
              "rgba(0, 255, 0, 0.5)",
              "rgba(255, 0, 0, 0.5)",
            ],
            data: [confirmed.value, recovered.value, deaths.value],
          },
        ],
      }}
      options={{
        legend: { display: false },
        title: { display: true, text: `Current state in ${country}` },
      }}
    />
  ) : null;

  const lineChart = dailyData[0] ? (
    <Line
      data={{
        labels: dailyData.map(({ date }) =>
          new Date(date).toLocaleDateString()
        ),
        datasets: [
          {
            data: dailyData.map((data) => data.confirmed),
            label: "Infected",
            borderColor: "#3333ff",
            fill: true,
          },
          {
            data: dailyData.map((data) => data.deaths),
            label: "Deaths",
            borderColor: "red",
            backgroundColor: "rgba(255, 0, 0, 0.5)",
            fill: true,
          },
          {
            data: dailyData.map((data) => data.recovered),
            label: "Recovered",
            borderColor: "green",
            backgroundColor: "rgba(0, 255, 0, 0.5)",
            fill: true,
          },
        ],
      }}
    />
  ) : null;

  return (
    <div className={styles.container}>{country ? barChart : lineChart}</div>
  );
};

export default Chart;

import React, { useState, useEffect } from "react";
import { NativeSelect, FormControl } from "@material-ui/core";

import { fetchCountries } from "../../api";

import styles from "./CountryPicker.module.css";

const Countries = ({ handleCountryChange }) => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      setCountries(await fetchCountries());
    };

    fetchAPI();
  }, []);

  return (
    <FormControl className={styles.formControl}>
      <NativeSelect
        defaultValue=""
        onChange={(e) => handleCountryChange(e.target.value)}
      >
        <option value="">United States</option>
        {countries.map((country, i) => (
          <option key={i} value={country}>
            {country}
          </option>
        ))}
      </NativeSelect>
    </FormControl>
  );
};

export default Countries;

import React from "react";

import { Cards, CountryPicker, Chart } from "./components";
import { fetchData } from "./api/";
import styles from "./App.module.css";

import image from "./images/image.png";

class App extends React.Component {
  state = {
    data: {},
    country: "",
  };

  async componentDidMount() {
    const data = await fetchData();

    this.setState({ data });
  }

  handleCountryChange = async (country) => {
    const data = await fetchData(country);

    this.setState({ data, country: country });
  };

  render() {
    const { data, country } = this.state;

    return (
      <div className={styles.container}>
        <img className={styles.image} src={image} alt="COVID-19" />
        <Cards data={data} />
        <CountryPicker handleCountryChange={this.handleCountryChange} />
        <Chart data={data} country={country} />
      </div>
    );
  }
}

export default App;

import React, { Component } from "react";
import Title from "../Title";
import CartColumns from "./CartColumns";
import EmptyCart from "./EmptyCart";
import { ProductConsumer } from "../../context";
import CartList from "./CartList";
import CartTotals from "./CartTotals";

export default class Store extends Component {
  render() {
    return (
      <section>
        <ProductConsumer>
          {(value) => {
            const { cart } = value;
            if (cart.length > 0) {
              return (
                <React.Fragment>
                  <Title name="your" title="cart" />
                  <CartColumns />
                  <CartList value={value} />
                  <CartTotals value={value} history={this.props.history} />
                </React.Fragment>
              );
            } else {
              return <EmptyCart />;
            }
          }}
        </ProductConsumer>
      </section>
    );
  }
}

import React from "react";

export default function CartColumns() {
  return (
    <div className="container-fluid text-center d-none d-lg-block">
      <div className="row">
        <div className="col-10 mx-auto col-lg-2">
          <p className="text-uppercase">products</p>
        </div>
        <div className="col-10 mx-auto col-lg-2">
          <p className="text-uppercase">name of product</p>
        </div>
        <div className="col-10 mx-auto col-lg-2">
          <p className="text-uppercase">price</p>
        </div>
        <div className="col-10 mx-auto col-lg-2">
          <p className="text-uppercase">quantity</p>
        </div>
        <div className="col-10 mx-auto col-lg-2">
          <p className="text-uppercase">remove</p>
        </div>
        <div className="col-10 mx-auto col-lg-2">
          <p className="text-uppercase">total</p>
        </div>
      </div>
    </div>
  );
}

import React from "react";

export default function CartItem({ item, value }) {
  const { id, title, img, price, total, count } = item;
  const { increment, decrement, removeItem } = value;
  return (
    <div className="row my-2 text-capitalize text-center">
      <div className="col-10 mx-auto col-lg-2">
        <img
          src={img}
          style={{ width: "5rem", height: "5rem" }}
          className="img-fluid"
          alt="product"
        />
      </div>
      <div className="col-10 mx-auto col-lg-2">
        <span className="d-lg-none">product : </span>
        {title}
      </div>
      <div className="col-10 mx-auto col-lg-2">
        <span className="d-lg-none">price : </span>
        {price}
      </div>
      <div className="col-10 mx-auto col-lg-2 my-2 my-lg-2-0">
        <div className="d-flex justify-content-center">
          <div>
            <span className="btn btn-black mx-1" onClick={() => decrement(id)}>
              -
            </span>
            <span className="btn btn-black mx-1">{count}</span>
            <span className="btn btn-black mx-1" onClick={() => increment(id)}>
              +
            </span>
          </div>
        </div>
      </div>
      {/**/}
      <div className="col-10 mx-auto col-lg-2">
        <div className="cart-icon" onClick={() => removeItem(id)}>
          <i className="fas fa-trash"></i>
        </div>
      </div>
      <div className="col-10 mx-auto col-lg-2">
        <strong>item total : $ {total}</strong>
      </div>
    </div>
  );
}

import React from "react";
import CartItem from "./CartItem";

export default function CartList({ value }) {
  const { cart } = value;

  return (
    <div className="container-fluid">
      {cart.map((item) => {
        return <CartItem key={item.id} item={item} value={value} />;
      })}
    </div>
  );
}

import React from "react";
import { Link } from "react-router-dom";

export default function CartTotals({ value }) {
  const { cartSubTotal, cartTax, cartTotal, clearCart } = value;
  return (
    <React.Fragment>
      <div className="container">
        <div className="row">
          <div className="col-10 mt-2 ml-sm-5 ml-md-auto col-sm-8 text-capitalize text-right">
            <Link to="/">
              <button
                className="btn btn-outline-danger text-uppercase mb-3 px-5"
                type="button"
                onClick={() => {
                  clearCart();
                }}
              >
                clear cart
              </button>
            </Link>
            <h5>
              <span className="text-title">subtotal :</span>
              <strong>{cartSubTotal}</strong>
            </h5>
            <h5>
              <span className="text-title">subtotal :</span>
              <strong>{cartTax}</strong>
            </h5>
            <h5>
              <span className="text-title">subtotal :</span>
              <strong>{cartTotal}</strong>
            </h5>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
import React from "react";

export default function EmptyCart() {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-10 mx-auto text-center text-title">
          <h1>Your cart is currently empty</h1>
        </div>
      </div>
    </div>
  );
}
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
import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Advertisements = db.define(
  "advertisements",
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
    },
    des: {
      type: DataTypes.STRING,
    },
    image1: {
      type: DataTypes.STRING,
    },
    image2: {
      type: DataTypes.STRING,
    },
    image3: {
      type: DataTypes.STRING,
    },

    category: {
      type: DataTypes.STRING,
    },

    isAccept: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    createDate: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW,
    },
    createTime: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    freezeTableName: true,
  }
);

(async () => {
  await db
    .sync()
    .then(() => {
      console.log("Table created");
    })
    .catch((err) => {
      console.log(err);
    });
})();

export default Advertisements;
import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Articles = db.define(
  "articles",
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
    },
    des: {
      type: DataTypes.STRING,
    },
    image1: {
      type: DataTypes.STRING,
    },
    image2: {
      type: DataTypes.STRING,
    },
    image3: {
      type: DataTypes.STRING,
    },

    category: {
      type: DataTypes.STRING,
    },

    isAccept: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    createDate: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW,
    },
    createTime: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    freezeTableName: true,
  }
);

(async () => {
  await db
    .sync()
    .then(() => {
      console.log("Table created");
    })
    .catch((err) => {
      console.log(err);
    });
})();

export default Articles;
import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Users from "./userModel.js";

const { DataTypes } = Sequelize;

const Orders = db.define(
  "orders",
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    unitPrice: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    fieldAddress: {
      type: DataTypes.STRING,
    },
    manuDate: {
      type: DataTypes.DATEONLY,
    },
    expireDate: {
      type: DataTypes.DATEONLY,
    },
    status: {
      type: DataTypes.STRING,
    },
    isAccept: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    createDate: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW,
    },
    location: {
      type: DataTypes.STRING,
    },
    isDonate: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    freezeTableName: true,
    // include: Users
  }
);
// Orders.belongsTo(Users);

import axios from "axios";

const url = "https://covid19.mathdro.id/api";

export const fetchData = async (country) => {
  let changeableUrl = url;

  if (country) {
    changeableUrl = `${url}/countries/${country}`;
  }

  try {
    const {
      data: { confirmed, recovered, deaths, lastUpdate },
    } = await axios.get(changeableUrl);

    return { confirmed, recovered, deaths, lastUpdate };
  } catch (error) {
    return error;
  }
};

// export const fetchDailyData = async () => {
//   try {
//     const { data } = await axios.get(`${url}/daily`);

//     return data.map(({ confirmed, deaths, reportDate: date }) => ({ confirmed: confirmed.total, deaths: deaths.total, date }));
//   } catch (error) {
//     return error;
//   }
// };

// Instead of Global, it fetches the daily data for the US
export const fetchDailyData = async () => {
  try {
    const { data } = await axios.get(
      "https://api.covidtracking.com/v1/us/daily.json"
    );

    return data.map(({ positive, recovered, death, dateChecked: date }) => ({
      confirmed: positive,
      recovered,
      deaths: death,
      date,
    }));
  } catch (error) {
    return error;
  }
};

export const fetchCountries = async () => {
  try {
    const {
      data: { countries },
    } = await axios.get(`${url}/countries`);

    return countries.map((country) => country.name);
  } catch (error) {
    return error;
  }
};

import React from "react";
import { Typography, Grid } from "@material-ui/core";
import CardComponent from "./Card/Card";
import styles from "./Cards.module.css";

const Info = ({ data: { confirmed, recovered, deaths, lastUpdate } }) => {
  if (!confirmed) {
    return "Loading...";
  }

  return (
    <div className={styles.container}>
      <Typography gutterBottom variant="h4" component="h2">
        Global
      </Typography>
      <Grid container spacing={3} justify="center">
        <CardComponent
          className={styles.infected}
          cardTitle="Infected"
          value={confirmed.value}
          lastUpdate={lastUpdate}
          cardSubtitle="Number of active cases from COVID-19."
        />
        <CardComponent
          className={styles.recovered}
          cardTitle="Recovered"
          value={recovered.value}
          lastUpdate={lastUpdate}
          cardSubtitle="Number of recoveries from COVID-19."
        />
        <CardComponent
          className={styles.deaths}
          cardTitle="Deaths"
          value={deaths.value}
          lastUpdate={lastUpdate}
          cardSubtitle="Number of deaths caused by COVID-19."
        />
      </Grid>
    </div>
  );
};

export default Info;

import React from "react";
import { Card, CardContent, Typography, Grid } from "@material-ui/core";
import CountUp from "react-countup";
import cx from "classnames";

import styles from "./Card.module.css";

const CardComponent = ({
  className,
  cardTitle,
  value,
  lastUpdate,
  cardSubtitle,
}) => (
  <Grid
    item
    xs={12}
    md={3}
    component={Card}
    className={cx(styles.card, className)}
  >
    <CardContent>
      <Typography color="textSecondary" gutterBottom>
        {cardTitle}
      </Typography>
      <Typography variant="h5" component="h2">
        <CountUp start={0} end={value} duration={2.75} separator="," />
      </Typography>
      <Typography color="textSecondary">
        {new Date(lastUpdate).toDateString()}
      </Typography>
      <Typography variant="body2" component="p">
        {cardSubtitle}
      </Typography>
    </CardContent>
  </Grid>
);

export default CardComponent;
import React, { useState, useEffect } from "react";
import { Line, Bar } from "react-chartjs-2";

import { fetchDailyData } from "../../api";

import styles from "./Chart.module.css";

const Chart = ({ data: { confirmed, recovered, deaths }, country }) => {
  const [dailyData, setDailyData] = useState({});

  useEffect(() => {
    const fetchMyAPI = async () => {
      const initialDailyData = await fetchDailyData();

      setDailyData(initialDailyData);
    };

    fetchMyAPI();
  }, []);

  const barChart = confirmed ? (
    <Bar
      data={{
        labels: ["Infected", "Recovered", "Deaths"],
        datasets: [
          {
            label: "People",
            backgroundColor: [
              "rgba(0, 0, 255, 0.5)",
              "rgba(0, 255, 0, 0.5)",
              "rgba(255, 0, 0, 0.5)",
            ],
            data: [confirmed.value, recovered.value, deaths.value],
          },
        ],
      }}
      options={{
        legend: { display: false },
        title: { display: true, text: `Current state in ${country}` },
      }}
    />
  ) : null;

  const lineChart = dailyData[0] ? (
    <Line
      data={{
        labels: dailyData.map(({ date }) =>
          new Date(date).toLocaleDateString()
        ),
        datasets: [
          {
            data: dailyData.map((data) => data.confirmed),
            label: "Infected",
            borderColor: "#3333ff",
            fill: true,
          },
          {
            data: dailyData.map((data) => data.deaths),
            label: "Deaths",
            borderColor: "red",
            backgroundColor: "rgba(255, 0, 0, 0.5)",
            fill: true,
          },
          {
            data: dailyData.map((data) => data.recovered),
            label: "Recovered",
            borderColor: "green",
            backgroundColor: "rgba(0, 255, 0, 0.5)",
            fill: true,
          },
        ],
      }}
    />
  ) : null;

  return (
    <div className={styles.container}>{country ? barChart : lineChart}</div>
  );
};

export default Chart;

import React, { useState, useEffect } from "react";
import { NativeSelect, FormControl } from "@material-ui/core";

import { fetchCountries } from "../../api";

import styles from "./CountryPicker.module.css";

const Countries = ({ handleCountryChange }) => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      setCountries(await fetchCountries());
    };

    fetchAPI();
  }, []);

  return (
    <FormControl className={styles.formControl}>
      <NativeSelect
        defaultValue=""
        onChange={(e) => handleCountryChange(e.target.value)}
      >
        <option value="">United States</option>
        {countries.map((country, i) => (
          <option key={i} value={country}>
            {country}
          </option>
        ))}
      </NativeSelect>
    </FormControl>
  );
};

export default Countries;

import React from "react";

import { Cards, CountryPicker, Chart } from "./components";
import { fetchData } from "./api/";
import styles from "./App.module.css";

import image from "./images/image.png";

class App extends React.Component {
  state = {
    data: {},
    country: "",
  };

  async componentDidMount() {
    const data = await fetchData();

    this.setState({ data });
  }

  handleCountryChange = async (country) => {
    const data = await fetchData(country);

    this.setState({ data, country: country });
  };

  render() {
    const { data, country } = this.state;

    return (
      <div className={styles.container}>
        <img className={styles.image} src={image} alt="COVID-19" />
        <Cards data={data} />
        <CountryPicker handleCountryChange={this.handleCountryChange} />
        <Chart data={data} country={country} />
      </div>
    );
  }
}

export default App;

import React, { Component } from "react";
import Title from "../Title";
import CartColumns from "./CartColumns";
import EmptyCart from "./EmptyCart";
import { ProductConsumer } from "../../context";
import CartList from "./CartList";
import CartTotals from "./CartTotals";

export default class Store extends Component {
  render() {
    return (
      <section>
        <ProductConsumer>
          {(value) => {
            const { cart } = value;
            if (cart.length > 0) {
              return (
                <React.Fragment>
                  <Title name="your" title="cart" />
                  <CartColumns />
                  <CartList value={value} />
                  <CartTotals value={value} history={this.props.history} />
                </React.Fragment>
              );
            } else {
              return <EmptyCart />;
            }
          }}
        </ProductConsumer>
      </section>
    );
  }
}

import React from "react";

export default function CartColumns() {
  return (
    <div className="container-fluid text-center d-none d-lg-block">
      <div className="row">
        <div className="col-10 mx-auto col-lg-2">
          <p className="text-uppercase">products</p>
        </div>
        <div className="col-10 mx-auto col-lg-2">
          <p className="text-uppercase">name of product</p>
        </div>
        <div className="col-10 mx-auto col-lg-2">
          <p className="text-uppercase">price</p>
        </div>
        <div className="col-10 mx-auto col-lg-2">
          <p className="text-uppercase">quantity</p>
        </div>
        <div className="col-10 mx-auto col-lg-2">
          <p className="text-uppercase">remove</p>
        </div>
        <div className="col-10 mx-auto col-lg-2">
          <p className="text-uppercase">total</p>
        </div>
      </div>
    </div>
  );
}

import React from "react";

export default function CartItem({ item, value }) {
  const { id, title, img, price, total, count } = item;
  const { increment, decrement, removeItem } = value;
  return (
    <div className="row my-2 text-capitalize text-center">
      <div className="col-10 mx-auto col-lg-2">
        <img
          src={img}
          style={{ width: "5rem", height: "5rem" }}
          className="img-fluid"
          alt="product"
        />
      </div>
      <div className="col-10 mx-auto col-lg-2">
        <span className="d-lg-none">product : </span>
        {title}
      </div>
      <div className="col-10 mx-auto col-lg-2">
        <span className="d-lg-none">price : </span>
        {price}
      </div>
      <div className="col-10 mx-auto col-lg-2 my-2 my-lg-2-0">
        <div className="d-flex justify-content-center">
          <div>
            <span className="btn btn-black mx-1" onClick={() => decrement(id)}>
              -
            </span>
            <span className="btn btn-black mx-1">{count}</span>
            <span className="btn btn-black mx-1" onClick={() => increment(id)}>
              +
            </span>
          </div>
        </div>
      </div>
      {/**/}
      <div className="col-10 mx-auto col-lg-2">
        <div className="cart-icon" onClick={() => removeItem(id)}>
          <i className="fas fa-trash"></i>
        </div>
      </div>
      <div className="col-10 mx-auto col-lg-2">
        <strong>item total : $ {total}</strong>
      </div>
    </div>
  );
}

import React from "react";
import CartItem from "./CartItem";

export default function CartList({ value }) {
  const { cart } = value;

  return (
    <div className="container-fluid">
      {cart.map((item) => {
        return <CartItem key={item.id} item={item} value={value} />;
      })}
    </div>
  );
}

import React from "react";
import { Link } from "react-router-dom";

export default function CartTotals({ value }) {
  const { cartSubTotal, cartTax, cartTotal, clearCart } = value;
  return (
    <React.Fragment>
      <div className="container">
        <div className="row">
          <div className="col-10 mt-2 ml-sm-5 ml-md-auto col-sm-8 text-capitalize text-right">
            <Link to="/">
              <button
                className="btn btn-outline-danger text-uppercase mb-3 px-5"
                type="button"
                onClick={() => {
                  clearCart();
                }}
              >
                clear cart
              </button>
            </Link>
            <h5>
              <span className="text-title">subtotal :</span>
              <strong>{cartSubTotal}</strong>
            </h5>
            <h5>
              <span className="text-title">subtotal :</span>
              <strong>{cartTax}</strong>
            </h5>
            <h5>
              <span className="text-title">subtotal :</span>
              <strong>{cartTotal}</strong>
            </h5>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
import React from "react";

export default function EmptyCart() {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-10 mx-auto text-center text-title">
          <h1>Your cart is currently empty</h1>
        </div>
      </div>
    </div>
  );
}
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
import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Advertisements = db.define(
  "advertisements",
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
    },
    des: {
      type: DataTypes.STRING,
    },
    image1: {
      type: DataTypes.STRING,
    },
    image2: {
      type: DataTypes.STRING,
    },
    image3: {
      type: DataTypes.STRING,
    },

    category: {
      type: DataTypes.STRING,
    },

    isAccept: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    createDate: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW,
    },
    createTime: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    freezeTableName: true,
  }
);

(async () => {
  await db
    .sync()
    .then(() => {
      console.log("Table created");
    })
    .catch((err) => {
      console.log(err);
    });
})();

export default Advertisements;
import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Articles = db.define(
  "articles",
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
    },
    des: {
      type: DataTypes.STRING,
    },
    image1: {
      type: DataTypes.STRING,
    },
    image2: {
      type: DataTypes.STRING,
    },
    image3: {
      type: DataTypes.STRING,
    },

    category: {
      type: DataTypes.STRING,
    },

    isAccept: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    createDate: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW,
    },
    createTime: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    freezeTableName: true,
  }
);

(async () => {
  await db
    .sync()
    .then(() => {
      console.log("Table created");
    })
    .catch((err) => {
      console.log(err);
    });
})();

export default Articles;
import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Users from "./userModel.js";

const { DataTypes } = Sequelize;

const Orders = db.define(
  "orders",
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    unitPrice: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    fieldAddress: {
      type: DataTypes.STRING,
    },
    manuDate: {
      type: DataTypes.DATEONLY,
    },
    expireDate: {
      type: DataTypes.DATEONLY,
    },
    status: {
      type: DataTypes.STRING,
    },
    isAccept: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    createDate: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW,
    },
    location: {
      type: DataTypes.STRING,
    },
    isDonate: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    freezeTableName: true,
    // include: Users
  }
);
// Orders.belongsTo(Users);

(async () => {
  await db
    .sync()
    .then(() => {
      console.log("Table created");
    })
    .catch((err) => {
      console.log(err);
    });
})();

export default Orders;
import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Products from "./productsModel.js";

const { DataTypes } = Sequelize;

const ProductImage = db.define(
  "productImage",
  {
    productImages: {
      type: DataTypes.STRING,
      allowNull: true,
      //   defaultValue: DataTypes.UUIDV4
    },
  },
  {
    freezeTableName: true,
  }
);

// ProductImage.belongsTo(Products);
// products.belongsToMany(productImage, { through: 'ProductProductImage' });

(async () => {
  await db.sync();
})();

export default ProductImage;
import { Sequelize } from "sequelize";
import db from "../config/database.js";
import ProductImage from "./productImagesModel.js";

const { DataTypes } = Sequelize;

const Products = db.define(
  "products",
  {
    productName: {
      type: DataTypes.STRING,
    },
    productCategory: {
      type: DataTypes.STRING,
    },
    weight: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    unitPrice: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    fieldAddress: {
      type: DataTypes.STRING,
    },
    manuDate: {
      type: DataTypes.DATEONLY,
    },
    expireDate: {
      type: DataTypes.DATEONLY,
    },
    status: {
      type: DataTypes.STRING,
    },
    isAccept: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    createDate: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW,
    },
    location: {
      type: DataTypes.STRING,
    },
    isDonate: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    image1: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image3: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image4: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
  }
);

// Products.hasMany(ProductImage);
// products.belongsToMany(productImage, { through: 'ProductProductImage' });

(async () => {
  await db
    .sync()
    .then(() => {
      console.log("Table created");
    })
    .catch((err) => {
      console.log(err);
    });
})();

export default Products;
import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Users = db.define(
  "users",
  {
    username: {
      type: DataTypes.STRING,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    userrole: {
      type: DataTypes.STRING,
    },
    phone_number: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING,
    },
    city: {
      type: DataTypes.STRING,
    },
    town: {
      type: DataTypes.STRING,
    },
    img: {
      type: DataTypes.STRING,
    },
    registerNo: {
      type: DataTypes.STRING,
    },
    charityFileLocation: {
      type: DataTypes.STRING,
    },
    isAccept: {
      type: DataTypes.BOOLEAN, //user is charity organizer then default value should be false.. then moderator accept the request then this value updated.
      defaultValue: true,
    },
    isActivate: {
      type: DataTypes.BOOLEAN, //admin can be ban this member
      defaultValue: true,
    },
    isDonate: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    refresh_token: {
      type: DataTypes.TEXT,
    },
  },
  {
    freezeTableName: true,
  }
);

(async () => {
  await db.sync();
})();

export default Users;
import axios from "axios";

const url = "https://covid19.mathdro.id/api";

export const fetchData = async (country) => {
  let changeableUrl = url;

  if (country) {
    changeableUrl = `${url}/countries/${country}`;
  }

  try {
    const {
      data: { confirmed, recovered, deaths, lastUpdate },
    } = await axios.get(changeableUrl);

    return { confirmed, recovered, deaths, lastUpdate };
  } catch (error) {
    return error;
  }
};

// export const fetchDailyData = async () => {
//   try {
//     const { data } = await axios.get(`${url}/daily`);

//     return data.map(({ confirmed, deaths, reportDate: date }) => ({ confirmed: confirmed.total, deaths: deaths.total, date }));
//   } catch (error) {
//     return error;
//   }
// };

// Instead of Global, it fetches the daily data for the US
export const fetchDailyData = async () => {
  try {
    const { data } = await axios.get(
      "https://api.covidtracking.com/v1/us/daily.json"
    );

    return data.map(({ positive, recovered, death, dateChecked: date }) => ({
      confirmed: positive,
      recovered,
      deaths: death,
      date,
    }));
  } catch (error) {
    return error;
  }
};

export const fetchCountries = async () => {
  try {
    const {
      data: { countries },
    } = await axios.get(`${url}/countries`);

    return countries.map((country) => country.name);
  } catch (error) {
    return error;
  }
};

import React from "react";
import { Typography, Grid } from "@material-ui/core";
import CardComponent from "./Card/Card";
import styles from "./Cards.module.css";

const Info = ({ data: { confirmed, recovered, deaths, lastUpdate } }) => {
  if (!confirmed) {
    return "Loading...";
  }

  return (
    <div className={styles.container}>
      <Typography gutterBottom variant="h4" component="h2">
        Global
      </Typography>
      <Grid container spacing={3} justify="center">
        <CardComponent
          className={styles.infected}
          cardTitle="Infected"
          value={confirmed.value}
          lastUpdate={lastUpdate}
          cardSubtitle="Number of active cases from COVID-19."
        />
        <CardComponent
          className={styles.recovered}
          cardTitle="Recovered"
          value={recovered.value}
          lastUpdate={lastUpdate}
          cardSubtitle="Number of recoveries from COVID-19."
        />
        <CardComponent
          className={styles.deaths}
          cardTitle="Deaths"
          value={deaths.value}
          lastUpdate={lastUpdate}
          cardSubtitle="Number of deaths caused by COVID-19."
        />
      </Grid>
    </div>
  );
};

export default Info;

import React from "react";
import { Card, CardContent, Typography, Grid } from "@material-ui/core";
import CountUp from "react-countup";
import cx from "classnames";

import styles from "./Card.module.css";

const CardComponent = ({
  className,
  cardTitle,
  value,
  lastUpdate,
  cardSubtitle,
}) => (
  <Grid
    item
    xs={12}
    md={3}
    component={Card}
    className={cx(styles.card, className)}
  >
    <CardContent>
      <Typography color="textSecondary" gutterBottom>
        {cardTitle}
      </Typography>
      <Typography variant="h5" component="h2">
        <CountUp start={0} end={value} duration={2.75} separator="," />
      </Typography>
      <Typography color="textSecondary">
        {new Date(lastUpdate).toDateString()}
      </Typography>
      <Typography variant="body2" component="p">
        {cardSubtitle}
      </Typography>
    </CardContent>
  </Grid>
);

export default CardComponent;
import React, { useState, useEffect } from "react";
import { Line, Bar } from "react-chartjs-2";

import { fetchDailyData } from "../../api";

import styles from "./Chart.module.css";

const Chart = ({ data: { confirmed, recovered, deaths }, country }) => {
  const [dailyData, setDailyData] = useState({});

  useEffect(() => {
    const fetchMyAPI = async () => {
      const initialDailyData = await fetchDailyData();

      setDailyData(initialDailyData);
    };

    fetchMyAPI();
  }, []);

  const barChart = confirmed ? (
    <Bar
      data={{
        labels: ["Infected", "Recovered", "Deaths"],
        datasets: [
          {
            label: "People",
            backgroundColor: [
              "rgba(0, 0, 255, 0.5)",
              "rgba(0, 255, 0, 0.5)",
              "rgba(255, 0, 0, 0.5)",
            ],
            data: [confirmed.value, recovered.value, deaths.value],
          },
        ],
      }}
      options={{
        legend: { display: false },
        title: { display: true, text: `Current state in ${country}` },
      }}
    />
  ) : null;

  const lineChart = dailyData[0] ? (
    <Line
      data={{
        labels: dailyData.map(({ date }) =>
          new Date(date).toLocaleDateString()
        ),
        datasets: [
          {
            data: dailyData.map((data) => data.confirmed),
            label: "Infected",
            borderColor: "#3333ff",
            fill: true,
          },
          {
            data: dailyData.map((data) => data.deaths),
            label: "Deaths",
            borderColor: "red",
            backgroundColor: "rgba(255, 0, 0, 0.5)",
            fill: true,
          },
          {
            data: dailyData.map((data) => data.recovered),
            label: "Recovered",
            borderColor: "green",
            backgroundColor: "rgba(0, 255, 0, 0.5)",
            fill: true,
          },
        ],
      }}
    />
  ) : null;

  return (
    <div className={styles.container}>{country ? barChart : lineChart}</div>
  );
};

export default Chart;

import React, { useState, useEffect } from "react";
import { NativeSelect, FormControl } from "@material-ui/core";

import { fetchCountries } from "../../api";

import styles from "./CountryPicker.module.css";

const Countries = ({ handleCountryChange }) => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      setCountries(await fetchCountries());
    };

    fetchAPI();
  }, []);

  return (
    <FormControl className={styles.formControl}>
      <NativeSelect
        defaultValue=""
        onChange={(e) => handleCountryChange(e.target.value)}
      >
        <option value="">United States</option>
        {countries.map((country, i) => (
          <option key={i} value={country}>
            {country}
          </option>
        ))}
      </NativeSelect>
    </FormControl>
  );
};

export default Countries;

import React from "react";

import { Cards, CountryPicker, Chart } from "./components";
import { fetchData } from "./api/";
import styles from "./App.module.css";

import image from "./images/image.png";

class App extends React.Component {
  state = {
    data: {},
    country: "",
  };

  async componentDidMount() {
    const data = await fetchData();

    this.setState({ data });
  }

  handleCountryChange = async (country) => {
    const data = await fetchData(country);

    this.setState({ data, country: country });
  };

  render() {
    const { data, country } = this.state;

    return (
      <div className={styles.container}>
        <img className={styles.image} src={image} alt="COVID-19" />
        <Cards data={data} />
        <CountryPicker handleCountryChange={this.handleCountryChange} />
        <Chart data={data} country={country} />
      </div>
    );
  }
}

export default App;

import React, { Component } from "react";
import Title from "../Title";
import CartColumns from "./CartColumns";
import EmptyCart from "./EmptyCart";
import { ProductConsumer } from "../../context";
import CartList from "./CartList";
import CartTotals from "./CartTotals";

export default class Store extends Component {
  render() {
    return (
      <section>
        <ProductConsumer>
          {(value) => {
            const { cart } = value;
            if (cart.length > 0) {
              return (
                <React.Fragment>
                  <Title name="your" title="cart" />
                  <CartColumns />
                  <CartList value={value} />
                  <CartTotals value={value} history={this.props.history} />
                </React.Fragment>
              );
            } else {
              return <EmptyCart />;
            }
          }}
        </ProductConsumer>
      </section>
    );
  }
}

import React from "react";

export default function CartColumns() {
  return (
    <div className="container-fluid text-center d-none d-lg-block">
      <div className="row">
        <div className="col-10 mx-auto col-lg-2">
          <p className="text-uppercase">products</p>
        </div>
        <div className="col-10 mx-auto col-lg-2">
          <p className="text-uppercase">name of product</p>
        </div>
        <div className="col-10 mx-auto col-lg-2">
          <p className="text-uppercase">price</p>
        </div>
        <div className="col-10 mx-auto col-lg-2">
          <p className="text-uppercase">quantity</p>
        </div>
        <div className="col-10 mx-auto col-lg-2">
          <p className="text-uppercase">remove</p>
        </div>
        <div className="col-10 mx-auto col-lg-2">
          <p className="text-uppercase">total</p>
        </div>
      </div>
    </div>
  );
}

import React from "react";

export default function CartItem({ item, value }) {
  const { id, title, img, price, total, count } = item;
  const { increment, decrement, removeItem } = value;
  return (
    <div className="row my-2 text-capitalize text-center">
      <div className="col-10 mx-auto col-lg-2">
        <img
          src={img}
          style={{ width: "5rem", height: "5rem" }}
          className="img-fluid"
          alt="product"
        />
      </div>
      <div className="col-10 mx-auto col-lg-2">
        <span className="d-lg-none">product : </span>
        {title}
      </div>
      <div className="col-10 mx-auto col-lg-2">
        <span className="d-lg-none">price : </span>
        {price}
      </div>
      <div className="col-10 mx-auto col-lg-2 my-2 my-lg-2-0">
        <div className="d-flex justify-content-center">
          <div>
            <span className="btn btn-black mx-1" onClick={() => decrement(id)}>
              -
            </span>
            <span className="btn btn-black mx-1">{count}</span>
            <span className="btn btn-black mx-1" onClick={() => increment(id)}>
              +
            </span>
          </div>
        </div>
      </div>
      {/**/}
      <div className="col-10 mx-auto col-lg-2">
        <div className="cart-icon" onClick={() => removeItem(id)}>
          <i className="fas fa-trash"></i>
        </div>
      </div>
      <div className="col-10 mx-auto col-lg-2">
        <strong>item total : $ {total}</strong>
      </div>
    </div>
  );
}

import React from "react";
import CartItem from "./CartItem";

export default function CartList({ value }) {
  const { cart } = value;

  return (
    <div className="container-fluid">
      {cart.map((item) => {
        return <CartItem key={item.id} item={item} value={value} />;
      })}
    </div>
  );
}

import React from "react";
import { Link } from "react-router-dom";

export default function CartTotals({ value }) {
  const { cartSubTotal, cartTax, cartTotal, clearCart } = value;
  return (
    <React.Fragment>
      <div className="container">
        <div className="row">
          <div className="col-10 mt-2 ml-sm-5 ml-md-auto col-sm-8 text-capitalize text-right">
            <Link to="/">
              <button
                className="btn btn-outline-danger text-uppercase mb-3 px-5"
                type="button"
                onClick={() => {
                  clearCart();
                }}
              >
                clear cart
              </button>
            </Link>
            <h5>
              <span className="text-title">subtotal :</span>
              <strong>{cartSubTotal}</strong>
            </h5>
            <h5>
              <span className="text-title">subtotal :</span>
              <strong>{cartTax}</strong>
            </h5>
            <h5>
              <span className="text-title">subtotal :</span>
              <strong>{cartTotal}</strong>
            </h5>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
import React from "react";

export default function EmptyCart() {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-10 mx-auto text-center text-title">
          <h1>Your cart is currently empty</h1>
        </div>
      </div>
    </div>
  );
}
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
import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Advertisements = db.define(
  "advertisements",
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
    },
    des: {
      type: DataTypes.STRING,
    },
    image1: {
      type: DataTypes.STRING,
    },
    image2: {
      type: DataTypes.STRING,
    },
    image3: {
      type: DataTypes.STRING,
    },

    category: {
      type: DataTypes.STRING,
    },

    isAccept: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    createDate: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW,
    },
    createTime: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    freezeTableName: true,
  }
);

(async () => {
  await db
    .sync()
    .then(() => {
      console.log("Table created");
    })
    .catch((err) => {
      console.log(err);
    });
})();

export default Advertisements;
import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Articles = db.define(
  "articles",
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
    },
    des: {
      type: DataTypes.STRING,
    },
    image1: {
      type: DataTypes.STRING,
    },
    image2: {
      type: DataTypes.STRING,
    },
    image3: {
      type: DataTypes.STRING,
    },

    category: {
      type: DataTypes.STRING,
    },

    isAccept: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    createDate: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW,
    },
    createTime: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    freezeTableName: true,
  }
);

(async () => {
  await db
    .sync()
    .then(() => {
      console.log("Table created");
    })
    .catch((err) => {
      console.log(err);
    });
})();

export default Articles;
import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Users from "./userModel.js";

const { DataTypes } = Sequelize;

const Orders = db.define(
  "orders",
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    unitPrice: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    fieldAddress: {
      type: DataTypes.STRING,
    },
    manuDate: {
      type: DataTypes.DATEONLY,
    },
    expireDate: {
      type: DataTypes.DATEONLY,
    },
    status: {
      type: DataTypes.STRING,
    },
    isAccept: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    createDate: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW,
    },
    location: {
      type: DataTypes.STRING,
    },
    isDonate: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    freezeTableName: true,
    // include: Users
  }
);
