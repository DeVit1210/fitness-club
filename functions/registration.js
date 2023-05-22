document.querySelector('.registration__form').addEventListener('submit', (event) => {
    event.preventDefault();
    $.ajax({
        url: "http://localhost:8080/user/register",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({
            username: document.querySelector('#registration__mail').value,
            password: document.querySelector('#registration__password').value,
            surname: document.querySelector('#registration__surname').value,
            name: document.querySelector('#registration__name').value,
            phoneNumber: document.querySelector('#registration__number').value
        }),
        success: (data) => {
            const token = data.token;
            console.log(token);
            localStorage.setItem('token', token);
            alert('Регистрация завершена успешно!');
            window.location.href = '../pages/main-page.html';
        },
        error: () => {
            alert('Ошибка регистрации!');
            window.location.reload();
        }
    })
})