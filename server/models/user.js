/* const users = [
  {
    
    Username:"likhi@gmail.com",
    Password:"bjhjshbkjbi"
  },
  {
    
    Username:"deepu@gmail.com",
    Password:"ioiojkhhu"
  },
  {
    
    Username:"dingdong@gmail.com",
    Password:"nijoihuv"
  }
];
*/




const con = require("./db_connect");

// Table Creation 
async function createTable() {
  let sql=`CREATE TABLE IF NOT EXISTS users (
    userID INT NOT NULL AUTO_INCREMENT,
    Firstname VARCHAR(255) NOT NULL ,
    Lastname VARCHAR(255) NOT NULL ,
    Username VARCHAR(255) NOT NULL ,
    Password VARCHAR(255) NOT NULL,
    CONSTRAINT userPK PRIMARY KEY(userID)
  ); `
  await con.query(sql);
}
createTable();


//grabbing all users in database
async function getAllUsers() {
  const sql = `SELECT * FROM users;`;
  let users = await con.query(sql);
  console.log(users)
}

//Create  User - Registering
async function register(user) {
  let cUser = await getUser(user);
  if(cUser.length > 0) throw Error("Username already in use");

  const sql = `INSERT INTO users (Firstname,Lastname,Username,Password)
    VALUES ("${user.Firstname}","${user.Lastname}","${user.Username}","${user.Password}")
  `
  await con.query(sql);
  return await login(user);
}



// Read User -- login user
async function login(user) { // {userName: "sda", password: "gsdhjsga"}
  let cUser = await getUser(user); //[{userName: "cathy123", password: "icecream"}]
  if(!cUser[0]) throw Error("email not found");
  if(cUser[0].Password !== user.Password) throw Error("Password incorrect");
  console.log(cUser[0]);
  return cUser[0];
}

// Update User function
async function editUser(user) {
  let sql = `UPDATE users 
    SET  Username = "${user.Username}"
    WHERE userID = ${user.userID}
  `;

  await con.query(sql);
  let updatedUser = await getUser(user);
  return updatedUser[0];
}

// Delete User function
async function deleteUser(user) {
  let sql = `DELETE FROM users
    WHERE userID = ${user.userID}
  `
  await con.query(sql);
}

// Useful Functions
async function getUser(user) {
  let sql;

  if(user.userID) {
    sql = `
      SELECT * FROM users
       WHERE userID = ${user.userID}
    `
  } else {
    sql = `
    SELECT * FROM users 
      WHERE Username = "${user.Username}"
  `;
  }
  return await con.query(sql);  
}



// "database" as object literal




  
  function getAllUsers() {
    return users;
  }
  
  module.exports = { getAllUsers, login, register, editUser, deleteUser};