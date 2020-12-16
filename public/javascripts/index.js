let lat = document.getElementById('lat').value
let lon = document.getElementById('lng').value
let level = document.getElementById('level').value
let levelx = document.getElementById('level')
if(level = 3){
  levelx.style.backgroundColor = "red"
  levelx.style.color = "white"
  levelx.style.fontWeight = "bold"
  alert(`                               ALERT! ALERT!! ALERT!!!

                BIN Level: ${level}

                MESSAGE: Your Waste Bin is full and Ready for Disposal
          `)
}
else if(level = 2){
  levelx.style.backgroundColor = "yellow"
  levelx.style.fontWeight = "bold"
}
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

