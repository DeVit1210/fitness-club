const authFormValidation = (callback) => {
    const form = document.querySelector('.authorization__form');
    const emailRegex = /^\w+\@[a-zA-Z]+\.[a-zA-Z]+$/;
    if(!emailRegex.test(form.querySelector('#authorization__mail').value)) {
        callback('Неверно введен адрес электронной почты!');
    } else {
        const passwordRegex = /^((?=.*?[0-9])(?=.*?[a-zA-Z]).{8,})$/;
        if (!passwordRegex.test(form.querySelector('#authorization__password').value)) {
            callback('Пароль должен быть не менее восьми символов и содержать хотя бы 1 цифру!')
        } else callback(null);
    }
}

document.querySelector('.authorization__form').addEventListener('submit', (event) => {
    event.preventDefault();
    authFormValidation((err) => {
        if(err) {
            alert(err);
        } else {
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
        }
    })
})