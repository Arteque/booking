function checkItemExists (item) {
    if(!item) return
}

const globalBookingData = {
    wohnung:null,
    anreise:null,
    abreise:null,
    erwachsene:null,
    kinder:null,
    baby:null,
    kinderbett:null
}

let allEvents = []; // Store only one booking event

const bookedDays = [
    {
        id: new Date().getTime(),
        title: "",
        start: "2025-03-10",
        // Set end date to the day after the last booking date
        end: "2025-03-20",  // End date is the day the booking ends (exclusive)
        display: "background",
        backgroundColor: "red",  // Red background for booked dates
    }
];

document.addEventListener("DOMContentLoaded", () => {
    
    // Booking Calendar
    let calendarAn = document.querySelector("#calender-an");
    if (!calendarAn) return;

    let step = 0;
    let bookinginOutDate = [];
    const bookingInfoStart = document.querySelector(".booking__start");
    const bookingInfoEnd = document.querySelector(".booking__end");
    const bookingCalenderPopup = document.querySelector(".booking__inout .booking__submenu");

    // Add bookedDays to allEvents
    const allEvents = [...bookedDays];  // Spread bookedDays into allEvents

    const calendar = new FullCalendar.Calendar(calendarAn, {
        initialView: "dayGridMonth",
        selectable: true,
        locale: "de-DE",
        eventDisplay: "background", // Background-only events
        eventBackgroundColor: "green", // Default booking color
        validRange: { start: new Date() }, // Disallow past dates
        headerToolbar: { left: "title", center: "", right: "next prev" },
        events: allEvents, // Display booked dates
        eventClick: function (info) {
            info.jsEvent.preventDefault();
        },
        dateClick: function (info) {
            calClickDate(info);
        }
    });

    calendar.render();

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    const calClickDate = (info) => {
        // Add selected date to the booking dates
        bookinginOutDate.push(info.dateStr);

        step++;

        if (step > 2) bookinginOutDate.shift(); // Keep only last two selections

        // ✅ HIGHLIGHT IMMEDIATELY CLICKED DATE IN GREEN
        calendar.addEvent({
            id: `temp-${info.dateStr}`,
            title: "",
            start: info.dateStr,
            end: info.dateStr,
            display: "background",
            backgroundColor: "green",
        });

        // If the user selects two dates, validate the selection
        if (bookinginOutDate.length === 2) {
            // Sort dates to ensure correct order (start and end)
            let [startDate, endDate] = bookinginOutDate.sort((a, b) => new Date(a) - new Date(b));

            // Check if any booked days are within the selected range
            const isConflict = bookedDays.some(bookedDay => {
                const bookedStart = new Date(bookedDay.start);
                const bookedEnd = new Date(bookedDay.end);
                const selectedStart = new Date(startDate);
                const selectedEnd = new Date(endDate);

                // Check if the selected range overlaps with any booked range
                return (selectedStart <= bookedEnd && selectedEnd >= bookedStart);
            });

            if (isConflict) {
                // Show an alert if there is a conflict with booked days
                alert("The selected dates overlap with already booked dates. Please choose a different range.");
                bookinginOutDate = [];  // Reset the selected dates
                step = 0;  // Reset the step counter
                calendar.getEvents().forEach(event => event.remove());  // Remove temporary selections
                return;
            }

            // Calculate the number of days between start and end
            let start = new Date(startDate);
            let end = new Date(endDate);
            let differenceInTime = end.getTime() - start.getTime();
            let differenceInDays = differenceInTime / (1000 * 3600 * 24) + 1; // Include end day

            // ✅ ALERT IF BOOKING IS LESS THAN 3 DAYS
            if (differenceInDays < 3) {
                alert("Booking must be at least 3 days long!");
                bookinginOutDate = [];
                step = 0;
                return;
            }

            // Ensure end date includes the last day
            let adjustedEndDate = new Date(endDate);
            adjustedEndDate.setDate(adjustedEndDate.getDate() + 1);
            let formattedEndDate = adjustedEndDate.toISOString().split("T")[0];

            // ✅ REMOVE all previous events (clears temporary selections)
            calendar.getEvents().forEach(event => event.remove());
            allEvents.length = 0; // Clear the array

            // ✅ Add final booking event
            const newEvent = {
                id: `${new Date().getTime()}-${Math.random()}`,
                title: "", // No title
                start: startDate,
                end: formattedEndDate, // Adjusted end date
                display: "background", // Background color only
                backgroundColor: "green", // Apply green background
            };

            allEvents.push(newEvent);  // Add new event to allEvents
            // Also push bookedDays again to allEvents to ensure booked dates remain
            bookedDays.forEach(item => allEvents.push(item));


            calendar.getEvents().forEach(event => event.remove()); // Remove all events from the calendar
            allEvents.forEach(event => calendar.addEvent(event));  // Add all events (booked + new booking) to FullCalendar

            bookinginOutDate = [];  // Clear the selected dates
            step = 0;  // Reset step count

            // ✅ Display formatted dates
            bookingInfoStart.innerHTML = `| Anreise: <br /> <span class="booking__data--choosing-data">${formatDate(newEvent.start)}</span> <br>`;
            bookingInfoEnd.innerHTML = `Abreise: <br /> <span class="booking__data--choosing-data">${formatDate(newEvent.end)}</span>`;
            bookingInfoStart.parentElement.classList.remove("hide");
            bookingCalenderPopup.classList.add("hide");

            //Global Booking Objct
            if(newEvent.start){
                globalBookingData.anreise = formatDate(newEvent.start)
            }else{
                globalBookingData.anreise = null
            }
            if(newEvent.end){
                globalBookingData.abreise = formatDate(newEvent.end)
            }else{
                globalBookingData.abreise = null
            }

            console.log(globalBookingData)
        }
    };

function showClickedDatainTheInfoBox(){

    checkItemExists(document.querySelectorAll(".booking__item"))

    
    
    const bookingItemEntry = document.querySelectorAll(".booking__submenu--entry")

    bookingItemEntry.forEach((item, index) => {

        const bookingEntryInfo = item.parentElement.parentElement.parentElement.querySelector(".booking__content .booking__info")
        
        item.addEventListener("click", (e) => {
            console.log(item)
            const textData = item.querySelector(".text").innerText
            if(item.querySelector(".text")) bookingEntryInfo.innerText = textData
            globalBookingData.wohnung =   textData
            bookingEntryInfo.classList.remove("hide")
            item.parentElement.parentElement.classList.remove("hide")
            item.parentElement.parentElement.classList.add("hide")
        })

    })

}

showClickedDatainTheInfoBox()

const userData = {
    adultes: 0,
    kids: 0,
    baby:0,
    bed: false
}
//Clients Data
function addClients(){

    const userDataRanges = document.querySelectorAll(".user__data--content input")
    const bookingUseresInfoBox = document.querySelector(".booking__users .booking__info")
    
    userDataRanges.forEach((item, index) => {
        item.addEventListener("input", () => {
            index === 0 && ( userData.adultes = item.value )
            index === 1 && ( userData.kids = item.value )
            index === 2 && ( userData.baby = item.value )

            if(index === 3){
                if(!item.checked){
                    userData.bed = false
                }else{
                    userData.bed = true
                }
            }

            console.log(userData.bed)

            const bedInfoTxt = userData.bed ? `| <span class="booking__data--choosing-data">mit Kinderbett</span>` : ''

            bookingUseresInfoBox.innerHTML = `
            | Erwachsene:<span class="booking__data--choosing-data"> ${userData.adultes}</span> <br />
            | Kinder: <span class="booking__data--choosing-data">${userData.kids}</span> <br />
            | Baby: <span class="booking__data--choosing-data">${userData.baby}</span> <br />
             ${bedInfoTxt}`
           
            if(userData.adultes){
                globalBookingData.erwachsene = userData.adultes
            }else{
                globalBookingData.erwachsene = null
            }

            if(userData.kids){
                globalBookingData.kinder = userData.kids
            }else{
                globalBookingData.kinder = null
            }
            if(userData.baby){
                globalBookingData.baby = userData.baby
            }else{
                globalBookingData.baby = null
            }

            if(userData.bed){
                globalBookingData.kinderbett =  userData.bed
            }else{
                globalBookingData.kinderbett = null
            }
        })
    })
}

addClients()


//send the data

function sendDataToForm (){
    
    //Check if the button is rendered
    checkItemExists(document.querySelector(".booking__send"))


    //send the data
   const bookingBtn = document.querySelector(".booking__send")

   bookingBtn.addEventListener("click", (e) =>{
    e.preventDefault()
    console.log(globalBookingData)
   })

   


}


sendDataToForm()
});
