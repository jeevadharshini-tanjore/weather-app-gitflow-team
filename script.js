let useCelsius = true;

async function getWeather() {
  const city = document.getElementById("city").value;
  const apiKey = "fb0e21595ff6125c4aed21ef4fba3225";
  const unit = useCelsius ? "metric" : "imperial";
  const symbol = useCelsius ? "°C" : "°F";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;

  const response = await fetch(url);
  const data = await response.json();

  if (data.cod === 200) {
    const iconCode = data.weather[0].icon;
    const iconUrl = 
'http://openweathermap.org/img/wn/10d@2x.png';
    document.getElementById("result").innerHTML = `
      <p><strong>${data.name}, ${data.sys.country}</strong></p>
      <img src="http://openweathermap.org/img/wn/10d@2x.png" alt="Weather icon">
      <p>Temp: ${data.main.temp} ${symbol}</p>
      <p>Condition: ${data.weather[0].description}</p>
    `;
  } else {
    document.getElementById("result").innerHTML = `<p>City not found.</p>`;
  }
}

function toggleUnit() {
  useCelsius = !useCelsius;
  const city = document.getElementById("city").value;
  if (city) {
    getWeather();
  }
}
