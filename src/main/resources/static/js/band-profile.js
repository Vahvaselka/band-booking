

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
            timestamp: "2024-12-10 14:30",
            messages: [
                { type: 'received', text: "Hi! I wanted to discuss the performance details.", time: "14:25" },
                { type: 'sent', text: "Of course! What would you like to know?", time: "14:28" },
                { type: 'received', text: "Looking forward to your performance!", time: "14:30" }
            ]
        },
        {
            id: 2,
            with: "Sarah Smith",
            venue: "Wedding Event",
            lastMessage: "Can you play our favorite song?",
            timestamp: "2024-12-09 10:15",
            messages: [
                { type: 'received', text: "Hello! About our wedding...", time: "10:10" },
                { type: 'sent', text: "Yes, we're available!", time: "10:12" },
                { type: 'received', text: "Can you play our favorite song?", time: "10:15" }
            ]
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

    // Initialize conversations list
    function loadConversations() {
        const conversationsList = document.querySelector('.conversations-list');
        conversationsList.innerHTML = conversations.map(conv => `
            <div class="conversation-item" data-id="${conv.id}">
                <div class="sender">${conv.with}</div>
                <div class="preview">${conv.lastMessage}</div>
                <div class="timestamp">${conv.timestamp}</div>
            </div>
        `).join('');

        // Clear message view
        const messageView = document.querySelector('.message-view');
        messageView.innerHTML = `
            <div class="message-header">
                <div class="recipient-info">
                    <div class="recipient-avatar"></div>
                    <h2 class="recipient-name">Select a conversation</h2>
                </div>
            </div>
            <div class="messages-content"></div>
            <div class="message-composer">
                <div class="input-wrapper">
                    <button class="attachment-btn">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M12 5v14M5 12h14"/>
                        </svg>
                    </button>
                    <input type="text" placeholder="iMessage" disabled>
                    <button class="emoji-btn">😊</button>
                </div>
                <button class="send-btn" disabled>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
                    </svg>
                </button>
            </div>
        `;

        // Add click handlers for conversations
        const conversationItems = document.querySelectorAll('.conversation-item');
        conversationItems.forEach(item => {
            item.addEventListener('click', () => {
                const convId = parseInt(item.dataset.id);
                loadMessageThread(convId);

                // Update active state
                conversationItems.forEach(i => i.classList.remove('active'));
                item.classList.add('active');
            });
        });
    }

    // Load specific message thread
    function loadMessageThread(conversationId) {
        const conversation = conversations.find(c => c.id === conversationId);
        if (!conversation) return;

        const messageView = document.querySelector('.message-view');

        // Update header
        const header = messageView.querySelector('.message-header');
        header.innerHTML = `
            <div class="recipient-info">
                <div class="recipient-avatar"></div>
                <h2 class="recipient-name">${conversation.with}</h2>
            </div>
        `;

        // Update messages
        const messagesContent = messageView.querySelector('.messages-content');
        messagesContent.innerHTML = conversation.messages.map(msg => `
            <div class="message ${msg.type}">
                ${msg.text}
                <span class="message-time">${msg.time}</span>
            </div>
        `).join('');

        // Enable message composer
        const input = messageView.querySelector('input');
        const sendBtn = messageView.querySelector('.send-btn');
        input.disabled = false;
        sendBtn.disabled = false;
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

        // Load section-specific content
        if (sectionId === 'messagesSection') {
            loadConversations();
        } else if (sectionId === 'bookingsSection') {
            loadBookings();
        }
    }

    // Event Listeners
    document.getElementById('bookingsBtn').addEventListener('click', (e) => {
        e.preventDefault();
        showSection('bookingsSection');
    });

    document.getElementById('messagesBtn').addEventListener('click', (e) => {
        e.preventDefault();
        showSection('messagesSection');
    });

    document.getElementById('settingsBtn').addEventListener('click', (e) => {
        e.preventDefault();
        showSection('settingsSection');
    });

    // Form submissions
    document.getElementById('profileForm').addEventListener('submit', (e) => {
        e.preventDefault();
        console.log('Profile updated');
    });

    document.getElementById('bookingPrefs').addEventListener('submit', (e) => {
        e.preventDefault();
        console.log('Booking preferences updated');
    });

    // Initialize the dashboard with bookings section
    document.getElementById('messagesSection').classList.add('hidden');
    document.getElementById('settingsSection').classList.add('hidden');
    loadBookings();
});