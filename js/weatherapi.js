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
//  [43.826, -111.7897]  -  lat, long
// exclude - minutely,hourly
const lat = 43.826;
const lon = -111.7897;
const exclude = 'minutely,hourly';
// const weatherURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=${part}&appid=07edcaccc064119c281855eedd314fc9&units=imperial`;
const weatherURL = `https://api.openweathermap.org/data/2.5/onecall?lat=43.826&lon=-111.7897&exclude=minutely,hourly&appid=07edcaccc064119c281855eedd314fc9&units=imperial`;
// const weatherURL = `https://api.openweathermap.org/data/2.5/weather?id=${city_id}&appid=07edcaccc064119c281855eedd314fc9&units=imperial`;


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
            console.log(jsonObject);
            var cur_condition = jsonObject.current.weather[0].description;
            cur_condition = cur_condition.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
            var cur_temp = jsonObject.current.temp;
            var cur_humidity = jsonObject.current.humidity;

            // set all of the values now
            document.getElementById('cur_condition').textContent = cur_condition;
            document.getElementById('cur_temp').textContent = cur_temp;
            document.getElementById('cur_humidity').textContent = cur_humidity;

            // runs when the api call is made
            var d = new Date();
            var day = d.getDay();
            var count = day;

            // set the day of the week for the five day forecast
            for (let i = 0; i < 3; i++) {

                // data for the headers
                let day = current_day(count);
                // made into header element -> wave tool said to
                let header1 = document.createElement('h5');
                header1.textContent = day;

                let div1 = document.createElement('div');
                div1.setAttribute('class', 'divTableCell');
                div1.appendChild(header1);

                if (count == 6) { count = 0; }
                else { count++; }
                document.querySelector('.divTableRowOne').appendChild(div1);
            }

            // set the temp and img data for the forecast
            for (let i = 0; i < 3; i++) {
                let header2 = document.createElement('h5');
                header2.textContent = (jsonObject.daily[i].temp.day).toFixed(0) + '\u00B0F';

                // create image and add to th
                let img = document.createElement('img');
                const imagesrc = 'https://openweathermap.org/img/w/' + jsonObject.daily[i].weather[0].icon + '.png';  // note the concatenation
                const desc = jsonObject.daily[i].weather[0].description;  // note how we reference the weather array
                img.setAttribute('src', imagesrc);
                img.setAttribute('alt', desc);
                img.setAttribute('class', 'five_day_icon');

                let div = document.createElement('div');
                div.setAttribute('class', 'divTableCell');

                // adding data to the table
                div.appendChild(img);
                div.appendChild(header2);

                document.querySelector('.divTableRowTwo').appendChild(div);
            }

            // has to check if is undefined and cannot check at an index (doesn't exist)
            if (jsonObject.alerts != undefined) {
                for (let i = 0; i < jsonObject.alerts.length; i++) {
                    const element = jsonObject.alerts[i].description;
                    console.log(element);
                    alert(element);
                }
            }
    });
