const apiKey = "ded9934ed0msh898b2e227cb596ap1edbebjsna7888735de53";
const apiHost = "weatherapi-com.p.rapidapi.com";

document.getElementById('search-form').addEventListener('submit', async function(event) {
  event.preventDefault(); // Prevent form from submitting in the default way

  const city = document.getElementById('city-input').value.trim(); // Get the value from the input field

  if (city) {
    // Fetch current weather data
    const currentUrl = `https://${apiHost}/current.json?q=${encodeURIComponent(city)}`;
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": apiKey,
        "x-rapidapi-host": apiHost,
      },
    };

    try {
      const response = await fetch(currentUrl, options);
      if (!response.ok) throw new Error('Network response was not ok');
      const result = await response.json();

      // Update HTML elements with fetched data
      document.getElementById('location').textContent = `${result.location.name}, ${result.location.region}, ${result.location.country}`;
      document.getElementById('temp_f').textContent = result.current.temp_f;
      document.getElementById('temp_c').textContent = result.current.temp_c;
      document.getElementById('condition').textContent = result.current.condition.text;
      document.getElementById('wind_mph').textContent = result.current.wind_mph;
      document.getElementById('wind_kph').textContent = result.current.wind_kph;
      document.getElementById('pressure_mb').textContent = result.current.pressure_mb;
      document.getElementById('pressure_in').textContent = result.current.pressure_in;
      document.getElementById('humidity').textContent = result.current.humidity;
      document.getElementById('precip_mm').textContent = result.current.precip_mm;
      document.getElementById('precip_in').textContent = result.current.precip_in;
      document.getElementById('feelslike_c').textContent = result.current.feelslike_c;
      document.getElementById('feelslike_f').textContent = result.current.feelslike_f;
      document.getElementById('windchill_c').textContent = result.current.windchill_c;
      document.getElementById('windchill_f').textContent = result.current.windchill_f;
      document.getElementById('heatindex_c').textContent = result.current.heatindex_c;
      document.getElementById('heatindex_f').textContent = result.current.heatindex_f;
      document.getElementById('dewpoint_c').textContent = result.current.dewpoint_c;
      document.getElementById('dewpoint_f').textContent = result.current.dewpoint_f;
      document.getElementById('vis_km').textContent = result.current.vis_km;
      document.getElementById('vis_miles').textContent = result.current.vis_miles;
      document.getElementById('uv').textContent = result.current.uv;
      document.getElementById('gust_mph').textContent = result.current.gust_mph;
      document.getElementById('gust_kph').textContent = result.current.gust_kph;

      // Fetch past 10 days' weather data
      const historicalUrl = `https://${apiHost}/history.json?q=${encodeURIComponent(city)}&dt=${getPastDate(10)}`;
      const historicalResponse = await fetch(historicalUrl, options);
      if (!historicalResponse.ok) throw new Error('Network response was not ok');
      const historicalResult = await historicalResponse.json();

      // Populate the weather summary table using the updateWeatherSummaryTable function
      updateWeatherSummaryTable(historicalResult.forecast.forecastday);

    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  } else {
    alert("Please enter a city name.");
  }
});

// Helper function to get the date for n days ago
function getPastDate(daysAgo) {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString().split('T')[0];
}

// Function to update the weather summary table
function updateWeatherSummaryTable(days) {
  const tbody = document.getElementById('weather-summary-body');
  tbody.innerHTML = ''; // Clear existing rows

  days.forEach(day => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${day.date}</td>
      <td>${day.day.temp_c || 'N/A'}</td>
      <td>${day.day.temp_f || 'N/A'}</td>
      <td>${day.day.feelslike_c || 'N/A'}</td>
      <td>${day.day.feelslike_f || 'N/A'}</td>
      <td>${day.day.humidity || 'N/A'}</td>
      <td>${day.day.pressure_mb || 'N/A'}</td>
      <td>${day.day.wind_kph || 'N/A'}</td>
      <td>${day.day.wind_mph || 'N/A'}</td>
      <td>${day.day.precip_mm || 'N/A'}</td>
      <td>${day.day.precip_in || 'N/A'}</td>
      <td>${day.day.uv || 'N/A'}</td>
      <td>${day.day.vis_km || 'N/A'}</td>
      <td>${day.day.vis_miles || 'N/A'}</td>
      <td>${day.day.windchill_c || 'N/A'}</td>
      <td>${day.day.windchill_f || 'N/A'}</td>
      <td>${day.day.heatindex_c || 'N/A'}</td>
      <td>${day.day.heatindex_f || 'N/A'}</td>
      <td>${day.day.dewpoint_c || 'N/A'}</td>
      <td>${day.day.dewpoint_f || 'N/A'}</td>
      <td>${day.day.gust_kph || 'N/A'}</td>
      <td>${day.day.gust_mph || 'N/A'}</td>
    `;
    tbody.appendChild(row);
  });
}


