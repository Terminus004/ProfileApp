const mysql = require('mysql2/promise');

async function createUser(input) {
  const connection = await mysql.createConnection({
    host: '',
    user: '',
    database: '',
    password: '',
  });

  try {
    await connection.execute(
      `insert into userCreds(uname,email,password) values(?,?,?)`,
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
    await createUser([userData.uname, userData.email, userData.password]);
    return {
      body: JSON.stringify({
        message: 'Successfully created user!',
      }),
    };
  } catch (err) {
    return { error: err };
  }
};
