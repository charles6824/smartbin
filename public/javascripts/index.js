
function initMap(){
  const gps = {lat: 40.700802, lng: 73.987602}
  const map = new google.maps.Map(document.getElementById("map"), {center: gps, zoom: 10,})
  const marker = new google.maps.Marker({
    position: gps,
    map: map,
  })
  console.log(gps)
}
let level, gps
function Ready(){
  level = document.getElementById('level').value
  gps = document.getElementById('gps').value
}
document.getElementById('insert').onclick = function(){
  Ready()
  firebase.database().ref('bins/')
}
