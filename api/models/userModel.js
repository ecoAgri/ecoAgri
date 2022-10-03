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
