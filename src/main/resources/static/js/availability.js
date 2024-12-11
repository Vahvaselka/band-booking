class Calendar {
    constructor() {
        this.currentDate = new Date();
        this.selectedDate = null;
        this.init();
    }

    init() {
        this.renderCalendar();
        document.getElementById('prevMonth').addEventListener('click', () => this.changeMonth(-1));
        document.getElementById('nextMonth').addEventListener('click', () => this.changeMonth(1));
    }

    renderCalendar() {
        const year = this.currentDate.getFullYear();
        const month = this.currentDate.getMonth();

        // Update header
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
            'August', 'September', 'October', 'November', 'December'];
        document.getElementById('currentMonth').textContent = `${monthNames[month]} ${year}`;

        // Clear existing calendar days
        const calendarDays = document.querySelector('.calendar-grid');
        const weekdayElements = Array.from(document.querySelectorAll('.weekday'));
        calendarDays.innerHTML = '';
        weekdayElements.forEach(day => calendarDays.appendChild(day));

        // Get first day of month and total days
        let firstDay = new Date(year, month, 1).getDay();
        // Convert Sunday (0) to 7 for Monday-based week
        firstDay = firstDay === 0 ? 6 : firstDay - 1;
        const lastDate = new Date(year, month + 1, 0).getDate();

        // Add empty cells for days before first of month
        for (let i = 0; i < firstDay; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'calendar-day disabled';
            calendarDays.appendChild(emptyDay);
        }

        // Add calendar days
        for (let day = 1; day <= lastDate; day++) {
            const dateCell = document.createElement('div');
            dateCell.textContent = day;
            dateCell.className = 'calendar-day';

            const currentDateObj = new Date(year, month, day);
            let dayOfWeek = currentDateObj.getDay();
            // Convert to Monday-based week (0 = Monday, 6 = Sunday)
            dayOfWeek = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

            // Weekend handling (Friday = 5, Saturday = 6)
            if (dayOfWeek === 5 || dayOfWeek === 6) {
                dateCell.classList.add('weekend');
                dateCell.addEventListener('click', () => this.selectDate(year, month, day));
            } else {
                dateCell.classList.add('disabled');
            }

            calendarDays.appendChild(dateCell);
        }
    }

    changeMonth(delta) {
        this.currentDate.setMonth(this.currentDate.getMonth() + delta);
        this.renderCalendar();
    }

    selectDate(year, month, day) {
        // Remove previous selection
        const prevSelected = document.querySelector('.selected');
        if (prevSelected) {
            prevSelected.classList.remove('selected');
        }

        // Add selection to clicked date
        const allDays = document.querySelectorAll('.calendar-day');
        const selectedDay = Array.from(allDays).find(div => div.textContent === day.toString());
        if (selectedDay) {
            selectedDay.classList.add('selected');
        }

        // Update the form input
        const selectedDate = new Date(year, month, day);
        const formattedDate = selectedDate.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        document.getElementById('selected-date').value = formattedDate;
    }
}

// Initialize calendar when page loads
document.addEventListener('DOMContentLoaded', () => {
    new Calendar();
});
// Add these new functions for form handling
document.getElementById('bookingForm').addEventListener('submit', function(e) {
    e.preventDefault();

});
class BookingManager {
    constructor() {
        this.form = document.getElementById('bookingForm');
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    handleSubmit(e) {
        e.preventDefault();

        // Collect form data
        const formData = new FormData(this.form);
        const bookingData = Object.fromEntries(formData.entries());

        // Store booking data in sessionStorage
        sessionStorage.setItem('lastBooking', JSON.stringify(bookingData));

        // Show success alert
        const userChoice = confirm(
            "Booking Request Received!\n\n" +
            "Thank you for your interest in Jazz Fusion Quartet. " +
            "We will contact you within 24 hours to confirm your booking."
        );

        // Reset form
        this.form.reset();

        // Handle navigation based on user choice
        if (userChoice) {
            // Go to home page
            window.location.href = '/';

        } else {
            // Go back
            window.history.back() ;

        }
    }
}

// Initialize both classes when page loads
document.addEventListener('DOMContentLoaded', () => {
    new Calendar();
    new BookingManager();
});

