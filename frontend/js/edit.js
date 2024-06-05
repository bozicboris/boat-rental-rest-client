
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
if (!id) {
    window.location.href = './users.html';
}
const email =  document.getElementById('email')
const password =  document.getElementById('password')
const username =  document.getElementById('username')
const admin =  document.getElementById('admin')
fetch(`http://localhost:8000/api/user/${id}`)
    .then(rsp => {
        if (rsp.status == 200)
            return rsp.json()
        console.log('200 is there')
        window.location.href = './users.html'
        console.log('200 not there')
    })
    .then(data => {      
        email.value = data.email;
        password.value = data.password;
        username.value = data.username;
        const save = document.getElementById('save').addEventListener('click', ()=>{
            fetch(`http://localhost:8000/api/user/${data.id}`,{   
                method: 'put',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email.value,
                    password: password.value,
                    username: username.value,     
                })
            })
            .then(rsp=>{
                if(rsp.ok){
                    window.location.href = "./users.html"
                    return
                }
                alert('Edit not succesfull')
            })
        })
    })
    .catch(error => {
        console.error('Fetch error:', error);
        window.location.href = './users.html';
    });
  