const config = {
  app: {
    port: 8080,
    limit: '100kb' 
  },
  sequelize: {
    connectionLimit: 25,
    host: '127.0.0.1',
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
