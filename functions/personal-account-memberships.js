function getMembershipType(value) {
    if(value === 'Все') return 'Все';
    return value === 'Безлимитный' ? 'ConfirmedPeriodMembership'
        : (value === 'С тренером' ? 'ConfirmedPersonalTrainerMembership'
            : 'ConfirmedVisitMembership');
}

function getStatus(value)  {
    if(value === 'Все') return 'Все';
    return value === 'Активный' ? 'active'
        : (value === 'Использованный' ? 'expired'
            : 'future');
}

const membershipContainer = document.querySelector('.memberships');
$.ajax({
    url: "http://localhost:8080/confirmed-membership/user/find",
    type: "GET",
    headers: { 'Authorization': localStorage.getItem('token') },
    success: (memberships) => {
        memberships.forEach(membership => buildMembership(membership, (card) => {
            membershipContainer.appendChild(card);
        }));
    }
})

const membershipStatusSelect = document.getElementById('memberships-select__status');
const membershipTypeSelect = document.getElementById('memberships-select__type');

const submitButton = document.querySelector('.memberships__filter-form button');
submitButton.addEventListener('click', (event) => {
    event.preventDefault();
    const status = getStatus(membershipStatusSelect.value);
    const type = getMembershipType(membershipTypeSelect.value);
    membershipContainer.innerHTML = '';
    $.ajax({
        url: "http://localhost:8080/confirmed-membership/user/find",
        type: "GET",
        headers: { 'Authorization': localStorage.getItem('token') },
        success: (memberships) => {
            memberships.filter(membership => {
                if(status === 'Все' && type === 'Все') return true;
                if(status === 'Все' && type === membership.__t) return true;
                if(status === membership.status && type === 'Все') return true;
                return status === membership.status && type === membership.__t;
            }).forEach(membership => buildMembership(membership, (card) => membershipContainer.appendChild(card)));
        }
    })
})