'use strict'

const oracledb = require('oracledb')
const dbConfig = {
  user: process.env.ORA_USER,
  password: process.env.ORA_PASS,
  connectString: process.env.ORA_CONN,
  externalAuth: false,
}

const execSQL = async (sql) => {
  let connection
  try {
    connection = await oracledb.getConnection(dbConfig)
    const result = await connection.execute(
      sql,
      {},
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    )
    return result.rows
  } catch (error) {
    console.error(error.message)
    return []
  } finally {
    try {
      //console.log('Cerramos la conexion 1')
      if (connection) {
        await connection.close()
        //console.log('Cerramos la conexion 2')
      }
    } catch (err) {
      console.error(err.message)
    }
  }
}

module.exports = {
  execSQL,
}
