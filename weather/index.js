document.addEventListener("DOMContentLoaded", () => {
    const apiKey = "524534d625b27a6ec7b504bd9795f57f";
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
    const searchbox = document.querySelector(".search");
    const searchbtn = document.querySelector(".go");
    const icon = document.querySelector(".icon");
    const conv = document.querySelector(".convert");
    let weatherData;

    async function checkWeather(city) {
        try {
            const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
            weatherData = await response.json(); 

            document.querySelector(".city").innerHTML = weatherData.name;
            document.querySelector(".temp").innerHTML = Math.round(weatherData.main.temp) + " °C";
            document.querySelector(".humidity").innerHTML = weatherData.main.humidity + " %";
            document.querySelector(".wind").innerHTML = weatherData.wind.speed + " km/h";

            if (weatherData.weather[0].main == "Clouds") {
                icon.src = "clouds.png";
            } 
            else if (weatherData.weather[0].main == "Rain"){
                icon.src = "rain.png";
            }
            else if (weatherData.weather[0].main == "Clear"){
                icon.src = "clear.png";
            }
            else if (weatherData.weather[0].main == "Drizzle"){
                icon.src = "drizzle.png";
            }
            else if (weatherData.weather[0].main == "Mist"){
                icon.src = "mist.png";
            }
            else if (weatherData.weather[0].main == "Snow"){
                icon.src = "snow.png";
            }

            document.querySelector(".weather").style.display = "block";
        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    }

    searchbtn.addEventListener("click", () => {
        if (searchbox.value) {
            checkWeather(searchbox.value);
        }
    });

    conv.addEventListener("click", () => {
        if (weatherData) {
            let tempCelsius = weatherData.main.temp;
            let tempFahrenheit = (tempCelsius * 9/5) + 32; 
            document.querySelector(".temp").innerHTML = Math.round(tempFahrenheit) + " °F";
        }
    });
});
