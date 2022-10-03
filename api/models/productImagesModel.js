import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Products from "./productsModel.js";

const { DataTypes } = Sequelize;

const ProductImage = db.define(
  "productImage",
  {
    productImages: {
      type: DataTypes.STRING,
      allowNull: true
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
