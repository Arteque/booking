function checkItemExists (item) {
    if(!item) return
}

function showClickedDatainTheInfoBox(){
    checkItemExists(document.querySelectorAll(".booking__item"))

    const bookingItems = document.querySelectorAll(".booking__item")
    
    const bookingItemEntry = document.querySelectorAll(".booking__submenu--entry")

    bookingItemEntry.forEach(item => {

        const bookingEntryInfo = item.parentElement.parentElement.parentElement.querySelector(".booking__content .booking__info")

        item.addEventListener("click", (e) => {
            e.preventDefault()
            bookingEntryInfo.innerText = item.querySelector(".text").innerText
            bookingEntryInfo.classList.remove("hide")
            item.parentElement.parentElement.classList.remove("hide")
        })
    })

}

showClickedDatainTheInfoBox()