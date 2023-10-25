import { Sequelize } from 'sequelize'

const sequelizeConnection = new Sequelize('sqlite::memory');

export default sequelizeConnection;