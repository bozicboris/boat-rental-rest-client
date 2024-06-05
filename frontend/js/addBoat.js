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
    predefinedBoatTypes.forEach(boatType => {
        const option = document.createElement('option');
        option.value = boatType;
        option.text = boatType;
        type.appendChild(option);
    });
}


populateBoatTypes();

document.getElementById('save').addEventListener('click', () => {
    if (boatName.value == null || boatName.value == '') {
        alert('Boat name cannot be empty');
        return;
    }
    if (type.value == null || type.value == '') {
        alert('Boat type cannot be empty');
        return;
    }
    if (year.value == null || year.value == '') {
        alert('Boat year cannot be empty');
        return;
    }
    if (capacity.value == null || capacity.value == '') {
        alert('Boat capacity cannot be empty');
        return;
    }
    if (price.value == null || price.value == '') {
        alert('Boat price cannot be empty');
        return;
    }
    fetch('http://localhost:8000/api/boat', {
        method: 'POST',
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
            window.location.href = "./boats.html";
        } else {
            alert('Addition not successful');
        }
    })
    .catch(error => console.error('Error adding boat:', error));
});
