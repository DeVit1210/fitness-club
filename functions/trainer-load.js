const createElement = (tagName, classToApply, textContent) => {
    const elem = document.createElement(tagName);
    elem.classList.add(classToApply);
    if(textContent !== undefined) {
        elem.textContent = textContent;
    }
    return elem;
}
const trainerCardTemplate = (trainer) => {
    const card = document.createElement('div');
    const photo = document.createElement('img');
    photo.classList.add('trainer');
    photo.img = trainer.photo;
    photo.alt = "trainer photo";
    card.appendChild(photo);
    const trainerContent = createElement('div', 'trainer__content');
    trainerContent.appendChild(createElement('p', 'trainer__name', trainer.surname + " " + trainer.name));
    trainerContent.appendChild(createElement('p', "trainer__education", "Образование: " + trainer.education));
    trainerContent.appendChild(createElement('p', 'trainer__experience', "Стаж работы: " + trainer.experience + " лет"));
    trainerContent.appendChild(createElement('p', 'trainer__info', "Дополнительная информация: " + trainer.additionalInformation));
    card.appendChild(trainerContent);
    return card;
}

$.ajax({
    url: "http://localhost:8080/trainer",
    type: "GET",
    success: (trainers) => {
        // TODO: make slider dynamic
    }
})