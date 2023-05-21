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
        const buttonContainer = document.getElementById("visit_quantity_button_container");
        handleMemberships(memberships, buttonContainer, buildVisitButtonContent, 'visitQuantity');
        const orderButton = buttonContainer.parentElement.querySelector('.order_button');
        orderButton.addEventListener('click', () => {
            buttonContainer.querySelectorAll('button').forEach(button => {
                if(button.classList.contains('active')) {
                    openFirstPopup(
                        button.getAttribute('data-name'),
                        button.getAttribute('data-price'),
                        button.getAttribute('data-id'),
                        'visit'
                        )
                }
            })
        })
    }
})

$.ajax({
    url: "http://localhost:8080/membership/find/period",
    type: "GET",
    success: (memberships) => {
        const buttonContainer = document.getElementById("visit_quantity_button_container");
        handleMemberships(memberships, buttonContainer, buildPeriodButtonContent, 'monthsQuantity')
        const orderButton = buttonContainer.parentElement.querySelector('.order_button');
        orderButton.addEventListener('click', () => {
            buttonContainer.querySelectorAll('button').forEach(button => {
                if(button.classList.contains('active')) {
                    openFirstPopup(
                        button.getAttribute('data-name'),
                        button.getAttribute('data-price'),
                        button.getAttribute('data-id'),
                        'period'
                    )
                }
            })
        })
    }
})

$.ajax({
    url: "http://localhost:8080/membership/find/trainer",
    type: "GET",
    success: (memberships) => {
        const buttonContainer = document.getElementById('trainer_button_container');
        handleMemberships(memberships, buttonContainer, buildPeriodButtonContent, 'monthsQuantity');
        const orderButton = buttonContainer.parentElement.querySelector('.order_button');
        orderButton.addEventListener('click', () => {
            buttonContainer.querySelectorAll('button').forEach(button => {
                if(button.classList.contains('active')) {
                    openSecondPopup(
                        button.getAttribute('data-name'),
                        button.getAttribute('data-price'),
                        button.getAttribute('data-id'),
                        'trainer'
                    )
                }
            })
        })
    }
})


function handleMemberships(memberships, buttonContainer, buttonContentBuilder, selector) {
    console.log(memberships);
    memberships.forEach(membership => {
        const button = document.createElement('button');
        button.classList.add('button');
        button.classList.add('button_colored');
        button.setAttribute('data-price', membership.price + " BYN");
        button.setAttribute('data-name', membership.name);
        button.setAttribute('data-id', membership._id);
        button.textContent = buttonContentBuilder(membership[selector]);
        buttonContainer.appendChild(button);
    })
    buttonContainer.parentElement.querySelector('.membership__price').textContent = memberships[0].price + " BYN";
    buttonContainer.children[0].classList.add('active');
    const buttons = buttonContainer.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            buttonContainer.parentElement.querySelector('.membership__price').textContent =
                button.getAttribute('data-price');
            buttons.forEach(button => button.classList.remove('active'));
            button.classList.add('active');
        })
    })

}