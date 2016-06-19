var request = require('request');

module.exports = function (location) {
    return new Promise(function (resolve, reject){
        var city = encodeURIComponent(location);
        var url = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=f4abcc2b4afcdb75f5c61370101edb75";

        if(!location){
            return reject('No location provided');
        }

        request( {url:url, json:true},
            function (error, response, body){
                if(error){
                    reject("Cannot fetch weather");
                }else{
                    //console.log(JSON.stringify(body, null, 4));
                    resolve("It's " + body.main.temp + " in " + body.name + "!")
                }
        });        
    })
}








// function getWeather(location) {
//     return new Promise(function (resolve, reject) {
//             var city = encodeURIComponent(location);
//             var url = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=f4abcc2b4afcdb75f5c61370101edb75";
            
//             if(!location){
//                 return reject('No location provided');
//             }

//             request( {url:url, json:true},
//                 function (error, response, body){
//                     if(error){
//                         reject("Cannot fetch weather");
//                     }else{
//                         //console.log(JSON.stringify(body, null, 4));
//                         resolve("It's " + body.main.temp + " in " + body.name + "!")
//                     }
//             } );        
//     });    
// }

// getWeather('new york').then(function (currentWeather) {
//     console.log(currentWeather);    
// }, function (error) {
//     console.log(error);
// })