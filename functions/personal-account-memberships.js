function getMembershipType(value) {
    return value === 'Безлимитный' ? 'ConfirmedPeriodMembership'
        : (value === 'С тренером' ? 'ConfirmedPersonalTrainerMembership'
            : 'ConfirmedVisitMembership');
}

const membershipContainer = document.querySelector('.memberships');

$.ajax({
    url: "http://localhost:8080/user/findMemberships",
    type: "GET",
    headers: { 'Authorization': localStorage.getItem('token') },
    success: (memberships) => {
        memberships.forEach(membership => buildMembership(membership, (card) => membershipContainer.appendChild(card)));
    }
})

const membershipStatusSelect = document.getElementById('memberships-select__status');
membershipStatusSelect.addEventListener('click', (event) =>{
    event.preventDefault();
    const selectValue = membershipStatusSelect.value;
    $.ajax({
        url: "http://localhost:8080/user/findMemberships/" + selectValue.toLowerCase(),
        type: "GET",
        headers: { 'Authorization' : localStorage.getItem('token') },
        success: (memberships) => {
            membershipContainer.innerHTML = '';
            memberships.forEach(membership => buildMembership(membership, (card) => membershipContainer.appendChild(card)))
        }
    })
})

const membershipTypeSelect = document.getElementById('memberships-select__type');
membershipTypeSelect.addEventListener('click', (event) => {
    event.preventDefault();
    const selectValue = membershipTypeSelect.value;
    $.ajax({
        url: "http://localhost:8080/user/findMemberships",
        type: "GET",
        headers: { 'Authorization': localStorage.getItem('token') },
        success: (memberships) => {
            membershipContainer.innerHTML = '';
            memberships
                .filter(membership => membership.__t === getMembershipType(selectValue))
                .forEach(membership => buildMembership(membership, (card) => membershipContainer.appendChild(card)));
        }
    })
})