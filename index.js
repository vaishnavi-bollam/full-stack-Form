const express = require("express");
const path = require("path");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const cors = require('cors');
const bcrypt = require("bcrypt");

const app = express();
app.use(cors());
app.use(express.json());
app.set("view engine","html")

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
  if (getUser === undefined) {
    
    if (userPassword.length < 5) {
      console.log("Password is too short");
      
      res.send({userEmail});
    } else {
      const hashedPassword = await bcrypt.hash(req.body.userPassword, 10);
      const createUserQuery = `INSERT INTO userDetails (name, email, password) VALUES ('${userName}', '${userEmail}', '${hashedPassword}');`;
      const createUser = await db.run(createUserQuery);
      console.log("User created successfully");
      
      res.json({userEmail});
    }
  } else {
    console.log("user already exists");
    
    res.json({userEmail});
    
  }
});

app.get("/profile",(req,res)=>{
  res.sendFile(path.join(__dirname,"profile.html"))
})



