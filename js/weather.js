// OpenWeatherMap의 weather[0].main 값 → 이모지 + 영어 설명
const WEATHER_MAP = {
    Clear:        { emoji: "☀️", text: "Clear" },
    Clouds:       { emoji: "☁️", text: "Clouds" },
    Rain:         { emoji: "🌧️", text: "Rain" },
    Drizzle:      { emoji: "🌦️", text: "Drizzle" },
    Thunderstorm: { emoji: "⛈️", text: "Thunderstorm" },
    Snow:         { emoji: "❄️", text: "Snow" },
    Mist:         { emoji: "🌫️", text: "Mist" },
    Fog:          { emoji: "🌫️", text: "Fog" },
    Haze:         { emoji: "🌫️", text: "Haze" },
    Smoke:        { emoji: "💨", text: "Smoke" },
    Dust:         { emoji: "🌪️", text: "Dust" },
    Sand:         { emoji: "🌪️", text: "Sand" },
    Ash:          { emoji: "🌋", text: "Ash" },
    Squall:       { emoji: "💨", text: "Squall" },
    Tornado:      { emoji: "🌪️", text: "Tornado" },
};

const weatherIconWrap = document.querySelector(".weather-icon-wrap");
const weatherIcon = document.querySelector(".weather-icon");
const weatherTemp = document.querySelector(".weather-temperature");
const weatherCity = document.querySelector(".weather-city");

// 실패했을 때 화면에 이유를 짧게 보여 줌 (에러로 멈추지 않게)
function showWeatherMessage(message) {
    weatherIcon.innerText = "❓";
    weatherTemp.innerText = "--°";
    weatherCity.innerText = message;
    weatherIconWrap.dataset.description = message;
}

function paintWeather(data) {
    const main = data.weather[0].main;
    // 목록에 없는 날씨여도 기본 이모지로 표시
    const info = WEATHER_MAP[main] || { emoji: "🌤️", text: main };

    weatherIcon.innerText = info.emoji;
    weatherIconWrap.dataset.description = info.text; // 툴팁에 뜨는 글자
    weatherTemp.innerText = `${Math.round(data.main.temp)}°C`;
    weatherCity.innerText = data.name;
}

function onGeoOk(position) {
    // config.js가 없어도 에러 없이 넘어가도록 ?. 사용
    const apiKey = window.CONFIG?.API_KEY;
    if (!apiKey) {
        showWeatherMessage("No API key");
        return;
    }

    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then((response) => {
            if (!response.ok) throw new Error(`Weather API error: ${response.status}`);
            return response.json();
        })
        .then(paintWeather)
        .catch((error) => {
            console.error(error);
            showWeatherMessage("Weather unavailable");
        });
}

function onGeoError() {
    showWeatherMessage("Location unavailable");
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);