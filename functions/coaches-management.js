$.ajax({
    url: "http://localhost:8080/trainer",
    type: "GET",
    success: (trainers) => {
        buildTable(['ID', 'Фамилия', 'Имя', 'Образование', 'Опыт', 'Количество клиентов'], table => {
            console.log(trainers);
            handleTrainers(table, trainers)
            document.getElementById('table-container').appendChild(table);
        })
    }
})

document.querySelector('.coaches__sort-form #coaches__decreasing').addEventListener('click', (event) => {
    event.preventDefault();
    $.ajax({
        url: "http://localhost:8080/trainer/sorted/decrease",
        type: "GET",
        success: (trainers) => {
            document.getElementById('table-container').innerHTML = '';
            buildTable(['ID', 'Фамилия', 'Имя', 'Образование', 'Опыт', 'Количество клиентов'], table => {
                console.log(trainers);
                handleTrainers(table, trainers)
                document.getElementById('table-container').appendChild(table);
            })
        }
    })
})

document.querySelector('.coaches__sort-form #coaches__increasing').addEventListener('click', (event) => {
    event.preventDefault();
    $.ajax({
        url: "http://localhost:8080/trainer/sorted/increase",
        type: "GET",
        success: (trainers) => {
            document.getElementById('table-container').innerHTML = '';
            buildTable(['ID', 'Фамилия', 'Имя', 'Образование', 'Опыт', 'Количество клиентов'], table => {
                console.log(trainers);
                handleTrainers(table, trainers)
                document.getElementById('table-container').appendChild(table);
            })
        }
    })
})

// document.querySelector('.coach__add-form').addEventListener('submit', () => {
//     $.ajax({
//         url: "http://localhost:8080/trainer/add",
//         type: "POST",
//         contentType: "application/json",
//         data: JSON.stringify({
//             surname: document.getElementById('add-coach__surname').value,
//             name: document.getElementById('add-coach__name').value,
//             education: document.getElementById('add-coach__education').value,
//             experience: document.getElementById('add-coach__experience').value,
//             additionalInformation: document.getElementById('add-coach__info').value,
//             clientQuantity: 0
//         }),
//         success: () => alert('Тренер успешно добавлен!'),
//         error: () => alert('Тренер успешно удален!')
//     })
// })

const editCoachId = document.querySelector('#edit-coach__id');
editCoachId.addEventListener('change', () => {
    $.ajax({
        url: "http://localhost:8080/trainer/" + editCoachId.value,
        type: "GET",
        success: (trainer) => {
            document.getElementById('edit-coach__surname').value = trainer.surname
            document.getElementById('edit-coach__name').value = trainer.name;
            document.getElementById('edit-coach__education').value = trainer.education
            document.getElementById('edit-coach__experience').value = trainer.experience
            document.getElementById('edit-coach__info').value = trainer.info
        },
        error: () => {
            alert("id указан неверно!");
        }
    })
})
document.querySelector('.coaches__edit-form').addEventListener('submit', () => {
    $.ajax({
        url: "http://localhost:8080/trainer/" + document.getElementById('edit-coach__id').value,
        type: "PUT",
        contentType: "application/json",
        data: JSON.stringify({
            surname: document.getElementById('edit-coach__surname').value,
            name: document.getElementById('edit-coach__name').value,
            education: document.getElementById('edit-coach__education').value,
            experience: document.getElementById('edit-coach__experience').value,
            additionalInformation: document.getElementById('edit-coach__info').value,
        }),
        success: () => alert('Данные о тренере успешно обновлены!'),
        error: () => alert('Ошибка!')
    })
})

document.querySelector('.coaches__del-form').addEventListener('submit', () => {
    $.ajax({
        url: "http://localhost:8080/trainer/" + document.getElementById('del-coach__id').value,
        type: "DELETE",
        success: () => setTimeout(() => alert('Данные о тренере успешно удалены!'), 1000)
    })
})

//const membershipAddForm = document.querySelector('.memberships__add-form');
// membershipAddForm.addEventListener('submit', () => {
//     $.ajax({
//         url: "http://localhost:8080/membership/add/" + getMembershipType(document.getElementById('add-membersip__type').value),
//         type: "POST",
//         contentType: "application/json",
//         data: JSON.stringify({
//             name: document.getElementById('add-membersip__name').value,
//             price: document.getElementById('add-membersip__price').value,
//         }),
//         success: () => alert("Добавление абонемента выполнено успешно!"),
//         error: () => alert("Ошибка добавления абонемента")
//     })
// })
//
// const membershipUpdateForm = document.querySelector('.memberships__edit-form');
// const membershipIdToUpdate = membershipUpdateForm.querySelector('#edit-membersip__id');
// membershipUpdateForm.addEventListener('submit', (event) => {
//     event.preventDefault();
//     $.ajax({
//         url: "http://localhost:8080/membership/add/" + document.getElementById('add-membersip__type').value,
//         type: "POST",
//         contentType: "application/json",
//         data: JSON.stringify({
//             name: document.getElementById('add-membersip__name').value,
//             price: document.getElementById('add-membersip__price').value,
//         }),
//         success: () => alert("Редактирование абонемента выполнено успешно!"),
//         error: () => alert("Ошибка редактирования абонемента")
//     })
// })
//
//
// function getMembershipType(value) {
//     return value === 'Безлимитный' ? 'period' : (value === 'С тренером' ? 'trainer' : 'visit');
// }
function handleTrainers(table, trainers) {
    trainers.forEach(trainer => {
        const tr = document.createElement('tr');
        ['_id', 'surname', 'name', 'education', 'experience', 'clientQuantity'].forEach(elem => {
            const td = document.createElement('td');
            td.textContent = trainer[elem];
            tr.appendChild(td);
        })
        table.querySelector('tbody').appendChild(tr);
    })
}



