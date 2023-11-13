const express = require("express");
const path = require("path");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const cors = require('cors');
const bcrypt = require("bcrypt");

const app = express();
app.use(cors());
app.use(express.json());


const dbPath = path.join(__dirname, "userDetails.db");
let db = null;
const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(8384, () => {
      console.log("Server Running at http://localhost:8384/");
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};
initializeDBAndServer();


app.post("/details/", async (req, res) => {
    const {userName,userEmail,userPassword} = req.body;
    console.log(userName);
    console.log(userEmail);
  
  const checkUserExistsQuery = `SELECT * FROM userDetails WHERE name = '${userName}'`;
  const getUser = await db.get(checkUserExistsQuery);
  console.log("user details fetched")
  if (getUser === undefined && userName!==""  && userEmail!=="" && userPassword!=="") {
    
    if (userPassword.length < 5) {
      console.log("Password is too short");
      
      res.send({text:"Password is too short"});
    } else {
      const hashedPassword = await bcrypt.hash(req.body.userPassword, 10);
      const createUserQuery = `INSERT INTO userDetails (name, email, password) VALUES ('${userName}', '${userEmail}', '${hashedPassword}');`;
      const createUser = await db.run(createUserQuery);
      console.log("User created successfully");
      
      res.json({text:"User created successfully"});
    }
  } 
  else if(userName==="" || userEmail==="" || userPassword===""){
    res.json({text:"Please fill all details"});
  }
  else {
    console.log("user already exists");
    
    res.json({text:"user already exists"});
    
  }
});



app.post("/login", async (req, res) => {
  const { userEmail,userPassword } = req.body;
  console.log(userEmail);

  const loginUserQuery = `SELECT * FROM userDetails WHERE email = '${userEmail}';`;
  const loginUser = await db.get(loginUserQuery);
  if (loginUser !== undefined && userPassword!=="" && userEmail!=="") {
    const isPasswordMatched = await bcrypt.compare(
      req.body.userPassword,
      loginUser.password
    );
    if (isPasswordMatched) {
      
      console.log("Login success!");
      res.json({text:"Login success!"});
    } else {
      
      console.log("Invalid password");
      res.json({text:"Invalid password"});
    }
  } 
  else if (userPassword==="" || userEmail===""){
    console.log("Please fill all details");
    res.json({text:"Please fill all details"});
  }
  
  else {
   
    console.log("Invalid user");
    res.json({text:"Invalid user"});
  }
});
