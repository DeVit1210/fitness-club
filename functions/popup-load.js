const buildTrainerInfo = (period, callback) => {
    callback(period.trainerAddress + ", " + period.trainerFullName + ", "
        + period.days + ", " + period.timePeriod);
}

$.ajax({
    url: "http://localhost:8080/trainer/periods/free",
    type: "GET",
    success: (periods) => {
        console.log(periods);
        const popupContent = document.querySelector('#membership__second-popup .popup__content');
        periods.forEach(period => {
            const trainerInfoContainer = document.createElement('div');
            trainerInfoContainer.classList.add('membership__chosen-trainer');
            trainerInfoContainer.setAttribute('data-trainer-id', period.trainerId);
            buildTrainerInfo(period, (info) => trainerInfoContainer.textContent = info);
            popupContent.appendChild(trainerInfoContainer);
        })
        const trainerInfoList = popupContent.querySelectorAll('.membership__chosen-trainer');
        trainerInfoList.forEach(chosenTrainer => {
            chosenTrainer.addEventListener('click', (event) => {
                event.preventDefault();
                trainerInfoList.forEach(elem => elem.classList.remove('active'));
                chosenTrainer.classList.add('active');
            })
        })
    }
})