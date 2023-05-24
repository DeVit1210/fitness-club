const headers = ['ID', 'Название', 'Цена'];
$.ajax({
    url: "http://localhost:8080/membership",
    type: "GET",
    success: (memberships) => {
        buildTable(headers, table => {
            console.log(memberships);
            handleMemberships(table, memberships)
            document.getElementById('table-container').appendChild(table);
        })
    }
})

document.querySelector('.memberships__filter-form .button').addEventListener('click', (event) => {
    event.preventDefault();
    const selectElement = document.getElementById('memberships-select');
    const selectedText = selectElement.options[selectElement.selectedIndex].textContent;
    const type = getMembershipType(selectedText);
    $.ajax({
        url: "http://localhost:8080/membership/find/" + type,
        type: "GET",
        success: (memberships) => {
            buildTable(headers, table => {
                handleMemberships(table, memberships);
                document.getElementById('table-container').innerHTML = '';
                document.getElementById('table-container').appendChild(table);
            })
        }
    })
})

const membershipAddForm = document.querySelector('.memberships__add-form');
membershipAddForm.addEventListener('submit', () => {
    $.ajax({
        url: "http://localhost:8080/membership/add/" + getMembershipType(document.getElementById('add-membersip__type').value),
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({
            name: document.getElementById('add-membersip__name').value,
            price: document.getElementById('add-membersip__price').value,
        }),
        success: () => alert("Добавление абонемента выполнено успешно!"),
        error: () => alert("Ошибка добавления абонемента")
    })
})

const membershipUpdateForm = document.querySelector('.memberships__edit-form');
const membershipIdToUpdate = membershipUpdateForm.querySelector('#edit-membersip__id');
membershipIdToUpdate.addEventListener('change', () => {
    $.ajax({
        url: "http://localhost:8080/membership/" + membershipIdToUpdate.value,
        type: "GET",
        success: (membership) => {
            document.getElementById('edit-membersip__name').value = membership.name,
            document.getElementById('edit-membersip__price').value = membership.price
        },
        error: () => alert("id указан неверно!")
    })
})
membershipUpdateForm.addEventListener('submit', (event) => {
    event.preventDefault();
    $.ajax({
        url: "http://localhost:8080/membership/" + membershipIdToUpdate.value,
        type: "PUT",
        contentType: "application/json",
        data: JSON.stringify({
            name: document.getElementById('edit-membersip__name').value,
            price: document.getElementById('edit-membersip__price').value,
        }),
        success: () => alert("Редактирование абонемента выполнено успешно!"),
        error: () => alert("Ошибка редактирования абонемента")
    })
})

document.querySelector('.memberships__del-form').addEventListener('submit', () => {
    $.ajax({
        url: "http://localhost:8080/membership/" + document.getElementById('del-membersip__id').value,
        type: "DELETE",
        success: () => alert('Данные об абонементе успешно удалены!')
    })
})

function getMembershipType(value) {
    return value === 'Безлимитный' ? 'period' : (value === 'С тренером' ? 'trainer' : 'visit');
}
function handleMemberships(table, memberships) {
    memberships.forEach(membership => {
        const tr = document.createElement('tr');
        ['_id', 'name', 'price'].forEach(elem => {
            const td = document.createElement('td');
            td.textContent = membership[elem];
            tr.appendChild(td);
        })
        table.querySelector('tbody').appendChild(tr);
    })
}



