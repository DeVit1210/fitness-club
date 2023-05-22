const createElement = (tagName, classToApply, textContent) => {
    const elem = document.createElement(tagName);
    elem.classList.add(classToApply);
    if(textContent !== undefined) {
        elem.textContent = textContent;
    }
    return elem;
}


const initBuild = (membership, callback) => {
    const card = createElement('div', 'membership');
    const cardImage = createElement('div', 'membership__image');
    cardImage.appendChild(createElement('p', 'membership__title', membership.name));
    const logo = createElement('p', 'membership__logo', 'Life');
    logo.appendChild(createElement('span', "", 'Fit'));
    cardImage.appendChild(logo);
    card.appendChild(cardImage);
    callback(card);
}

const buildVisitMembership = (membership, callback) => {
    initBuild(membership, (card) => {
        const content = createElement('div', 'membership__content');
        content.appendChild(createElement('p', 'membership__address', 'Адрес: ' + membership.address));
        content.appendChild(createElement('p', 'membership__start-date', 'Дата начала: ' + membership.dateFrom))
        content.appendChild(createElement('p', 'membership__remaining-visits', 'Оставшиеся посещения: ' + membership.leftVisitQuantity));
        content.appendChild(createElement('p', 'membership__price', 'Стоимость: ' + membership.price + " BYN"));
        card.appendChild(content);
        console.log(card);
        callback(card);
    })
}

const buildPeriodMembership = (membership) => {
    initBuild(membership, (card) => {
        const content = createElement('div', 'membership__content');
        content.appendChild(createElement('p', 'membership__address', 'Адрес: ' + membership.address));
        content.appendChild(createElement('p', 'membership__start-date', 'Дата начала: ' + membership.dateFrom))
        content.appendChild(createElement('p', 'membership__end-date', 'Дата окончания: ' + membership.dateTo));
        content.appendChild(createElement('p', 'membership__price', 'Стоимость: ' + membership.price + " BYN"));
        card.appendChild(content);
        console.log(card);
        return card;
    })
}

const buildTrainerMembership = (membership) => {
    initBuild(membership, (card) => {
        const content = createElement('div', 'membership__content');
        content.appendChild(createElement('p', 'membership__address', 'Адрес: ' + membership.address));
        content.appendChild(createElement('p', 'membership__start-date', 'Дата начала: ' + membership.dateFrom))
        content.appendChild(createElement('p', 'membership__end-date', 'Дата окончания: ' + membership.dateTo));
        content.appendChild(createElement('p', 'membership__coach', membership.trainer.name));
        content.appendChild(createElement('p', 'membership__timetable', membership.trainingDays + ", " + membership.trainingPeriod))
        content.appendChild(createElement('p', 'membership__price', 'Стоимость: ' + membership.price + " BYN"));
        card.appendChild(content);
        console.log(card);
        return card;
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
            buildTrainerMembership(membership, (card) => callback(card)); break;
        }
    }
}