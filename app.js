var app = angular.module('weatherApp', []);

app.controller("WeatherController", ['$http', function($http) {

    var main = this;

    main.showWeather = false;
    
    main.weather = {};

    main.getWeather = function(location) {

        main.showWeather = false;

        $http.jsonp('http://api.wunderground.com/api/a7942b382662121a/geolookup/conditions/forecast/astronomy/q/' + location + '.json?callback=JSON_CALLBACK')
            .success(function (data) {

            main.weather.city = data['current_observation']['observation_location']['city'];
            main.weather.temperature = data['current_observation']['temp_f'];
            main.weather.conditions = data['current_observation']['weather'];
            main.weather.dewPoint = data['current_observation']['dewpoint_f'];
            main.weather.humidity = data['current_observation']['relative_humidity'];
            main.weather.windDirection = data['current_observation']['wind_dir'];
            main.weather.windSpeed = data['current_observation']['wind_mph'];
            main.weather.pressure = data['current_observation']['pressure_in'];
            main.weather.icon = data['current_observation']['icon_url'];

            if (data['current_observation']['pressure_trend'] == "+") main.weather.pressureTrend = "R";
            if (data['current_observation']['pressure_trend'] == "0") main.weather.pressureTrend = "S";
            if (data['current_observation']['pressure_trend'] == "-") main.weather.pressureTrend = "F";

            main.showWeather = true;

        });

    };

}]);
