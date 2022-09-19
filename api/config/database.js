import { Sequelize } from "sequelize";

const db = new Sequelize("ecoAgri", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default db;
