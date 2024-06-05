

document.addEventListener("DOMContentLoaded", function () {
    const table = document.getElementById('table');
    const template = document.getElementById('contract');

    const urlParams = new URLSearchParams(window.location.search);
    const searchParam = urlParams.get('search');

    if (searchParam != null && searchParam.trim() !== '') {
        fetch(`http://localhost:8000/api/contracts/${searchParam}`)
            .then(response => response.json())
            .then(data => {
                createContractTableRows(data);
            })
            .catch(error => console.error('Error fetching contract by parameter:', error));
    } else {
        fetch('http://localhost:8000/api/contracts')
            .then(response => response.json())
            .then(data => {
                console.log('Fetched all contracts data:', data);
                createContractTableRows(data);
            })
            .catch(error => console.error('Error fetching all contracts:', error));
    }
    function createContractTableRow(contract) {
        const copy = template.content.cloneNode(true);
        copy.querySelector('.id').innerText = contract.id;
        copy.querySelector('.user').innerText = contract.user.id;
        copy.querySelector('.boat').innerText = contract.boat.id;
        copy.querySelector('.startDate').innerText = contract.startDate;
        copy.querySelector('.endDate').innerText = contract.endDate;
        copy.querySelector('.totalCost').innerText = contract.totalCost;
        copy.querySelector('.rentalStatus').innerText = contract.rentalStatus;
        copy.querySelector('.approve').href = `./approve.html?id=${contract.id}`;
        copy.querySelector('.cancel').href = `./cancel.html?id=${contract.id}`;
        table.appendChild(copy);
    }
    function createContractTableRows(contracts) {
        if (Array.isArray(contracts)) {
            contracts.forEach(contract => {
                createContractTableRow(contract);
            });
        } else {
            createContractTableRow(contracts);
        }
    }
});
