import bin from "../../model/bin.js";
import {sendData , selector} from "./api.js"
 function fetchDetails(lat, long){
    const gpsd = {lat: lat, lng: long}
    const map = new google.maps.Map(document.getElementById("map"), {center: gpsd, zoom: 10,})
    const marker = new google.maps.Marker({
        position: gpsd,
        map: map,
})
 }     
function fetchData(){
    firebase.database().ref('bins/').once("value", (function(snapshot){
        snapshot.forEach(
            function(ChildSnapshot){
                let gps = ChildSnapshot.val().gps 
                let gpsr = gps.split(',')
                fetchDetails(gpsr[0], gpsr[1])
            }
        )
        }))
    sendData("/company/create-bin" + bin._id)
    .then(res => {
        displayError.textContent = res.message
    }) 
    .catch(err => console.log(err.message))
}
fetchData()
