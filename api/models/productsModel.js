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
  },
  {
    freezeTableName: true,
  }
);

Products.hasMany(ProductImage);
// products.belongsToMany(productImage, { through: 'ProductProductImage' });

(async () => {
  await db.sync().then(() => {
        console.log("Table created");
    }).catch((err) => { console.log(err); });;
})();

export default Products;
