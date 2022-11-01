import { Sequelize } from "sequelize";

export const db = new Sequelize('perguntas', 'root', 'mysql', {
  host: 'localhost',
  dialect: 'mysql'
});