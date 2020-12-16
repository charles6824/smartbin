let lat = document.getElementById('lat').value
let lon = document.getElementById('lng').value
let level = document.getElementById('level').value

//initialize map
map = L.map('map').setView([lat, lon], 18);

//set map tiles source
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
  maxZoom: 18,
}).addTo(map);

//add marker to the map
marker = L.marker([lat, lon]).addTo(map);

//add popup to the marker
marker.bindPopup(`Bin Level: Level ${level}`).openPopup();

