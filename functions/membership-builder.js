const createElement = (tagName, classToApply, textContent) => {
    const elem = document.createElement(tagName);
    if(classToApply != null) {
        elem.classList.add(classToApply);
    }
    if(textContent !== undefined) {
        elem.textContent = textContent;
    }
    return elem;
}

const getDate = (stringDate) => {
    const date = new Date(stringDate);
    return date.toLocaleDateString("en-GB", {day: '2-digit', month: '2-digit', year: 'numeric'});
}


const initBuild = (membership, callback) => {
    console.log(membership);
    const card = createElement('div', 'membership');
    const cardImage = createElement('div', 'membership__image');
    cardImage.appendChild(createElement('p', 'membership__title', membership.membership.name));
    const logo = createElement('p', 'membership__logo', 'Life');
    logo.appendChild(createElement('span', null, 'Fit'));
    cardImage.appendChild(logo);
    card.appendChild(cardImage);
    callback(card);
}

const buildVisitMembership = (membership, callback) => {
    initBuild(membership, (card) => {
        const content = createElement('div', 'membership__content');
        content.appendChild(createElement('p', 'membership__address', 'Адрес: ' + membership.address));
        content.appendChild(createElement('p', 'membership__start-date', 'Дата начала: ' + getDate(membership.dateFrom)))
        content.appendChild(createElement('p', 'membership__remaining-visits', 'Оставшиеся посещения: ' + membership.leftVisitQuantity));
        content.appendChild(createElement('p', 'membership__price', 'Стоимость: ' + membership.membership.price + " BYN"));
        card.appendChild(content);
        callback(card);
    })
}

const buildPeriodMembership = (membership) => {
    initBuild(membership, (card) => {
        const content = createElement('div', 'membership__content');
        content.appendChild(createElement('p', 'membership__address', 'Адрес: ' + membership.address));
        content.appendChild(createElement('p', 'membership__start-date', 'Дата начала: ' + getDate(membership.dateFrom)))
        content.appendChild(createElement('p', 'membership__end-date', 'Дата окончания: ' + getDate(membership.dateTo)));
        content.appendChild(createElement('p', 'membership__price', 'Стоимость: ' + membership.membership.price + " BYN"));
        card.appendChild(content);
        return card;
    })
}

const buildTrainerMembership = (membership, callback) => {
    initBuild(membership, (card) => {
        const content = createElement('div', 'membership__content');
        content.appendChild(createElement('p', 'membership__address', 'Адрес: ' + membership.trainer.address));
        content.appendChild(createElement('p', 'membership__start-date', 'Дата начала: ' + getDate(membership.dateFrom)))
        content.appendChild(createElement('p', 'membership__end-date', 'Дата окончания: ' + getDate(membership.dateTo)));
        content.appendChild(createElement('p', 'membership__coach', 'Тренер: ' + membership.trainer.surname + ' ' + membership.trainer.name));
        content.appendChild(createElement('p', 'membership__timetable', 'Расписание: ' + membership.trainingDays + ", " + membership.trainingPeriod))
        content.appendChild(createElement('p', 'membership__price', 'Стоимость: ' + membership.membership.price + " BYN"));
        card.appendChild(content);
        callback(card)
    })
}

const buildMembership = (membership, callback) => {
    switch (membership.__t) {
        case "ConfirmedVisitMembership": {
            buildVisitMembership(membership, (card) => callback(card)); break;
        }
        case "ConfirmedPeriodMembership": {
            buildPeriodMembership(membership, (card) => callback(card)); break;
        }
        case "ConfirmedPersonalTrainerMembership": {
            console.log('trainer')
            buildTrainerMembership(membership, (card) => callback(card)); break;
        }
    }
}