

/*Created by ankush on 20/5/16
 This project is created for to find route between two place,calculate the distance and time between them.
 you have to just input the origin place and destination place application give results of route, distance and time.*/

$(document).click('#find', function () {
    calculateDistance();

})
function initMap() {
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 7,
        center: {lat: 18.5204, lng: 73.8567}
    });
    directionsDisplay.setMap(map);

    var onChangeHandler = function () {
        calculateAndDisplayRoute(directionsService, directionsDisplay);
    };
    document.getElementById('start').addEventListener('change', onChangeHandler);
    document.getElementById('end').addEventListener('change', onChangeHandler);
}

function calculateAndDisplayRoute(directionsService, directionsDisplay) {

    directionsService.route({
        origin: document.getElementById('start').value,
        destination: document.getElementById('end').value,
        travelMode: google.maps.TravelMode.DRIVING
    }, function (response, status) {
        if (status === google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });
}

function calculateDistance() {

    var origin = document.getElementById('start').value;
    var destination = document.getElementById('end').value;

    var service = new google.maps.DistanceMatrixService;

    service.getDistanceMatrix({
        origins: [origin],
        destinations: [destination],
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC,
        avoidHighways: false,
        avoidTolls: false
    }, function (response, status) {
        if (status !== google.maps.DistanceMatrixStatus.OK) {
            alert('Error was: ' + status);
        } else {
            var originList = response.originAddresses;
            var destinationList = response.destinationAddresses;
            var outputDiv = document.getElementById('output');
            outputDiv.innerHTML = '';


            for (var i = 0; i < originList.length; i++) {
                var results = response.rows[i].elements;
                /*geocoder.geocode({'address': originList[i]},
                 showGeocodedAddressOnMap(false));*/
                for (var j = 0; j < results.length; j++) {
                    /*geocoder.geocode({'address': destinationList[j]},
                     showGeocodedAddressOnMap(true));*/
                    outputDiv.innerHTML += originList[i] + ' to ' + destinationList[j] +
                        ': ' + results[j].distance.text + ' in ' +
                        results[j].duration.text + '<br>';
                }
            }
        }
    });
}
