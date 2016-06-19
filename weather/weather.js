var request = require('request');

module.exports = function (location, callback) {
    var city = encodeURIComponent(location);
    var url = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=f4abcc2b4afcdb75f5c61370101edb75";
    
    if(!location){
        return callback('No location provided');
    }

    request( {url:url, json:true},
        function (error, response, body){
            if(error){
                callback("Cannot fetch weather");
            }else{
                //console.log(JSON.stringify(body, null, 4));
                callback("It's " + body.main.temp + " in " + body.name + "!")
            }
    } );

    //console.log("Fetching weather information for " + city);
};


