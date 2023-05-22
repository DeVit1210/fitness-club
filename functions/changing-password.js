document.querySelector('.password__change-form').addEventListener('submit', (event) => {
    event.preventDefault();
    $.ajax({
        url: "http://localhost:8080/user/change-password",
        type: "POST",
        contentType: "application/json",
        headers: {
            "Authorization": localStorage.getItem('token')
        },
        data: JSON.stringify({
            oldPassword: document.getElementById('change-password__old').value,
            newPassword: document.getElementById('change-password__new').value,
            newPasswordRepeat: document.getElementById('change-password__new-double').value
        }),
        success: () => {
            alert('Пароль обновлен успешно!');
            window.location.reload();
        }
    })
})