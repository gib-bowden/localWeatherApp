"use strict";

const moment = require('../lib/node_modules/moment/moment.js');

const currentWeatherDiv = $('#current-weather-container');
const forecastDiv = $('#forecast-container');

const domString = (obj, apiKey) => {
    console.log(obj); 
    let weatherString = 
            `<div class="col-xs-3 col-xs-offset-4">
                <div class="thumbnail">
                    <ul id="weather-options" class="nav nav-pills">
                        <li id="three-day-btn" role="presentation"><a href="#">3-Day</a></li>
                        <li id="five-day-btn" role="presentation"><a href="#">5-Day</a></li>
                    </ul>
                    <img src="http://tile.openweathermap.org/map/precipitation/3/${obj.coord.lon}/${obj.coord.lat}.png?appid=${apiKey}&basemap=map&cities=true"></img>
                    <div class="caption">
                        <h3>Current weather for ${obj.name}
                        <img src="https://openweathermap.org/img/w/${obj.weather[0].icon}.png" alt="icon">
                        </h3>
                        <p>Tempurature: ${obj.main.temp}</p> 
                        <p>Conditions: ${obj.weather[0].main}</p> 
                        <p>Pressure: ${obj.main.pressure}</p> 
                        <p>Wind Speed: ${obj.wind.speed}</p> 
                    </div>
                </div>
            </div>`;
    printToDom(weatherString); 
};



const printToDom = (str) => {
    currentWeatherDiv.html(str);
};


const forecastList = (arr) => {
    let forecastString = '';
    arr.forEach((hour) => {
        forecastString += 
            `<div class="row">
                <div class="col-xs-3 col-xs-offset-4">
                    <div class="col-xs-3">${moment.utc(hour.dt_txt).local().format('lll')}</div>
                    <div class="col-xs-3"><img src="https://openweathermap.org/img/w/${hour.weather[0].icon}.png" alt="icon"></div>
                    <div class="col-xs-3">${hour.weather[0].main}</div>
                    <div class="col-xs-3">${hour.main.temp}</div>
                </div>            
            </div>`;
    });
    printForecast(forecastString); 
};

const printForecast = (str) => {
    forecastDiv.html(str);
};

module.exports = {
    domString,
    forecastList
};