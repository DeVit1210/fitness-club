$.ajax({
    url: "http://localhost:8080/trainer",
    type: "GET",
    success: (data) => {
        data.forEach(trainer => {
            const card = trainerCardTemplate(trainer);
            card.classList.add('splide__slide')
            document.querySelector('.splide__list').appendChild(card);
        })
        const splide = new Splide('.splide', { width: '100%' });
        console.log(splide);
        splide.mount();
    }
})