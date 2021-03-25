// import { main } from './windchill.js';

// import { weatherKey } from './apikey.js';
// var weather = new weatherKey();
// console.log(weather);
// const ApiURL = weather.key;

// const city_name = document.getElementsByClassName('city_name');
// console.log(city_name[0]);

// does not work. Maybe because page is not rendered yet
// let elements = document.getElementById('cur_condition').textContent;
// console.log(elements);

// city_id's for all of the towns
/********************************************
 * Fish Haven   - 5585010
 * Soda Springs - 5607916
 * Preston      - 5604473
 ********************************************/

// import * as x from './apikey.js';

// console.log(x);

// set days of the week automatically

function current_day(day) {

    // check and set day as the string value
    switch (day) {
        case 0:
            day = 'Sunday';
            break;
        case 1:
            day = 'Monday';
            break;
        case 2:
            day = 'Tuesday';
            break;
        case 3:
            day = 'Wednesday';
            break;
        case 4:
            day = 'Thursday';
            break;
        case 5:
            day = 'Friday';
            break;
        case 6:
            day = 'Saturday';
            break;
    }

    return day;
}


const x = document.getElementsByTagName('title')[0].textContent;
// console.log(x);

var city_id = 0;

switch (x) {
    case 'Fish Haven':
        city_id = 5585010;
        break;
    case 'Soda Springs':
        city_id = 5607916;
        break;
    case 'Preston':
        city_id = 5604473;
        break;

    default:
        break;
}

// api's for forecast and weather
const ApiURL = `https://api.openweathermap.org/data/2.5/forecast?id=${city_id}&appid=07edcaccc064119c281855eedd314fc9&units=imperial`;
const weatherURL = `https://api.openweathermap.org/data/2.5/weather?id=${city_id}&appid=07edcaccc064119c281855eedd314fc9&units=imperial`;


function wind_chill(temp, wind) {
    if (temp <= 50 && wind > 3) {
        return 'N/A';
    } else {
        return (35.74 + 0.6125 * temp - (35.75 * wind ** 0.16) + 0.4275 * temp * wind ** 0.16).toFixed(0);
    }
}


fetch(weatherURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (jsonObject) {
            var cur_condition = jsonObject.weather[0].description;
            cur_condition = cur_condition.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
            var cur_temp = jsonObject.main.temp;

            var high_temp = jsonObject.main.temp_max;
            var cur_humidity = jsonObject.main.humidity;
            var wind_speed = jsonObject.wind.speed;

            // set all of the values now
            document.getElementById('cur_condition').textContent = cur_condition;
            document.getElementById('cur_temp').textContent = cur_temp;
            document.getElementById('high_temp').textContent = high_temp;
            document.getElementById('wind_chill').textContent = wind_chill(high_temp, wind_speed);
            document.getElementById('cur_humidity').textContent = cur_humidity;
            document.getElementById('wind_speed').textContent = wind_speed;
    });



fetch(ApiURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (jsonObject) {
        // console.table(jsonObject); // temporary checking for valid response and data parsing
        // console.log(jsonObject.list[0].main.temp);

        // runs when the api call is made
        var d = new Date();
        var day = d.getDay();
        var count = day;

        // set the day of the week for the five day forecast
        for (let i = 0; i < 5; i++) {
            let day = current_day(count);
            // made into header element -> wave tool said to
            let h = document.createElement('h5');
            h.textContent = day;

            let th = document.createElement('th');
            th.appendChild(h);

            if (count == 6) { count = 0; }
            else { count++; }
            document.querySelector('tr.table_row_one').appendChild(th);
        }


        // adding table images and max temp for the day
        for (let i = 0; i < jsonObject.list.length; i++) {

            var str = jsonObject.list[i].dt_txt;
            if (str.slice(-8) === '18:00:00') {
                // console.log(jsonObject.list[i]);
                let th = document.createElement('th');

                // create image and add to th
                let img = document.createElement('img');
                const imagesrc = 'https://openweathermap.org/img/w/' + jsonObject.list[i].weather[0].icon + '.png';  // note the concatenation
                const desc = jsonObject.list[i].weather[0].description;  // note how we reference the weather array
                img.setAttribute('src', imagesrc);
                img.setAttribute('alt', desc);
                img.setAttribute('class', 'five_day_icon');

                // create the span to hold the temp
                // made into header -> wave tool said to
                let h = document.createElement('h5');
                h.textContent = (jsonObject.list[i].main.temp).toFixed(0) + '\u00B0F';

                th.appendChild(img);
                th.appendChild(h);

                document.querySelector('tr.row_two_table').appendChild(th);
            }
        }

    });