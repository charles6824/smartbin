const firebase = require("../routes/index")

module.export = {
    function (){
        firebase.database().ref("bins/").once("value", (function(snapshot){
            snapshot.forEach(
                function(ChildSnapshot){
                    let level = ChildSnapshot.val().Level
                    let gps = ChildSnapshot.val().gps 
                    addDetails(level,gps)
                }
            )
        }))
    }
}