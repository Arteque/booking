document.addEventListener("DOMContentLoaded", (e) => {
    
    let calendarAn = document.querySelector("#calender-an")

    const calendar = new FullCalendar.Calendar(calendarAn, {
        initialView : 'dayGridMonth',
        selectable: true,
        locale: "de-DE",
        eventDisplay:"background",
        eventColor:"var(--warn-100)",
        headerToolbar:{
            left:"title",
            center:"",
            right:"next prev"
        },
        events: allEvents,
        eventClick:function(info){
            console.log(info.event.title)
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
