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