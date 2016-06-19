var weather = require('./weather');
var location = require('./location');

var argv = require('yargs')
    .options('location', {
        alias: 'l',
        demand: false,
        describe: 'Location to fetch weather for',
        type: 'string',
    })
    .help('help')
    .argv;


if(typeof(argv.l) === 'string' && argv.l.length > 0){
    weather(argv.l, function (currentWeather) {
         console.log(currentWeather);
     });
} else{
    location(function (currentLocation) {
        if(currentLocation){
            console.log("Your city is :", currentLocation.city);
            // console.log("region :", currentLocation.region);
            // console.log("lat/long :", currentLocation.loc);
            weather(currentLocation.city, function (currentWeather) {
                console.log(currentWeather);
            });
        }else{
            console.log("Location not available");
            return;
        }
    });


}



// weather(function (currentWeather) {
//     console.log(currentWeather);
// });

// location(function (currentLocation) {
//     if(!currentLocation){
//         console.log("Location not available");
//         return;
//     }else{
//         console.log("city :", currentLocation.city);
//         console.log("region :", currentLocation.region);
//         console.log("lat/long :", currentLocation.loc);
//     }
// });

