const email = document.getElementById('email')
const password = document.getElementById('password')
const username = document.getElementById('username')
const admin = document.getElementById('admin')



document.getElementById('save').addEventListener('click',()=>{
    if(email.value == null || email.value == ''){
        alert('email cannot be empty')
        return
    }
    if(password.value == null || password.value == ''){
        alert('password cannot be empty')
        return
    }
    if(username.value == null || username.value == ''){
        alert('username cannot be empty')
        return
    }
    if(admin.value == null || admin.value == ''){
        alert('admin status cannot be empty')
        return
    }
    console.log(admin.value)
   
    fetch('http://localhost:8000/api/user',{
    method: 'POST',
    headers:{
        'Content-Type': 'application/json'

    },
    body: JSON.stringify({
        email: email.value,
        password: password.value,
        username: username.value,
        admin: admin.value
       
    })
}).then(rsp=>{
    if(rsp.ok){
        window.location.href = "./users.html"
        return
    }
    alert('Addition not succesfull')
})
})

