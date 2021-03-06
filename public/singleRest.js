//fetching restaurant names to links in nav bar
let navbar = document.getElementById("nav-links");
fetch("./api/restaurants")
  .then((res) => {
    return res.json();
  })
  .then((allNames) => {
    allNames.forEach((restaurant) => {
      let resid = restaurant.id;
      let resname = restaurant.name;
      console.log(resname);
      let anchor = document.createElement("a");
      let listName = document.createElement("li");
      anchor.href = "/" + resid;
      anchor.onclick = listName.textContent = restaurant.name;
      navbar.appendChild(anchor);
      anchor.appendChild(listName);
    });
  });

//Leaflet Map
let yelpMap = L.map("map-Container").setView([44.1926, -72.7798], 11.49);
//tile code
L.tileLayer("https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png", {
  maxZoom: 20,
  attribution:
    '&copy; Openstreetmap France | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(yelpMap);

//restaurant id fetch for pin placement
let id = document.location.pathname.slice(1);
console.log(id);

fetch("/api/" + id)
  .then((res) => {
    return res.json();
  }) //as callback function here
  .then(pinGenerator);

//pin generator function
//restaurant info generator
function pinGenerator(restaurant) {
  console.log(restaurant);
  let longitude = restaurant.longitude;
  let latitude = restaurant.latitude;
  //converting those variables to integers
  long = parseFloat(longitude);
  lat = parseFloat(latitude);
  let restaurantName = restaurant.name;
  console.log(restaurant);
  //restaurant info generated to page
  let resttitle = document.getElementById("restTitle");
  let restnotes = document.getElementById("restNotes");
  let restaddress = document.getElementById("restAddress");
  let resthours = document.getElementById("restHours");
  let restphone = document.getElementById("restPhone");
//variables being created for inner html
  let title = restaurant.name;
  let notes = restaurant.notes;
  let hours = restaurant.hours;
  let address = restaurant.address;
  let phone = restaurant.phonenumber;
  //inner html
  resttitle.innerHTML = title;
  restaddress.innerHTML = address;
  resthours.innerHTML = hours;
  restnotes.innerHTML = notes;
  restphone.innerHTML = phone;

  let restaurantMarker = L.marker([lat, long]).addTo(yelpMap);
  restaurantMarker.bindPopup(`<h2>${restaurantName}</h2>`);
}

//need to make pin links
