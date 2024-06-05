const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
console.log(urlParams)
console.log(window.location.search)
if (!id) {
    window.location.href = './contracts.html';
}
const rentalStatus = document.getElementById('rentalStatus');
const predefinedContractsTypes = [
    'WAITING FOR APPROVAL', 'APPROVED', 'CANCELED'
];
function populateBoatTypes() {
    return fetch('http://localhost:8000/api/contracts')
        .then(rsp => {
            if (!rsp.ok) {
                throw new Error('error');
            }
            return rsp.json();
        })
        .then(data => {
            console.log('Boat data for types:', data);
            let statusTypes = predefinedContractsTypes;

            boatTypes.forEach(statusTypes => {
                const option = document.createElement('option');
                option.value = statusTypes;
                option.text = statusTypes;
                type.appendChild(option);
            });
            console.log('Boat types added to select:', statusTypes);
        })

}
function fetchContractDetails(id) {
    return fetch(`http://localhost:8000/api/contracts/${id}`)
        .then(rsp => {
            if (!rsp.ok) {
                window.location.href = './contracts.html';
                throw new Error('error');
            }
            return rsp.json();
        })
        .then(data => {
            console.log('Specific boat data:', data);
            rentalStatus.value = data.type || '';
            document.getElementById('save').addEventListener('click', () => {
                fetch(`http://localhost:8000/api/boat/${data.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        rentalStatus: type.value,
                    })
                })
                    .then(rsp => {
                        if (rsp.ok) {
                            window.location.href = './contracts.html';
                        } else {
                            alert('Edit not successful');
                        }
                    })

            });
        })

}
populateContractTypes()
    .then(() => fetchContractDetails(id))
    .catch(error => console.error('Error in populating boat types or fetching details:', error));
