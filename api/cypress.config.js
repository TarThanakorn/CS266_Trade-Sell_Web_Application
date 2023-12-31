import { defineConfig } from 'cypress'
import mysql from 'mysql'

export default defineConfig({
  // setupNodeEvents can be defined in either
  // the e2e or component configuration
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
})

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