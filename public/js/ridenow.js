const form = document.querySelector('.address-form');
let map;
let markers = [];
let directionRenderers = [];
const center = { lat: 19.0760, lng: 72.877 };

function initMap(){
  let autocomplete = autofill();

  let query;
  var options = {
    zoom:14,    
    center:{
      lat: 19.0760,
      lng: 72.877
    }
  };
  map = new google.maps.Map(document.querySelector('.map'), options);

  autocomplete.addListener('place_changed', ()=>{
      query = document.querySelector('#pu-text').value;
      findOnMap(map,query);
    });

  form.addEventListener('submit', (e)=> 
    {
      e.preventDefault();
      return direction(map)
    });

}

//autofill and search places
function autofill(){
  // Create a bounding box with sides ~20km away from the center point
  const defaultBounds = {
    south: center.lat - 0.2,
    north: center.lat + 0.2,
    east: center.lng + 0.2,
    west: center.lng - 0.2,
  };

  const input1 = document.querySelector("#pu-text");
  const input2 = document.querySelector("#d-text");
  const options = {
    bounds: defaultBounds,
    componentRestrictions: { country: "in" },
    fields: ["address_components", "geometry", "icon", "name"],
    strictBounds: false,
  };
  const autocomplete1 = new google.maps.places.Autocomplete(input1, options);
  const autocomplete2 = new google.maps.places.Autocomplete(input2, options);

  return autocomplete1;
}

function findOnMap(map, query){
  var request = {
    query: query,
    fields: ['name', 'geometry'],
  };

  var service = new google.maps.places.PlacesService(map);

  service.findPlaceFromQuery(request, function(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        createMarker(results[i]);
      }
      map.setCenter(results[0].geometry.location);
    }
  });
}

function createMarker(place) {
  deleteMarkers();
  if (!place.geometry || !place.geometry.location) return;

  const marker = new google.maps.Marker({
    map,
    position: place.geometry.location,
  });
  markers.push(marker);

  // google.maps.event.addListener(marker, "click", () => {
  //   infowindow.setContent(place.name || "");
  //   infowindow.open(map);
  // });
}

function deleteMarkers() {
    if(markers[0])
        markers[0].setMap(null);
    markers = [];
}

function direction(map){
  if(directionRenderers[0]){
    directionRenderers[0].setMap(null);
    directionRenderers=[];
  }
  console.log("direction enter");
  var directionsService = new google.maps.DirectionsService();
  var directionsRenderer = new google.maps.DirectionsRenderer();
  directionsRenderer.setMap(map);
  directionRenderers.push(directionsRenderer);
  calcRoute(directionsService, directionRenderers[0]);
}

function calcRoute(directionsService, directionsRenderer) {
  var start = document.querySelector('#pu-text').value;
  var end = document.querySelector('#d-text').value;
  var request = {
    origin: start,
    destination: end,
    travelMode: 'DRIVING',
  };
  directionsService.route(request, function(result, status) {
    if (status == 'OK') {
      directionsRenderer.setDirections(result);
      distMatrix(start,end);

    }
  });
}

function distMatrix(origin, destination){
  var origin1 = origin;
  var destinationA = destination;

  var service = new google.maps.DistanceMatrixService();
  service.getDistanceMatrix(
    {
      origins: [origin1],
      destinations: [destinationA],
      travelMode: 'DRIVING',
      drivingOptions: {
        departureTime: new Date(Date.now() + 100*60*5),  // for the time N milliseconds from now.
        trafficModel: 'optimistic'
      }
    }, (response, status)=>{
      if (status == 'OK') {
        var origins = response.originAddresses;
        var destinations = response.destinationAddresses;
    
        for (var i = 0; i < origins.length; i++) {
          var results = response.rows[i].elements;
          for (var j = 0; j < results.length; j++) {
            var element = results[j];
            var distance = element.distance.text;
            var duration = element.duration.text;
            var from = origins[i];
            var to = destinations[j];
          }
        }

        //display above stuff
        const dispResult = document.querySelector(".dispResult");
        dispResult.innerHTML = "Total Distance: " + distance + "<br>" +
                                "Duration: " + duration;
      }
    });
}
