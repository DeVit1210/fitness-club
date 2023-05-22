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