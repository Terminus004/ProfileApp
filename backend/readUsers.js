const mysql = require('mysql2/promise');

async function readUsers() {
  const connection = await mysql.createConnection({
    host: '',
    user: '',
    database: '',
    password: '',
  });

  try {
    const [rows, fields] = await connection.execute(
      `select uname,email from userCreds`
    );
    await connection.end();
    return rows;
  } catch (err) {
    return err;
  }
}

exports.handler = async (event) => {
  // TODO implement
  try {
    const data = await readUsers();
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        message: 'Welcome to All User Profile!',
        data: data,
      }),
    };
  } catch (err) {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        message: 'error',
      }),
    };
  }
};
