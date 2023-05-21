const freeTrainForm = document.querySelector('.free-train__form');
freeTrainForm.addEventListener('submit', (event) => {
    event.preventDefault();
    $.ajax({
        url: "http://localhost:8080/consultation/add",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({
            name: freeTrainForm.querySelector('#name').value,
            phoneNumber: freeTrainForm.querySelector('#phoneNumber').value,
            time: Date.now()
        }),
        success: () => {
            alert('Консультация успешно добавлена!');
            freeTrainForm.reset();
        }
    })
})