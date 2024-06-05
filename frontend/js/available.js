
document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById('card-container');
    const template = document.getElementById('card-template');

    const boatTypeImages = {
        "MOTORSAILER": "Assets/motorsailer.jpg",
        "DAYSAILER": "Assets/daysailer.jpg",
        "CATAMARAN": "Assets/catamaran.jpeg",
        "TRIMARAN": "Assets/trimaran.jpg",
        "MONOHULL": "Assets/monohull.jpg",
        "DINGHY": "Assets/dinghy.jpg",
        "MOTOR_YACHT": "Assets/motorYacht.jpg",
        "SAILING_YACHT": "Assets/sailing-yacht.jpg",
        "JET_SKI": "Assets/jetskijpeg.jpeg" 
    };

    const urlParams = new URLSearchParams(window.location.search);
    const searchParam = urlParams.get('search');

    if (searchParam != null && searchParam.trim() !== '') {
        fetch(`http://localhost:8000/api/boat/${searchParam}`) 
            .then(response => response.json())
            .then(data => {
                createBoatCards(data);
            });
    } else {
        fetch('http://localhost:8000/api/boat')
            .then(response => response.json())
            .then(data => {
                createBoatCards(data);
            });
    }
    function createBoatCards(data) {
        if (Array.isArray(data)) {
            data.forEach(boat => {
                const copy = template.content.cloneNode(true);
                console.log(boat.id)
                copy.querySelector('.boatName').innerText = boat.boatName;
                copy.querySelector('.type').innerText = `Type: ${boat.type}`;
                copy.querySelector('.year').innerText = `Year: ${boat.year}`;
                copy.querySelector('.capacity').innerText = `Capacity: ${boat.capacity}`;
                copy.querySelector('.price').innerText = `Price: ${boat.price}`;
                
                const imgSrc = boatTypeImages[boat.type] || boatTypeImages["Default"];
                copy.querySelector('img').src = imgSrc;

                container.appendChild(copy);
            });
        }
    }
});





