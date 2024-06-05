document.addEventListener("DOMContentLoaded", function () {
    const table = document.getElementById('table');
    const template = document.getElementById('boat');

    const urlParams = new URLSearchParams(window.location.search);
    const searchParam = urlParams.get('search');


    if (searchParam != null && searchParam.trim() !== '') {
        fetch(`http://localhost:8000/api/boat/${searchParam}`)
            .then(response => response.json())
            .then(data => {
                createBoatTableRows(data);
            })
    } else {
        fetch('http://localhost:8000/api/boat')
            .then(response => response.json())
            .then(data => {

                createBoatTableRows(data);
            })
    }
    function createBoatTableRows(data) {
        if (Array.isArray(data)) {
            data.forEach(boat => {
                const copy = template.content.cloneNode(true);
                copy.querySelector('.id').innerText = boat.id;
                copy.querySelector('.boatName').innerText = boat.boatName;
                copy.querySelector('.type').innerText = boat.type;
                copy.querySelector('.year').innerText = boat.year;
                copy.querySelector('.capacity').innerText = boat.capacity;
                copy.querySelector('.price').innerText = boat.price;
                copy.querySelector('.createdAt').innerText = boat.createdAt;
                copy.querySelector('.edit').href = `./editboat.html?id=${boat.id}`;
                copy.querySelector('.remove').addEventListener('click', () => {
                    if (confirm(`Are you sure you want to delete boat ${boat.boatName}`)) {
                        fetch(`http://localhost:8000/api/boat/${boat.id}`, {
                            method: 'DELETE'
                        })
                            .then(rsp => {
                                if (rsp.status == 204) {
                                    window.location.href = "./boats.html";
                                    return;
                                }
                                alert('Delete not succesfull');
                            });
                    }
                });

                table.appendChild(copy);
            });
        }

    }


});
