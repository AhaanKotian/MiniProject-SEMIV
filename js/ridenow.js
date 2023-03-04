const form = document.querySelector('.address-form');
let map;
let markers = [];

function initMap(){
  autofill();

  let query;
  var options = {
    zoom:14,    
    center:{
      lat: 19.0760,
      lng: 72.877
    }
  };
  map = new google.maps.Map(document.querySelector('.map'), options);

  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    query = document.querySelector('.pu-text').value;
    findOnMap(map,query);
  })

}

//autofill and search places
function autofill(){

  const center = { lat: 19.0760, lng: 72.877 };

  // Create a bounding box with sides ~20km away from the center point
  const defaultBounds = {
    south: center.lat - 0.2,
    north: center.lat + 0.2,
    east: center.lng + 0.2,
    west: center.lng - 0.2,
  };

  const input = document.querySelector(".pu-text");
  const options = {
    bounds: defaultBounds,
    componentRestrictions: { country: "in" },
    fields: ["address_components", "geometry", "icon", "name"],
    strictBounds: false,
  };
  const autocomplete = new google.maps.places.Autocomplete(input, options);
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
