$.ajax({
    url: "http://localhost:8080/confirmed-membership",
    type: "GET",
    success: (memberships) => {
        buildTable(['Клиент', "Название" ,"Оформлен", "Действителен с", "Статус"], table => {
            console.log(memberships);
            handleConfirmedMemberships(table, memberships)
            document.getElementById('table-container').appendChild(table);
            countTotalCost(memberships);
        })
    }
})

function getMembershipType(value) {
    return value === 'Безлимитный' ? 'period' : (value === 'С тренером' ? 'trainer' : 'visit');
}

document.querySelectorAll('.date_input').forEach(dateInput => {
    dateInput.addEventListener("input", (event) => {
        const input = event.target.value;
        const cleanedInput = input.replace(/\D/g, "");
        event.target.value = getFormattedDate(cleanedInput);
    });
})

document.querySelector('.issued-memberships__filter-form').addEventListener('submit', (event) => {
    event.preventDefault();
    $.ajax({
        url: "http://localhost:8080/confirmed-membership/filter",
        type: "POST",
        data: {
            startDate: document.getElementById('memberships-select__start-date').value,
            endDate: document.getElementById('memberships-select__end-date').value,
            type: getMembershipType(document.getElementById('memberships-select__type').value)
        },
        success: (memberships) => {
            document.getElementById('table-container').innerHTML = '';
            buildTable(['Клиент', "Название" ,"Оформлен", "Действителен с", "Статус"], table => {
                console.log(memberships);
                handleConfirmedMemberships(table, memberships)
                document.getElementById('table-container').appendChild(table);
                countTotalCost(memberships);
            })
        }
    })
})
function createCell(textContent) {
    const td = document.createElement('td');
    td.textContent = textContent;
    return td;
}
function handleConfirmedMemberships(table, memberships) {
    memberships.forEach(confirmedMembership => {
        console.log(confirmedMembership);
        const tr = document.createElement('tr');
        tr.appendChild(createCell(confirmedMembership.user.surname + " " + confirmedMembership.user.name));
        tr.appendChild(createCell(confirmedMembership.membership.name))
        tr.appendChild(createCell(confirmedMembership.confirmationDate.substring(0, 10)));
        tr.appendChild(createCell(confirmedMembership.dateFrom.substring(0, 10)))
        tr.appendChild(createCell(confirmedMembership.status))
        table.querySelector('tbody').appendChild(tr);
    })
}

function countTotalCost(memberships) {
    document.querySelector('.total-income__value').textContent =
        memberships.reduce((accumulator, current) => accumulator + current.membership.price, 0) + " руб."
}


function getFormattedDate(input) {
    let formattedDate = "";
    if (input.length > 0) {
        formattedDate += input.substring(0, 2);
        if (input.length >= 3) {
            formattedDate += "/" + input.substring(2, 4);
            if (input.length > 4) {
                formattedDate += "/" + input.substring(4, 8);
            }
        }
    }
    return formattedDate;
}

