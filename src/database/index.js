import Sequelize from 'sequelize';
import Users from '../app/models/Users';
import databaseconfig from '../config/database';

const models = [ Users ];

class Database {
   constructor() {
    this.init();
   }


   init() {
     this.connection = new Sequelize(databaseconfig);

     models
     .map(model => model.init(this.connection))
     .map(model => model.associate && model.associate(this.connection.models));

   }
}

export default new Database();