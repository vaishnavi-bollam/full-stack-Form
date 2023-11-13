const saveDetailsBtn = document.getElementById("register");
const loginBtn = document.getElementById("login");
const uName = document.getElementById("name");
const email = document.getElementById("email");
const password = document.getElementById("password");
const successMsg = document.getElementById("successMsg");
const registerform = document.getElementById("registerform");
const loginform = document.getElementById("loginform");
const login = document.getElementById("login");

const loginemail=document.getElementById("loginemail");
const loginpassword=document.getElementById("loginpassword");
const btnlogin = document.getElementById("btnlogin");


saveDetailsBtn.addEventListener("click",async()=>{
    const userDetails = {
        userName : uName.value,
        userEmail : email.value,
        userPassword: password.value
    }
    
    fetch("http://localhost:8384/details/",{
        method: 'POST' ,
        headers:{
            'Content-Type':"application/json"
        },
        body:JSON.stringify(userDetails)

    })
    .then(function(response){
        console.log('hkhjkj',response)
        return response.json()
    })
    .then((data) => {
      console.log('ds',data)
      successMsg.textContent = data.text;
      })
    
})

login.addEventListener("click",async()=>{
    // alert("dyxyh")
    loginform.style.display="block";
    registerform.style.display="none";
    successMsg.textContent=""
})


btnlogin.addEventListener("click",async()=>{
    const userDetails = {
        userEmail : loginemail.value,
        userPassword: loginpassword.value
    }
    
    fetch("http://localhost:8384/login",{
        method: 'POST' ,
        headers:{
            'Content-Type':"application/json"
        },
        body:JSON.stringify(userDetails)

    })
    .then(function(response){
        console.log('hkhjkj',response)
        return response.json()
    })
    .then((data) => {
      console.log('ds',data)
      successMsg.textContent = data.text;
      })
    
})