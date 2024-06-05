const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
console.log(urlParams)
console.log(window.location.search)
if (!id) {
    window.location.href = './boats.html';
}
const boatName = document.getElementById('boatName');
const type = document.getElementById('type');
const year = document.getElementById('year');
const capacity = document.getElementById('capacity');
const price = document.getElementById('price');
const predefinedBoatTypes = [
    'MONOHULL', 'CATAMARAN', 'TRIMARAN', 'DAYSAILER', 'DINGHY', 
    'MOTORSAILER', 'MOTOR_YACHT', 'SAILING_YACHT'
];
function populateBoatTypes() {
    return fetch('http://localhost:8000/api/boat')
        .then(rsp => {
            if (!rsp.ok) {
                throw new Error('error');
            }
            return rsp.json();
        })
        .then(data => {
            console.log('Boat data for types:', data);  
            let boatTypes = predefinedBoatTypes; 

            if (Array.isArray(data)) {
                const fetchedTypes = data.map(boat => boat.type);
                boatTypes = [...new Set([...boatTypes, ...fetchedTypes])]; //found on stack overflow
            }
            boatTypes.forEach(boatType => {
                const option = document.createElement('option');
                option.value = boatType;
                option.text = boatType;
                type.appendChild(option);
            });
            console.log('Boat types added to select:', boatTypes);
        })
        .catch(error => console.error('Error fetching boats for types:', error));
}
function fetchBoatDetails(id) {
    return fetch(`http://localhost:8000/api/boat/${id}`)
        .then(rsp => {
            if (!rsp.ok) {
                window.location.href = './boats.html';
                throw new Error('Network response was not ok ' + rsp.statusText);
            }
            return rsp.json();
        })
        .then(data => {
            console.log('Specific boat data:', data);
            boatName.value = data.boatName;
            type.value = data.type;
            year.value = data.year;
            capacity.value = data.capacity;
            price.value = data.price;
            document.getElementById('save').addEventListener('click', () => {
                fetch(`http://localhost:8000/api/boat/${data.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        boatName: boatName.value,
                        type: type.value,
                        year: year.value,
                        capacity: capacity.value,
                        price: price.value
                    })
                })
                .then(rsp => {
                    if (rsp.ok) {
                        window.location.href = './boats.html';
                    } else {
                        alert('Edit not successful');
                    }
                })
                .catch(error => console.error('Error updating boat:', error));
            });
        })
        .catch(error => console.error('Error fetching boat data:', error));
}
populateBoatTypes()
    .then(() => fetchBoatDetails(id))
    .catch(error => console.error('Error in populating boat types or fetching details:', error));
