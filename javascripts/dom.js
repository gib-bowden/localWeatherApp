"use strict";

const moment = require('../lib/node_modules/moment/moment.js');

const currentWeatherDiv = $('#current-weather-container');
const forecastDiv = $('#forecast-container');

const domString = (obj) => {
    console.log(obj); 
    let weatherString = 
                `<div class="thumbnail">
                    <ul id="weather-options" class="nav nav-pills">
                        <li id="three-day-btn" role="presentation"><a href="#">3-Day</a></li>
                        <li id="five-day-btn" role="presentation"><a href="#">5-Day</a></li>
                    </ul>
                    <div class="caption">
                        <h3>Current weather for ${obj.name}
                        <img src="https://openweathermap.org/img/w/${obj.weather[0].icon}.png" alt="icon">
                        </h3>
                        <p>Tempurature: ${roundNumStr(obj.main.temp)}<sup> °</sup>F</p> 
                        <p>Conditions: ${obj.weather[0].main}</p> 
                        <p>Pressure: ${obj.main.pressure} hPa</p> 
                        <p>Wind Speed: ${roundNumStr(obj.wind.speed)} MPH ${degToCompass(obj.wind.deg)}</p> 
                    </div>
                </div>`;
    printToDom(weatherString); 
};



const printToDom = (str) => {
    currentWeatherDiv.html(str);
};



const forecastList = (arr, numOfDays) => {
    let today = moment().local().format('DD');
    let currentDay = '';
    let previousDay = '';
    let forecastString = '';
    let numberOfIterations = (8 * numOfDays); 
    let dayCount = 0; 
    arr.forEach((hour, index) => {
        if (index <= numberOfIterations) {
            currentDay =  moment.utc(hour.dt_txt).local().format('DD');
            let isNewDay = (currentDay !== previousDay) ? true : false;
            if (isNewDay) {
                let panelTitleText = (currentDay === today) ? "Today" : moment.utc(hour.dt_txt).local().format('dddd[, ]MMMM DD');
                forecastString += 
                `<div class="panel-group">
                    <div class="panel panel-default">
                        <div class="panel-heading" data-toggle="collapse" data-target="#day${dayCount}">
                            <h4 class="panel-title">${panelTitleText}
                            </h4>
                        </div>
                        <div id="day${dayCount}" class="panel-collapse collapse ">
                            <div class="row forecast-row header-row">
                                <div class="col-xs-2">Time</div>
                                <div class="col-xs-2">Conditions</div>
                                <div class="col-xs-2">Tempurature</div>
                                <div class="col-xs-2">Humidity</div>
                                <div class="col-xs-2">Wind</div>
                                <div class="col-xs-2"></div>
                            </div>`;
                dayCount ++; 
            } 
            forecastString += 
                            `<div class="row forecast-row">
                                <div class="col-xs-2">${moment.utc(hour.dt_txt).local().format('h:mm a')}</div>
                                <div class="col-xs-2"><img src="https://openweathermap.org/img/w/${hour.weather[0].icon}.png" alt="icon"> ${hour.weather[0].main}</div>
                                <div class="col-xs-2">${roundNumStr(hour.main.temp)}<sup> °</sup>F</div>
                                <div class="col-xs-2">${roundNumStr(hour.main.humidity)}%</div>                                
                                <div class="col-xs-2">${roundNumStr(hour.wind.speed)} MPH ${degToCompass(hour.wind.deg)}</div> 
                                <div class="col-xs-2"><button class="btn btn-primary btn-sm">Save</button></div>
                            </div>`;      
            
            if (moment.utc(hour.dt_txt).local().format('h:mm a') === '10:00 pm') {
                forecastString += 
                        `</div>
                    </div>
                </div>`;
            }

            previousDay = moment.utc(hour.dt_txt).local().format('DD'); 
        }
    });
    printForecast(forecastString); 
};

const roundNumStr = (numStr) => {
    return Math.round(Number(numStr));
};

const degToCompass = (numStr) => {
    let num = Number(numStr);
    var val = Math.floor((num / 22.5) + 0.5);
    var arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
    return arr[(val % 16)];
};

const printForecast = (str) => {
    forecastDiv.html(str);
};
































module.exports = {
    domString,
    forecastList
};