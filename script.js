const apiKey = "3935d6e04cb33f61be2ef2683d0568de";

const searchBtn = document.getElementById("searchBtn");

const cityInput = document.getElementById("cityInput");

const cityName = document.getElementById("cityName");

const temperature = document.getElementById("temperature");

const description = document.getElementById("description");

const humidity = document.getElementById("humidity");

const wind = document.getElementById("wind");

searchBtn.addEventListener("click", async () => {

    const city = cityInput.value;

    if(city === "") {
        alert("Please enter a city name");
        return;
    }

    const url =
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {

        const response = await fetch(url);

        if(!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

        cityName.textContent = data.name;

        temperature.textContent =
        `Temperature: ${data.main.temp} °C`;

        description.textContent =
        `Weather: ${data.weather[0].description}`;

        humidity.textContent =
        `Humidity: ${data.main.humidity}%`;

        wind.textContent =
        `Wind Speed: ${data.wind.speed} m/s`;

    }

    catch(error) {

        alert(error.message);
    }
});
