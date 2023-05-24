const confirmVisitOrPeriodMembership = (parentNode, button) => {
    $.ajax({
        url: "http://localhost:8080/confirmed-membership/add/" + button.getAttribute('data-id'),
        type: "POST",
        headers: {
            authorization: localStorage.getItem('token')
        },
        contentType: "application/json",
        data: JSON.stringify({
            dateFrom: parentNode.querySelector('.membership__date').value,
            address: parentNode.querySelector('#membership__address').value
        }),
        success: () => {
            alert("Покупка абонемента прошла успешно!");
            closeFirstPopup();
            window.location.reload();
        }
    })
}

const confirmTrainerMembership = (parentNode, button) => {
    if(!parentNode.querySelector('.active')) {
        alert('Выберите временной промежуток и тренера, с которым хотите заниматься!');
    } else {
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
                trainer: trainerId,
                timePeriod: parentNode.querySelector('.active').textContent.split(', ')[4],
                trainingPeriod: parentNode.querySelector('.active').textContent.split(', ')[4],
                trainingDays: parentNode.querySelector('.active').textContent.split(', ')[3]
            }),
            success: () => {
                console.log(parentNode.querySelector('.active').textContent.split(', '))
                $.ajax({
                    url: "http://localhost:8080/schedule/update/take",
                    type: "POST",
                    contentType: "application/json",
                    headers: {
                        authorization: localStorage.getItem('token')
                    },
                    data: JSON.stringify({
                        trainerId: trainerId,
                        timePeriod: parentNode.querySelector('.active').textContent.split(', ')[4],
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
}

const firstPopupButton = firstPopup.querySelector('button');
firstPopupButton.addEventListener('click', () => {
    if(localStorage.getItem('token')) {
        confirmVisitOrPeriodMembership(firstPopup, firstPopupButton);
    } else window.location.href = '../pages/authorization/authorization.html';
})

const secondPopupButton = secondPopup.querySelector('button');
secondPopupButton.addEventListener('click', () => {
    if(localStorage.getItem('token')) {
        confirmTrainerMembership(secondPopup, secondPopupButton)
    } else window.location.href = '../pages/authorization/authorization.html';
})