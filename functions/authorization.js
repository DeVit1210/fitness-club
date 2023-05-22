document.querySelector('.authorization__form').addEventListener('submit', (event) => {
    event.preventDefault();
    $.ajax({
        url: "http://localhost:8080/user/login",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({
            username: document.querySelector('#authorization__mail').value,
            password: document.querySelector('#authorization__password').value
        }),
        success: (data) => {
            const token = data.token;
            console.log(token);
            localStorage.setItem('token', token);
            alert('Авторизация прошла успешно!');
            window.location.href = '../pages/main-page.html';
        },
        error: () => {
            alert('Ошибка авторизации');
            window.location.reload();
        }
    })
})