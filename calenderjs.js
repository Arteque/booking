document.addEventListener("DOMContentLoaded", (e) => {
    
    let calendarAn = document.querySelector("#calender-an")

    const calendar = new FullCalendar.Calendar(calendarAn, {
        initialView : 'dayGridMonth',
        locale:"de",
    })
    calendar.render()
})