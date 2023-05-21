const buildVisitButtonContent = (visitQuantity) => {
    const lastDigit = visitQuantity % 10;
    if(lastDigit === 1) {
        return visitQuantity + " посещение"
    } else if(lastDigit >= 2 && lastDigit <= 4) {
        return visitQuantity + " посещения";
    } else return visitQuantity + " посещений";
}

const getYears = (monthsQuantity) => {
    if(monthsQuantity < 12) return '';
    else if(monthsQuantity === 12) return "1 год";
    else return monthsQuantity /12 + " года";
}

const getMonths = (monthsQuantity) => {
    const monthsWithoutYear = monthsQuantity % 12;
    if(monthsWithoutYear === 0) return '';
    else if(monthsWithoutYear === 1) return '1 месяц';
    else if(monthsWithoutYear >= 2 && monthsWithoutYear <= 4) return monthsWithoutYear + " месяца";
    else return monthsWithoutYear + " месяцев";
}

const buildPeriodButtonContent = (monthsQuantity) => {
    return getYears(monthsQuantity) + " " + getMonths(monthsQuantity);
}

$.ajax({
    url: "http://localhost:8080/membership/find/visit",
    type: "GET",
    success: (memberships) => {
        handleMemberships(memberships, 'visit_quantity_button_container', buildVisitButtonContent, 'visitQuantity')
    }
})

$.ajax({
    url: "http://localhost:8080/membership/find/period",
    type: "GET",
    success: (memberships) => {
        handleMemberships(memberships, 'period_button_container', buildPeriodButtonContent, 'monthsQuantity')
    }
})

$.ajax({
    url: "http://localhost:8080/membership/find/trainer",
    type: "GET",
    success: (memberships) => {
        handleMemberships(memberships, 'trainer_button_container', buildPeriodButtonContent, 'monthsQuantity')
    }
})


function handleMemberships(memberships, buttonContainerId, buttonContentBuilder, selector) {
    console.log(memberships);
    const buttonContainer = document.getElementById(buttonContainerId);
    memberships.forEach(membership => {
        const button = document.createElement('button');
        button.classList.add('button');
        button.classList.add('button_colored');
        button.setAttribute('data-price', membership.price + " BYN");
        button.setAttribute('data-name', membership.name);
        button.textContent = buttonContentBuilder(membership[selector]);
        buttonContainer.appendChild(button);
    })
    buttonContainer.parentElement.querySelector('.membership__price').textContent = memberships[0].price + " BYN";
    buttonContainer.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            buttonContainer.parentElement.querySelector('.membership__price').textContent =
                button.getAttribute('data-price');
        })
    })
}