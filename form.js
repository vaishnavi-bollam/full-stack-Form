const saveDetailsBtn = document.getElementById("register");
const loginBtn = document.getElementById("login");
const uName = document.getElementById("name");
const email = document.getElementById("email");
const password = document.getElementById("password");
const successMsg = document.getElementById("successMsg");

const loginForm = document.getElementById("loginform");

saveDetailsBtn.addEventListener("click",async()=>{
    // alert("vaishnavi");
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
      successMsg.textContent = "vaishu";
      successMsg.style.color = "red";
      })
    
})

