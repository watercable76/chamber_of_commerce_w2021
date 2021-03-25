function main() {

    // get inputs from the spans
    // var temp = parseFloat(document.getElementById('high_temp').value);
    var temp = parseInt(document.getElementById('high_temp').innerHTML);
    var wind = parseFloat(document.getElementById('wind_speed').innerHTML);
    var output = '';
    if (temp <= 50 && wind > 3) {
        output = 'N/A';
    } else {
        output = wind_speed(temp, wind);
    }
    document.getElementById('wind_chill').innerHTML = output;
}

function wind_speed(temp, wind) {
    return (35.74 + 0.6125 * temp - (35.75 * wind ** 0.16) + 0.4275 * temp * wind ** 0.16).toFixed(0);
}
