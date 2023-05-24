const registrationValidation = (callback) => {
    const form = document.querySelector('.registration__form');
    const emailRegex = /^\w+\@[a-zA-Z]+\.[a-zA-Z]+$/;
    if(!emailRegex.test(form.querySelector('#registration__mail').value)) {
        callback('Неверно введен адрес электронной почты!');
    } else {
        const passwordRegex = /^((?=.*?[0-9])(?=.*?[a-zA-Z]).{8,})$/;
        if (!passwordRegex.test(form.querySelector('#registration__password').value)) {
            callback('Пароль должен быть не менее восьми символов и содержать хотя бы 1 цифру!')
        } else {
            const phoneNumberRegex = /^\+375\s\(\d{2}\)\s\d{3}\-\d{2}\-\d{2}$/;
            if(!phoneNumberRegex.test(form.querySelector('#registration__number').value)) {
                callback('Введите номер телефона в формате +375 (**) ***-**-**');
            } else callback(null);
        }
    }
}

document.querySelector('.registration__form').addEventListener('submit', (event) => {
    event.preventDefault();
    registrationValidation((err) => {
        if(err) alert(err)
        else {
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
        }
    })
})