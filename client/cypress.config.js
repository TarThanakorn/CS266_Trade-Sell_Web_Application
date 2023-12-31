const { defineConfig } = require("cypress");
const mysql = require('mysql');
module.exports = defineConfig({
  component: {
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
    },
  },

  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        queryDB : (query)=>{
          return queryDB(query, config)
        }
        
      })
    },
  },
  "env" : {
    "db" : {
      host:"localhost",
      user:"root",
      password: process.env.DB_KEY,
      database:"blog"
    }
  },
});

function queryDB(query, config){
  const connection = mysql.createConnection(config.env.db)
  connection.connect()
  return new Promise((resolve, reject)=>{
    connection.query(query,(error,results)=>{
      if (error) reject(error)
      else {
        connection.end()
        return resolve(results)
      }
    })
  })
}