import { DataTypes } from "sequelize";
import { db } from "../database.js";

export const question = db.define('question', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  }
});

question.sync({force: false}).then(() => {});