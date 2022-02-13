const mysql = require('mysql2/promise');

async function readUser(input) {
  const connection = await mysql.createConnection({
    host: '',
    user: '',
    database: '',
    password: '',
  });

  try {
    const [rows, fields] = await connection.execute(
      `select uname,email from userCreds where uid=?`,
      input
    );
    await connection.end();
    return rows[0];
  } catch (err) {
    return err;
  }
}

exports.handler = async (event) => {
  let userData = event.queryStringParameters;
  // TODO implement
  console.log(event);
  try {
    const data = await readUser([userData.uid]);
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        message: 'Welcome to User Profile!',
        uname: data.uname,
        email: data.email,
      }),
    };
  } catch (err) {
    return {
      body: JSON.stringify({
        message: 'error',
      }),
    };
  }
};
