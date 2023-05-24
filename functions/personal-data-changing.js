$.ajax({
    url: "http://localhost:8080/user/find",
    type: "GET",
    headers: {
        'Authorization': localStorage.getItem('token')
    },
    success: (user) => {
        document.getElementById('edit-data__surname').value = user.surname;
        document.getElementById('edit-data__name').value = user.name;
        document.getElementById('edit-data__phone').value = user.phoneNumber;
    }
})


document.querySelector('.personal-data__edit-form').addEventListener('submit', (event) => {
    event.preventDefault();
    $.ajax({
        url: "http://localhost:8080/user/update",
        type: "POST",
        contentType: "application/json",
        headers: {
            'Authorization': localStorage.getItem('token')
        },
        data: JSON.stringify({
            surname: document.getElementById('edit-data__surname').value,
            name: document.getElementById('edit-data__name').value,
            phoneNumber: document.getElementById('edit-data__phone').value
        }),
        success: () => {
            alert('Обновление данных произошло успешно!');
            window.location.reload();
        }
    })
})