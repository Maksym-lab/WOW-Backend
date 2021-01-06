const config = {
  app: {
    port: 3000,
    limit: '100kb' 
  },
  sequelize: {
    connectionLimit: 10,
    host: 'localhost',
    database: 'sanity',
    port: 3306,
    username: '',
    password: '',
    dialect: 'mysql',
    logging: false
  },
  steam: {
    apiKey: ''
  }
};
module.exports = config;
