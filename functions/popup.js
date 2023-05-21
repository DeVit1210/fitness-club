const firstPopupContainer = document.getElementById('membership__first-popup-bg');
const firstPopup = document.getElementById('membership__first-popup');
const secondPopupContainer = document.getElementById('membership__second-popup-bg');
const secondPopup = document.getElementById('membership__second-popup');
document.querySelectorAll('.cross').forEach(cross => {
    cross.addEventListener('click', () => {
        closeFirstPopup();
        closeSecondPopup();
    })
})
const openFirstPopup = (name, price, id, type) => {
    firstPopupContainer.classList.add('active');
    firstPopup.classList.add('active');
    firstPopup.querySelector('.membership__title').textContent = name;
    firstPopup.querySelector('.membership__price').textContent = price;
    firstPopup.querySelector('button').setAttribute('data-id', id);
    firstPopup.querySelector('button').setAttribute('data-type', type);
    document.body.classList.add("scroll_lock")
}
const openSecondPopup = (name, price, id, type) => {
    secondPopupContainer.classList.add('active');
    secondPopup.classList.add('active');
    secondPopup.querySelector('.membership__title').textContent = name;
    secondPopup.querySelector('.membership__price').textContent = price;
    secondPopup.querySelector('button').setAttribute('data-id', id);
    secondPopup.querySelector('button').setAttribute('data-type', type);
    document.body.classList.add('scroll_lock');
}
const closeFirstPopup = () => {
    firstPopupContainer.classList.remove('active');
    firstPopup.classList.remove('active');
    document.body.classList.remove("scroll_lock")
}
const closeSecondPopup = () => {
    secondPopupContainer.classList.remove('active');
    secondPopup.classList.remove('active');
    document.body.classList.remove('scroll_lock');
}
