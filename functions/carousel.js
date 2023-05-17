const arrow_left=document.querySelector(".arrow-left");
const arrow_right=document.querySelector(".arrow-right");
const carousel=document.querySelector(".carousel");
const item_left=document.querySelector(".item-left");
const item_right=document.querySelector(".item-right");
const item_active=document.querySelector(".item-active");

const moveLeft=()=>{
    carousel.classList.add("transition-left");
    arrow_left.removeEventListener("click", moveLeft);
    arrow_right.removeEventListener("click", moveRight);
}

const moveRight=()=>{
    carousel.classList.add("transition-right");
    arrow_right.removeEventListener("click", moveRight);
    arrow_left.removeEventListener("click", moveLeft);
}

arrow_left.addEventListener("click", moveLeft);
arrow_right.addEventListener("click", moveRight);

carousel.addEventListener("animationend", (animationEvent)=>{
    let changrdItem;
    if(animationEvent.animationName==="move-left"){
        carousel.classList.remove("transition-left");
        changrdItem=item_left;
        document.querySelector(".item-active").innerHTML=item_left.innerHTML;
    }
    else{
        carousel.classList.remove("transition-right");
        changrdItem=item_right;
        carousel.classList.remove("transition-right");
        document.querySelector(".item-active").innerHTML=item_right.innerHTML;
    }
    carousel.classList.remove("transition-left");
    arrow_left.addEventListener("click", moveLeft);
    arrow_right.addEventListener("click", moveRight);
})

carousel.addEventListener("animationstart", (animationEvent)=> {
    let changrdItem;
    if(animationEvent.animationName==="move-left"){
        changrdItem=item_left;
    } else {
        changrdItem=item_right;
    }
    // changrdItem.innerHTML="";
    // for(let i=0;i<3;i++){
    //     const card=createCardTemplate();
    //     card.children[0].src=pets[indexes[i]].image;
    //     card.children[1].textContent=pets[indexes[i]].name;
    //     card.children[2].textContent="Learn more"
    //     changrdItem.appendChild(card);
    // }
})

