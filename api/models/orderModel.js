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
    totalPrice: {
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
    productName: {
      type: DataTypes.STRING,
    },
    productCategory: {
      type: DataTypes.STRING,
    },
    location: {
      type: DataTypes.STRING,
    },
    priceUOM: {
      type: DataTypes.STRING,
    },
    weightUOM: {
      type: DataTypes.STRING,
    },
    sellerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sellerName: {
      type: DataTypes.STRING,
    },
    username: {
      type: DataTypes.STRING,
    },
    sellerContact: {
      type: DataTypes.STRING,
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
