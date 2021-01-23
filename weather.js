const weather = document.querySelector(".js-weather");

const API_KEY = "9a70dee4c0ff95731c5bd3acb3c685d5";
const COORDS = "coords";

function getWeather(lat, lng){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`)
    .then(function(response) {
    return response.json();
})
    .then(function(json) {
        const temperature = json.main.temp;
        const place = json.name;
        const current = json.weather[0].main;
        weather.innerText = ` ${temperature}° / ${current} / ${place}`;
    });
}

function handleGeoSuccess(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude: latitude,
        longitude:longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoError(){
    console.log("Cant access");
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords=== null){
        askForCoords();
    } else{
        const parseCoords = JSON.parse(loadedCoords);
        getWeather(parseCoords.latitude,parseCoords.longitude);
    }
}

function init(){
    loadCoords();
}


init();