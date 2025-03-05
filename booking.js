const openedCard = []

function checkItemExists (item) {
    if(!item) return
}

function showClickedDatainTheInfoBox(){
    checkItemExists(document.querySelectorAll(".booking__item"))

    const bookingItems = document.querySelectorAll(".booking__item")
    
    const bookingItemEntry = document.querySelectorAll(".booking__submenu--entry")

    bookingItemEntry.forEach((item, index) => {

        const bookingEntryInfo = item.parentElement.parentElement.parentElement.querySelector(".booking__content .booking__info")
        openedCard.push(index)
        if(openedCard.length > 1) {
            bookingItemEntry[openedCard[1]].classList.add("hide")
            openedCard.pop()
            console.log(openedCard)
        }
        item.addEventListener("click", (e) => {
            e.preventDefault()
            bookingEntryInfo.innerText = item.querySelector(".text").innerText
            bookingEntryInfo.classList.remove("hide")
            item.parentElement.parentElement.classList.remove("hide")
        })
    })

}

showClickedDatainTheInfoBox()