// band-script.js
document.addEventListener('DOMContentLoaded', () => {
    // Mock data for bookings
    const bookings = [
        {
            id: 1,
            venue: "The Blue Note",
            date: "2024-12-20",
            time: "8:00 PM",
            status: "Confirmed",
            payment: "$1,500",
            contactName: "John Manager",
            location: "New York, NY"
        },
        {
            id: 2,
            venue: "Smith Wedding",
            date: "2024-12-25",
            time: "6:00 PM",
            status: "Pending",
            payment: "$2,000",
            contactName: "Sarah Smith",
            location: "Brooklyn, NY"
        }
    ];

    // Mock data for messages
    const conversations = [
        {
            id: 1,
            with: "John Manager",
            venue: "The Blue Note",
            lastMessage: "Looking forward to your performance!",
            timestamp: "2024-12-10 14:30"
        },
        {
            id: 2,
            with: "Sarah Smith",
            venue: "Wedding Event",
            lastMessage: "Can you play our favorite song?",
            timestamp: "2024-12-09 10:15"
        }
    ];

    // Initialize bookings
    function loadBookings() {
        const bookingsGrid = document.querySelector('.bookings-grid');
        bookingsGrid.innerHTML = bookings.map(booking => `
            <div class="booking-card">
                <h3>${booking.venue}</h3>
                <div class="booking-info">
                    <p>📅 ${booking.date} at ${booking.time}</p>
                    <p>📍 ${booking.location}</p>
                    <p>💰 ${booking.payment}</p>
                    <p>👤 Contact: ${booking.contactName}</p>
                </div>
                <div class="booking-status">
                    <span class="status-badge ${booking.status.toLowerCase()}">${booking.status}</span>
                </div>
            </div>
        `).join('');
    }

    // Initialize conversations
    function loadConversations() {
        const conversationsList = document.querySelector('.conversations-list');
        conversationsList.innerHTML = conversations.map(conv => `
            <div class="conversation-item" data-id="${conv.id}">
                <div class="conversation-info">
                    <h4>${conv.with}</h4>
                    <p class="venue-name">${conv.venue}</p>
                    <p class="last-message">${conv.lastMessage}</p>
                    <span class="timestamp">${conv.timestamp}</span>
                </div>
            </div>
        `).join('');
    }

    // Navigation handling
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');

    function showSection(sectionId) {
        sections.forEach(section => {
            section.classList.add('hidden');
        });
        document.getElementById(sectionId).classList.remove('hidden');

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.id.includes(sectionId.replace('Section', ''))) {
                link.classList.add('active');
            }
        });
    }

    // Event Listeners
    document.getElementById('bookingsBtn').addEventListener('click', (e) => {
        e.preventDefault();
        showSection('bookingsSection');
        loadBookings();
    });

    document.getElementById('messagesBtn').addEventListener('click', (e) => {
        e.preventDefault();
        showSection('messagesSection');
        loadConversations();
    });

    document.getElementById('settingsBtn').addEventListener('click', (e) => {
        e.preventDefault();
        showSection('settingsSection');
    });

    // Form submissions
    document.getElementById('profileForm').addEventListener('submit', (e) => {
        e.preventDefault();
        // Handle profile update
        console.log('Profile updated');
    });

    document.getElementById('bookingPrefs').addEventListener('submit', (e) => {
        e.preventDefault();
        // Handle booking preferences update
        console.log('Booking preferences updated');
    });

    // Initialize the dashboard with bookings
    loadBookings();
});