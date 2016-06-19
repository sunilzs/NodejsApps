var weather = require('./pweather');
var location = require('./plocation');

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
    console.log("Location provided!");
    weather(argv.l).then(function (currentWeather) {
        console.log(currentWeather);
    }).catch(function (error) {
        console.log(error);
    });
} else{
    console.log("Location not provided!");
    location().then(function (currentLocation) {
        return weather(currentLocation.city);
    }).then(function (currentWeather) {
        console.log(currentWeather);        
    }).catch(function (error) {
        console.log(error);
    });
}
