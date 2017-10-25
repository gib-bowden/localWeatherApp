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
                        <p>Tempurature: ${obj.main.temp}</p> 
                        <p>Conditions: ${obj.weather[0].main}</p> 
                        <p>Pressure: ${obj.main.pressure}</p> 
                        <p>Wind Speed: ${obj.wind.speed}</p> 
                    </div>
                </div>`;
    printToDom(weatherString); 
};



const printToDom = (str) => {
    currentWeatherDiv.html(str);
};


// const forecastList = (arr, numOfDays) => {
//     let currentDay = '';
//     let previousDay = '';
//     let forecastString = '';
//     let numberOfIterations = (8 * numOfDays); 
//     arr.forEach((hour, index) => {
//         if (index <= numberOfIterations) {
//             currentDay =  moment.utc(hour.dt_txt).local().format('DD');
//             let isNewDay = (currentDay !== previousDay) ? true : false;
//             if (isNewDay) {
//                 forecastString += 
//                 `<div class="row">
//                     <div class="col-xs-3 col-xs-offset-4 forecast-row day-row">${moment.utc(hour.dt_txt).local().format('dddd[, ]MMMM DD')}</div>
//                 </div>`;
//             } 
//             forecastString += 
//                 `<div class="row">
//                     <div class="col-xs-3 col-xs-offset-4 forecast-row">
//                         <div class="col-xs-3">${moment.utc(hour.dt_txt).local().format('h:mm a')}</div>
//                         <div class="col-xs-3"><img src="https://openweathermap.org/img/w/${hour.weather[0].icon}.png" alt="icon"></div>
//                         <div class="col-xs-3">${hour.weather[0].main}</div>
//                         <div class="col-xs-3">${hour.main.temp}</div>
//                     </div>            
//                 </div>`;
//             previousDay = moment.utc(hour.dt_txt).local().format('DD'); 
//         }
//     });
//     printForecast(forecastString); 
// };

// const printForecast = (str) => {
//     forecastDiv.html(str);
// };





const forecastList = (arr, numOfDays) => {
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
                forecastString += 
                `<div class="panel-group">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <h4 class="panel-title">
                                <div data-toggle="collapse" data-target="#day${dayCount}"class="">${moment.utc(hour.dt_txt).local().format('dddd[, ]MMMM DD')}</div>
                            </h4>
                        </div>
                        <div id="day${dayCount}" class="panel-collapse collapse ">
                            <div class="row forecast-row header-row">
                                <div class="col-xs-3">Hour</div>
                                <div class="col-xs-6">Conditions</div>
                                <div class="col-xs-3">Tempurature</div>
                            </div>`;
                dayCount ++; 
            } 
            forecastString += 
                            `<div class="row forecast-row">
                                <div class="col-xs-3">${moment.utc(hour.dt_txt).local().format('h:mm a')}</div>
                                <div class="col-xs-3"><img src="https://openweathermap.org/img/w/${hour.weather[0].icon}.png" alt="icon"></div>
                                <div class="col-xs-3">${hour.weather[0].main}</div>
                                <div class="col-xs-3">${hour.main.temp}</div>
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

const printForecast = (str) => {
    forecastDiv.html(str);
};































module.exports = {
    domString,
    forecastList
};