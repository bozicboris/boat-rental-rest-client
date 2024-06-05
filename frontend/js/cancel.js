const urlParams = new URLSearchParams(window.location.search);
const contractId = urlParams.get('id');
console.log('URL Parameters:', urlParams);
console.log('Query String:', window.location.search);

if (contractId === null || contractId === '') {
    window.location.href = './contracts.html';
}

const contractInput = document.querySelector('#contractId');
const approveButton = document.getElementById('cancel');

function fetchContractDetails(id) {
    return fetch(`http://localhost:8000/api/contracts/${id}`)
        .then(rsp => {
            if (!rsp.ok) {
                console.error('error');
            }
            return rsp.json();
        })
        .then(data => {
            const userId = data.user.id;
            const boatId = data.boat.id;
            const startDate = data.startDate;
            const endDate = data.endDate;
            const totalCost = data.totalCost;

            contractInput.value = data.id;
            return {
                userId, boatId, startDate, endDate, totalCost
            };
        })

}

approveButton.addEventListener('click', async () => {
    try {
        console.log(`Approving contract ID: ${contractId}`);

        const contractDetails = await fetchContractDetails(contractId);

        const {
            userId, boatId, startDate, endDate, totalCost
        } = contractDetails;




        const response = await fetch(`http://localhost:8000/api/contracts/${contractId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: {
                    id: userId
                },
                boat: {
                    id: boatId
                },
                startDate,
                endDate,
                totalCost,
                rentalStatus: 'CANCELED'
            })
        });

        if (response.ok) {
            window.location.href = './contracts.html';
        } else {
            alert('Approval not successful');
        }
    } catch (error) {
        alert(error)
    }
});

fetchContractDetails(contractId);
