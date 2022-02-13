const mysql = require('mysql2/promise');

async function updateUser(input) {
  const connection = await mysql.createConnection({
    host: '',
    user: '',
    database: '',
    password: '',
  });

  try {
    await connection.execute(
      `update userCreds set uname=?,email=?,password=? where uid=?`,
      input
    );
    await connection.end();
  } catch (err) {
    return err;
  }
}

exports.handler = async (event) => {
  let userData = JSON.parse(event.body);
  // TODO implement
  console.log(event);
  try {
    await updateUser([
      userData.uname,
      userData.email,
      userData.password,
      userData.uid,
    ]);
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        message: 'Successfully updated user!',
      }),
    };
  } catch (err) {
    return {
      body: JSON.stringify({
        message: err,
      }),
    };
  }
};
