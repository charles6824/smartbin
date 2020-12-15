import {sendData , selector} from "./api.js"

const firebaseConfig = {
    "apiKey": "AIzaSyAGvaBLvQAjJAMBLgZkRPYtkhBbgYnqaPU",
    "authDomain": "finalbin-35e3c.firebaseapp.com",
    "databaseURL": "https://finalbin-35e3c-default-rtdb.firebaseio.com",
    "projectId": "finalbin-35e3c",
    "storageBucket": "finalbin-35e3c.appspot.com",
    "messagingSenderId": "887888512503",
    "appId": "1:887888512503:web:b987d613ed083aee569af2",
    "measurementId": "G-GX8J1JVNC5"
  };
    firebase.initializeApp(firebaseConfig)
    function fetchDetails(level ,lat, long){
        let ul = document.getElementById('list')
        let name = document.createElement('h2')

        let dlevel = document.getElementById('lev')
        let dgps = document.getElementById('gpp')

        dlevel.innerHTML = level
        dgps.innerHTML = `${lat} ${long}`

        if(level===1){
            dlevel.style.color = "blue"
        }else{
            dlevel.style.color = "red"
        }
       
        const gps = {lat: 45.008, lng: 24.673}
        const map = new google.maps.Map(document.getElementById("map"), {center: gps, zoom: 10,})
        const marker = new google.maps.Marker({
            position: gps,
            map: map,
    })
    }
function fetchData(){
    firebase.database().ref("bins/").once("value", (function(snapshot){
        snapshot.forEach(
            function(ChildSnapshot){
                let level = ChildSnapshot.val().Level
                let gps = ChildSnapshot.val().gps 
                let gpsr = gps.split(',')
                fetchDetails(level,gpsr[0], gpsr[1])
            }
        )
    }))
    sendData("/company/create-bin" , data)
    .then(res => {
        displayError.textContent = res.message
        submit.disabled = res.button
    }) 
    .catch(err => console.log(err.message))
}
window.onload(fetchData())
