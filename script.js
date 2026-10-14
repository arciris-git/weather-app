const apiKey = "456818c5faa26932060f9facf9d5c81d";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search-btn");
const weatherIcon = document.querySelector(".weather-icon");
const errorMsg = document.querySelector("#error-msg");
const weatherInfo = document.querySelector("#weather-info");

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status == 404) {
        errorMsg.style.display = "block";
        weatherInfo.style.display = "none";
    } else {
        var data = await response.json();

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        // Update weather icon based on conditions
        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "https://cdn-icons-png.flaticon.com/512/414/414927.png";
        } else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "https://cdn-icons-png.flaticon.com/512/869/869869.png";
        } else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "https://cdn-icons-png.flaticon.com/512/3351/3351979.png";
        } else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "https://cdn-icons-png.flaticon.com/512/3076/3076129.png";
        } else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "https://cdn-icons-png.flaticon.com/512/4005/4005901.png";
        }

        errorMsg.style.display = "none";
        weatherInfo.style.display = "block";
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

searchBox.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        checkWeather(searchBox.value);
    }
});