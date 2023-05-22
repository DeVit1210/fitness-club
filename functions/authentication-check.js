const headerButtonsContainer = document.querySelector('.header__buttons');
headerButtonsContainer.innerHTML = '';

if(localStorage.getItem('token')) {
    const personalAccountButton = document.createElement('button');
    personalAccountButton.classList.add('button');
    personalAccountButton.classList.add('button_colored');
    personalAccountButton.textContent = "Личный кабинет";
    personalAccountButton.addEventListener('click', (event) => {
        event.preventDefault();
        window.location.href = '../pages/user-account/user-account.html';
    })
    headerButtonsContainer.appendChild(personalAccountButton);
} else {
    const authorizationButton = document.createElement('button');
    authorizationButton.classList.add('button');
    authorizationButton.classList.add('button_colored');
    authorizationButton.textContent = "Войти"
    authorizationButton.addEventListener('click', (event) => {
        event.preventDefault();
        window.location.href = "../pages/authorization/authorization.html"
    });
    headerButtonsContainer.appendChild(authorizationButton);
    const registrationButton = document.createElement('button');
    registrationButton.classList.add('button');
    registrationButton.classList.add('button_colored');
    registrationButton.textContent = "Зарегистрироваться";
    registrationButton.addEventListener('click', (event) => {
        event.preventDefault();
        window.location.href = '../pages/authorization/registration.html';
    })
    headerButtonsContainer.appendChild(registrationButton);
}