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
        ['_id', 'surname', 'name', 'username', 'phoneNumber'].forEach(elem => {
            const td = document.createElement('td');
            td.textContent = user[elem];
            tr.appendChild(td);
        })
        table.querySelector('tbody').appendChild(tr);
    })
}

document.querySelector('.users__check-form button').addEventListener('click', (event) => {
    event.preventDefault();
    $.ajax({
        url: "http://localhost:8080/confirmed-membership/find",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({
            userId: document.getElementById('user-id').value,
            type: 'visit'
        }),
        success: (memberships) => {
            console.log(memberships);
            if(memberships.length === 0) {
                alert('У пользователя нет абонементов на количество посещений!');
                window.location.reload();
            } else {
                console.log(memberships[0]._id)
                $.ajax({
                    url: 'http://localhost:8080/confirmed-membership/decrease/' + memberships[0]._id,
                    type: 'PUT',
                    success: () => {
                        console.log('success!');
                        alert('Посещение пользователя успешно отмечено!');
                        window.location.reload();
                    }
                })
            }
        },
        error: () => {
            alert('Пользователь с указанным id не найден!');
            window.location.reload();
        }
    })
})