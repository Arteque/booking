const allEvents = []; // Store only one booking event

const bookedDays  = [
    {
        id: new Date().getTime(),
        title: "",
        start: "2025-03-10",
        end: "2025-03-20",
        display: "background",
        backgroundColor: "red",
    }
]

document.addEventListener("DOMContentLoaded", () => {
    let calendarAn = document.querySelector("#calender-an");
    if (!calendarAn) return;

    let step = 0;
    let bookinginOutDate = [];
    const bookingInfoStart = document.querySelector(".booking__start");
    const bookingInfoEnd = document.querySelector(".booking__end");
    const bookingCalenderPopup = document.querySelector(".booking__inout .booking__submenu")

   

    const calendar = new FullCalendar.Calendar(calendarAn, {
        initialView: "dayGridMonth",
        selectable: true,
        locale: "de-DE",
        eventDisplay: "background", // Background-only events
        eventBackgroundColor: "green", // Default booking color
        validRange: { start: new Date() },
        headerToolbar: { left: "title", center: "", right: "next prev" },
        events: allEvents,
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
        bookinginOutDate.push(info.dateStr);
        step++;

        if (step > 2) bookinginOutDate.shift(); // Keep only last two selections
        console.log(step, bookinginOutDate);

        // ✅ HIGHLIGHT IMMEDIATELY CLICKED DATE IN GREEN
        calendar.addEvent({
            id: `temp-${info.dateStr}`,
            title: "",
            start: info.dateStr,
            end: info.dateStr,
            display: "background",
            backgroundColor: "green",
        });
        
        if (bookinginOutDate.length === 2) {
            // Sort dates to ensure correct order
            let [startDate, endDate] = bookinginOutDate.sort((a, b) => new Date(a) - new Date(b));

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

            allEvents.push(newEvent);
            allEvents.push(bookedDays)
            calendar.addEvent(newEvent); // Add event to FullCalendar
            calendar.addEvent(bookedDays)
            // ✅ RESET bookinginOutDate AFTER booking is created
            bookinginOutDate = [];
            step = 0; // Reset step count

            // ✅ Display formatted dates
            bookingInfoStart.innerText ="Anreise:" + formatDate(newEvent.start);
            bookingInfoEnd.innerText = "Abreise:" + formatDate(newEvent.end);
            bookingInfoStart.parentElement.classList.remove("hide")
            bookingCalenderPopup.classList.add("hide")
        }
    };
});
