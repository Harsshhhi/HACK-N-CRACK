// Character counter for login and signup pages
function initAuthPage() {
    const input = document.querySelector('.login-page input, .signup-page input');
    const counter = document.querySelector('.login-page .counter, .signup-page .counter');
    if (input && counter) {
        input.addEventListener('input', () => {
            const length = input.value.length;
            counter.textContent = `${length}/10`;
        });
    }
}

// Google Maps integration for map page
let map, directionsService, directionsRenderer;

function initMap() {
    const mapElement = document.getElementById('map');
    if (!mapElement) return;

    map = new google.maps.Map(mapElement, {
        center: { lat: 37.7749, lng: -122.4194 }, // Default: San Francisco
        zoom: 12
    });
    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);

    // Try to get user's location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const userLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            map.setCenter(userLocation);
            new google.maps.Marker({
                position: userLocation,
                map: map,
                title: "Your Location"
            });
        });
    }
}

function calculateRoute() {
    const destinationInput = document.getElementById('destination');
    if (!destinationInput) return;

    const destination = destinationInput.value;
    if (!destination) {
        alert('Please enter a destination');
        return;
    }

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const origin = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            directionsService.route({
                origin: origin,
                destination: destination,
                travelMode: google.maps.TravelMode.WALKING
            }, (result, status) => {
                if (status === google.maps.DirectionsStatus.OK) {
                    directionsRenderer.setDirections(result);
                } else {
                    alert('Could not find a route to this destination');
                }
            });
        }, () => {
            alert('Could not get your location. Please enable location services.');
        });
    }
}

// SOS functionality
function sendSOS() {
    const contact = document.getElementById('emergency-contact').value;
    const message = "SOS: I need help! Please assist me immediately.";
    if (contact) {
        const smsLink = `sms:${contact}?body=${encodeURIComponent(message)}`;
        window.location.href = smsLink;
    } else {
        alert('Please enter an emergency contact number.');
    }
}

// Community page post submission (placeholder)
function submitPost() {
    const titleInput = document.getElementById('post-title');
    const contentInput = document.getElementById('post-content');
    if (titleInput && contentInput && titleInput.value && contentInput.value) {
        alert('Post submitted! (This is a placeholder. Actual functionality requires a backend.)');
        titleInput.value = '';
        contentInput.value = '';
    } else {
        alert('Please fill in both title and content.');
    }
}

// Chatbot page functionality
function sendMessage() {
    const input = document.getElementById('chat-input');
    const messages = document.getElementById('chat-messages');
    if (!input || !messages || !input.value.trim()) return;

    // Add user message
    const userMessage = document.createElement('div');
    userMessage.className = 'message user-message';
    userMessage.innerHTML = `<p>${input.value}</p>`;
    messages.appendChild(userMessage);

    // Simulate bot response
    const botMessage = document.createElement('div');
    botMessage.className = 'message bot-message';
    const userText = input.value.toLowerCase();
    let botResponse = "I'm here to help! Could you clarify your question or specify a safety topic?";
    if (userText.includes('safety tip') || userText.includes('safe')) {
        botResponse = "Always stay in well-lit areas and share your location with a trusted contact. Want more specific advice?";
    } else if (userText.includes('emergency')) {
        botResponse = "In an emergency, call 911 immediately and use the SOS feature to alert your contacts. Need help setting it up?";
    } else if (userText.includes('travel')) {
        botResponse = "Use the Safe Path feature to find well-lit, busy routes. Avoid isolated areas, especially at night.";
    }
    botMessage.innerHTML = `<p>${botResponse}</p>`;
    setTimeout(() => messages.appendChild(botMessage), 500);

    // Clear input and scroll to bottom
    input.value = '';
    messages.scrollTop = messages.scrollHeight;
}

// Dropdown menu toggle
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

// Initialize page-specific functionality
document.addEventListener('DOMContentLoaded', () => {
    initAuthPage();
    initMap();
});