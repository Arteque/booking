document.addEventListener("DOMContentLoaded", (e) => {
    
    let calendarAn = document.querySelector("#calender-an")

    const calendar = new FullCalendar.Calendar(calendarAn, {
        initialView : 'dayGridMonth',
        selectable: true,
        locale: "de-DE",
        eventDisplay:"background",
        eventColor:"var(--warn-100)",
        validRange:{
            start:new Date()
        },
        headerToolbar:{
            left:"title",
            center:"",
            right:"next prev"
        },
        events: allEvents,
        eventClick:function(info){
            info.jsEvent.preventDefault()
        },
        dateClick:function(info){
            calClickDate(info)
        }

    })
    calendar.render()
})


const allEvents = [
    {
        id:new Date().getTime,
        title:"",
        start:"2025-02-10",
        end:"2025-02-21",
    },
    {
        id:new Date().getTime,
        title:"",
        start:"2025-02-24",
        end:"2025-02-28",
    }
]

const calClickDate = (info) => {
    console.log(info)
}