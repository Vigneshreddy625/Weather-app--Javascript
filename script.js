async function getweather() {
    const container = document.querySelector(".container");
    const cityInput = document.getElementById("city"); // Update variable name
    const cityname = cityInput.value;
    const displaytemp = document.querySelector(".display-temp");
    const displayday = document.querySelector(".display-day");
    const varieties = document.querySelector(".varieties");
    const humidity = document.getElementById("humidity");
    const windy = document.getElementById("wind");

    try {
        let data = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=e2e4ac3a6533ab87f2366eaa5f1bd0f5`
        );
        if (!data.ok) {
            throw new Error("Network response was not ok");
        }
        let response = await data.json();
        console.log(response);
        let temp = response.main.temp - 273.15;
        displaytemp.innerHTML = `${Math.floor(temp)} °C`;

        if (temp > 27) {
            displayday.innerHTML = "Sunny";
            container.style.backgroundImage = 'url("sunny.jpg")';
        } 
        else {
            displayday.innerHTML = "Cloudy";
            container.style.backgroundImage = 'url("cloudy.jpg")';
        }

        varieties.style.display = "flex";
        let hum = response.main.humidity;
        humidity.innerHTML = `%${hum}%`;
        let win = response.wind.speed;
        windy.innerHTML = `${win}km/h`;

        cityInput.value = "";
    } catch (error) {
        console.error("Error fetching data:", error);
        displaytemp.innerHTML = "Error fetching data";
        container.style.backgroundImage = 'url("weatheralert.webp")';
    }
}
