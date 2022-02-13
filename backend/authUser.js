const mysql = require('mysql2/promise');

async function authUser(input) {
  const connection = await mysql.createConnection({
    host: '',
    user: '',
    database: '',
    password: '',
  });

  try {
    const [rows, fields] = await connection.execute(
      `select uid from userCreds where email=? and password=?;`,
      input
    );
    await connection.end();
    return rows[0].uid;
  } catch (err) {
    return err;
  }
}

exports.handler = async (event) => {
  let userData = event.queryStringParameters;
  // TODO implement
  console.log(userData);
  try {
    const id = await authUser([userData.email, userData.password]);
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        message: 'Successfully loggedin !',
        uid: id,
      }),
    };
  } catch (err) {
    return {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        message: err,
      }),
    };
  }
};
