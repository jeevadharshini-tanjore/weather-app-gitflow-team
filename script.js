let isCelsius = true; // Default is Celsius

// Function to get weather
async function getWeather() {
  const city = document.getElementById("city").value;
  const apiKey = "fb0e21595ff6125c4aed21ef4fba3225"; // Replace with your real API key
  const unit = isCelsius ? "metric" : "imperial"; // 'metric' for Celsius, 'imperial' for Fahrenheit
  const symbol = isCelsius ? "°C" : "°F"; // °C for Celsius, °F for Fahrenheit
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    // Check if the API request was successful
    if (data.cod === 200) {
      document.getElementById("result").innerHTML = `
        <p><strong>${data.name}, ${data.sys.country}</strong></p>
        <p>Temp: ${data.main.temp} ${symbol}</p>
        <p>Condition: ${data.weather[0].description}</p>
      `;
    } else {
      document.getElementById("result").innerHTML = `<p>City not found.</p>`;
    }
  } catch (error) {
    document.getElementById("result").innerHTML = `<p>Error fetching data.</p>`;
  }
}

// Function to toggle between Celsius and Fahrenheit
function toggleUnit() {
  isCelsius = !isCelsius; // Toggle the unit (true -> Celsius, false -> Fahrenheit)
  console.log("Unit toggled:", isCelsius ? "Celsius" : "Fahrenheit"); // Debugging log

  const city = document.getElementById("city").value;

  // Only fetch weather data if a city has been entered
  if (city) {
    // Clear any existing weather data before re-fetching
    document.getElementById("result").innerHTML = "";

    // Fetch weather again with the new unit
    getWeather();
  }
}
