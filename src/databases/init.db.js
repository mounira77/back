import mysql from "mysql";

const pool = mysql.createPool({
  connectionLimit: 10000,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});
//console.log(connection)
pool.getConnection((err, connection) => {
  if (err) throw err;
  console.log('Database connected.');
  //
  // Database related queries here ...
  // It means:             query 1
  //           related sub-query 2
  //           related sub-query 3
  //           ...
  // After all queres call:
  //           connection.release();
});

// Close pool after all queries using:
//
/*pool.end((err) => {
  if (err) throw err;
  console.log('Pool closed.');
});*/
const execQuery = (sql, values = []) => {
  return new Promise((resolve, reject) => {
    pool.query(sql, values, (error, result, fields) => {
      //ce qu'on fait ici une fois que la requête est exécutée
      if (error) {
        reject(error);
        console.log(error);
      }
      resolve(result); // [] en cas de SELECT//sinon objet
  





    })

  });

};


export default execQuery;
