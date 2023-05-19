$.ajax({
    url: "http://localhost:8080/user",
    type: "GET",
    success: (users) => {
        buildTable(['Фамилия', 'Имя', 'Электронная почта', 'Номер телефона'], table => {
            console.log(users);
            handleUsers(table, users)
            document.getElementById('table-container').appendChild(table);
        })
    }
})

function handleUsers(table, users) {
    users.forEach(user => {
        const tr = document.createElement('tr');
        ['surname', 'name', 'username', 'phoneNumber'].forEach(elem => {
            const td = document.createElement('td');
            td.textContent = user[elem];
            tr.appendChild(td);
        })
        table.querySelector('tbody').appendChild(tr);
    })
}

