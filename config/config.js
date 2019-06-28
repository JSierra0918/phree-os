module.exports = {

    development: {
      username: "root",
      password: process.env.MY_SQL_PW,
      database: "pointOfSales",
      host: "localhost",
      dialect: "mysql"
    },
    test: {
      username: "root",
      password: process.env.MY_SQL_PW,
      database: "pointOfSales",
      host: "localhost",
      dialect: "mysql",
      logging: false
    },
    production: {
      use_env_variable: "JAWSDB_URL",
      dialect: "mysql"
    }
  };