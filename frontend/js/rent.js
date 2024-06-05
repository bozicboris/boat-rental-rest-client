const boatIdInput = document.getElementById('boatid');
const startDateInput = document.getElementById('startDate');
const endDateInput = document.getElementById('endDate');

async function fetchUsers() {
  try {
    const response = await fetch('http://localhost:8000/api/user');
    const users = await response.json();
    return users;
  } catch (error) {
    console.error('Error fetching users:', error);

  }
}



async function fetchBoats() {
  try {
    const response = await fetch('http://localhost:8000/api/boat');
    const boats = await response.json();
    return boats;
  } catch (error) {
    console.error('Error fetching boats:', error);

  }
}

async function handleLogin() {
  const emailInput = document.getElementById('email').value;
  const users = await fetchUsers();

  for (const user of users) {
    if (user.email === emailInput) {
      return user.id;
    }
  }



}

async function handleBoatSelection() {
  const boatNameInput = document.getElementById('boatName').value;
  const boats = await fetchBoats();

  for (const boat of boats) {
    if (boat.boatName === boatNameInput) {
      return boat;
    }
  }


}

function getDays(startDateInput, endDateInput) {

  const startDate = new Date(startDateInput);
  const endDate = new Date(endDateInput);


  if (startDate.getTime() > endDate.getTime()) {
    throw new error('Start date cannot be after end date');
  }

  const differenceInTime = endDate.getTime() - startDate.getTime();
  const differenceInDays = Math.round(differenceInTime / (1000 * 3600 * 24));
  return differenceInDays;
}
function calculatePrice(boat, days) {

  const totalPrice = boat.price * days;
  return totalPrice;
}

async function makeContract() {

  try {
    const userId = await handleLogin();
    const selectedBoat = await handleBoatSelection();
    const days = getDays(startDateInput.value, endDateInput.value);
    const totalPrice = calculatePrice(selectedBoat, days);

    const response = await fetch('http://localhost:8000/api/contracts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user: {
           id: userId 
          },
        boat: selectedBoat,
        startDate: startDateInput.value,
        endDate: endDateInput.value,
        totalCost: totalPrice,
        rentalStatus: "Waiting for Approval"
      })
    });

    if (!response.ok) {
      throw new Error(`Error creating contract: ${response.statusText}`);
    }

    window.location.href = "./home.html";
  } catch (error) {
    console.error('Error:', error.message);

  }
}



document.getElementById('rent-now').addEventListener('click', makeContract);
