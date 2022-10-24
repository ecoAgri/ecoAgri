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
    latitude: {
      type: DataTypes.STRING,
    },
    longitude: {
      type: DataTypes.STRING,
    },
    isDonate: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    priceUOM: {
      type:DataTypes.STRING,
      allowNull: true
    },
    sellerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sellerName: {
      type:DataTypes.STRING,
      allowNull: false
    },
    sellerContact: {
      type:DataTypes.STRING,
      allowNull: false
    },
    weightUOM: {
      type:DataTypes.STRING,
      allowNull: true
    },
    image1: {
      type:DataTypes.STRING,
      allowNull: true
    },
    image2: {
      type:DataTypes.STRING,
      allowNull: true
    },
    image3: {
      type:DataTypes.STRING,
      allowNull: true
    },
    image4: {
      type:DataTypes.STRING,
      allowNull: true
    }
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
