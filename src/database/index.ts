import { Sequelize } from 'sequelize';
import config from '../config/config';
import models from './models'
// import { AgentFactory } from './models/agents';

const DB_URL = `postgresql://${config.DB.USER}:${config.DB.PASSWORD}@${config.DB.HOST}:${config.DB.PORT}/${config.DB.NAME}`;

const dialectOptions = {
  ssl: {
    require: true,
    rejectUnauthorized: false
  }
}

export const DBConn = new Sequelize(DB_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  // dialectOptions
});

export const Agent = models.AgentFactory(DBConn);