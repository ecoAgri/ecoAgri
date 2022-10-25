import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Payments = db.define(
  "payments",
  {
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    clientSecret: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createDate: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW,
    },
    currency: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    shipping: {
      type: DataTypes.FLOAT,
      defaultValue: 0.0,
    },
    status: {
      type: DataTypes.STRING,
    },
    UserID: {
      type: DataTypes.INTEGER,
    },
    isSuccess: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
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

export default Payments;
import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Payments = db.define(
  "payments",
  {
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    clientSecret: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createDate: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW,
    },
    currency: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    shipping: {
      type: DataTypes.FLOAT,
      defaultValue: 0.0,
    },
    status: {
      type: DataTypes.STRING,
    },
    UserID: {
      type: DataTypes.INTEGER,
    },
    isSuccess: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
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

export default Payments;
