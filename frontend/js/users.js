const table = document.getElementById('table');
const template = document.getElementById('user');
if (searchParam != null && searchParam != '') {
    fetch('http://localhost:8000/api/user/email/' + searchParam)
        .then(rsp => {
            if (rsp.status == 200) {
                return rsp.json();
            }
            alert('User not found');
            window.location.href = './users.html';
        })
        .then(data => {
            createUserTableRow(data); 
        })
        .catch(error => console.error('Error fetching user by email:', error));
} else {
    fetch('http://localhost:8000/api/user')
        .then(response => response.json())
        .then(data => {
            createUserTableRows(data); 
        })
        .catch(error => console.error('Error fetching all users:', error));
}
function createUserTableRow(user) {
    const copy = template.content.cloneNode(true);
    copy.querySelector('.id').innerText = user.id;
    copy.querySelector('.email').innerText = user.email;
    copy.querySelector('.password').innerText = user.password;
    copy.querySelector('.username').innerText = user.username;
    copy.querySelector('.isAdmin').innerText = user.admin;
    copy.querySelector('.createdAt').innerText = user.createdAt;
    copy.querySelector('.edit').href = `./edit.html?id=${user.id}`;
    copy.querySelector('.remove').addEventListener('click', () => {
        if (confirm(`Are you sure you want to delete user${user.username} with email${user.email}`)) {
            if(user.admin != true){
                fetch(`http://localhost:8000/api/user/${user.id}`, { 
                    method: 'DELETE'
                })
                .then(rsp => {
                    if (rsp.status == 204) {
                        window.location.href = "./users.html";
                        return;
                    }
                    alert('Edit not successful');
                });
            }else{
                alert('cannot delete admin')
            }
        }
    });
    table.appendChild(copy);
}
function createUserTableRows(users) {
    users.forEach(user => {
        createUserTableRow(user);
    });
}
