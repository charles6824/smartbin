// let getMap = document.getElementById('getMap')
// let getLoc = getMap.innerHTML
// let LatMap = getLoc.split(',')
// let lat= letMap[0]
// let lng= letMap[1]
// const gpsd = {lat: `${lat}`, lng: `${lng}`}
// const map = new google.maps.Map(document.getElementById("map"), {center: gpsd, zoom: 10,})
// const marker = new google.maps.Marker({
//     position: gpsd,
//     map: map,
// })

const gpsd = {lat: 9.008, lng: 23.095}
const map = new google.maps.Map(document.getElementById("map"), {center: gpsd, zoom: 10,})
const marker = new google.maps.Marker({
    position: gpsd,
    map: map,
})

let getMap = document.getElementById('level')
let getsMap = document.getElementById('rain')