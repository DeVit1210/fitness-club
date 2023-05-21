const confirmVisitOrPeriodMembership = (parentNode, button) => {
    $.ajax({
        url: "http://localhost:8080/confirmed-membership/add/" + button.getAttribute('data-id'),
        type: "POST",
        headers: {
            authorization: localStorage.getItem('token')
        },
        contentType: "application/json",
        data: JSON.stringify({
            dateFrom: parentNode.querySelector('.membership__date').value
        }),
        success: () => {
            alert("Покупка абонемента прошла успешно!");
            closeFirstPopup();
            window.location.reload();
        }
    })
}

const confirmTrainerMembership = (parentNode, button) => {
    const trainerId = parentNode.querySelector('.active').getAttribute('data-trainer-id');
    $.ajax({
        url: "http://localhost:8080/confirmed-membership/add/" + button.getAttribute('data-id'),
        type: "POST",
        headers: {
            authorization: localStorage.getItem('token')
        },
        contentType: "application/json",
        data: JSON.stringify({
            dateFrom: parentNode.querySelector('.membership__date').value,
            trainer: trainerId
        }),
        success: () => {
            $.ajax({
                url: "http://localhost:8080/schedule/update/take",
                type: "POST",
                contentType: "application/json",
                headers: {
                    authorization: localStorage.getItem('token')
                },
                data: JSON.stringify({
                    trainerId: trainerId,
                    timePeriod: parentNode.querySelector('.active').textContent.split(', ')[3]
                }),
                success: () => {
                    alert("Покупка абонемента прошла успешно!");
                    closeSecondPopup();
                    window.location.reload();
                }
            })
        }
    })
}

const firstPopupButton = firstPopup.querySelector('button');
firstPopupButton.addEventListener('click', () => confirmVisitOrPeriodMembership(firstPopup, firstPopupButton))

const secondPopupButton = secondPopup.querySelector('button');
secondPopupButton.addEventListener('click', () => confirmTrainerMembership(secondPopup, secondPopupButton))