// DOM elements for displaying weather data
const weatherDataContainer = document.querySelector('.weather-data');
const searchBar = document.querySelector('.search-bar');
const searchButton = document.querySelector('.search-button');
const switchButton = document.querySelector('.switch-button');
let isCelsius = true;

// Chart.js setup (creating references for future updates)
let barChart, doughnutChart, lineChart;

// Function to fetch weather data based on city name
async function fetchWeather(city) {
    const apiKey = '82bdfccab6c1f07d6ebfba9b715b59e7'; // Replace with your OpenWeather API Key
    const units = isCelsius ? 'metric' : 'imperial';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        displayWeatherData(data); // Display fetched data
        updateCharts(data); // Update charts with fetched data
    } catch (error) {
        console.error('Error fetching weather data:', error);
        weatherDataContainer.innerHTML = `<p>Error fetching weather data: ${error.message}. Please try again later.</p>`;
    }
}

// Function to fetch weather data based on coordinates (for geolocation)
async function fetchWeatherByLocation(lat, lon) {
    const apiKey = '82bdfccab6c1f07d6ebfba9b715b59e7'; // Replace with your OpenWeather API Key
    const units = isCelsius ? 'metric' : 'imperial';
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        displayWeatherData(data); // Display fetched data
        updateCharts(data); // Update charts with fetched data
    } catch (error) {
        console.error('Error fetching weather data:', error);
        weatherDataContainer.innerHTML = `<p>Error fetching weather data: ${error.message}. Please try again later.</p>`;
    }
}

// Function to display weather data
function displayWeatherData(data) {
    const { name, main, wind, weather } = data;
    const temperature = main.temp;
    const humidity = main.humidity;
    const windSpeed = wind.speed;
    const description = weather[0].description;
    const icon = weather[0].icon;
    const unit = isCelsius ? '°C' : '°F';
    const windUnit = isCelsius ? 'm/s' : 'mph';

    weatherDataContainer.innerHTML = `
        <h2>Weather in ${name}</h2>
        <p>Temperature: ${temperature} ${unit}</p>
        <p>Humidity: ${humidity}%</p>
        <p>Wind Speed: ${windSpeed} ${windUnit}</p>
        <p>Description: ${description}</p>
        <img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon" />
    `;
}

// Function to update charts based on weather data
function updateCharts(data) {
    const { main, wind } = data;

    const temperature = main.temp;
    const humidity = main.humidity;
    const windSpeed = wind.speed;

    const chartData = [temperature, humidity, windSpeed];

    // Bar Chart with delay animation
    const ctxBar = document.getElementById('vertical-bar-chart').getContext('2d');
    if (barChart) {
        barChart.data.datasets[0].data = chartData;
        barChart.update();
    } else {
        barChart = new Chart(ctxBar, {
            type: 'bar',
            data: {
                labels: ['Temperature', 'Humidity', 'Wind Speed'],
                datasets: [{
                    label: 'Weather Data',
                    data: chartData,
                    backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 159, 64, 0.2)', 'rgba(54, 162, 235, 0.2)'],
                    borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 159, 64, 1)', 'rgba(54, 162, 235, 1)'],
                    borderWidth: 1
                }]
            },
            options: {
                animation: {
                    delay: function (context) {
                        let delay = 0;
                        if (context.type === 'data' && context.mode === 'default' && !context.dropped) {
                            delay = context.dataIndex * 300 + context.datasetIndex * 100;
                            context.dropped = true;
                        }
                        return delay;
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    // Doughnut Chart with delay animation
    const ctxDoughnut = document.getElementById('doughnut-chart').getContext('2d');
    if (doughnutChart) {
        doughnutChart.data.datasets[0].data = chartData;
        doughnutChart.update();
    } else {
        doughnutChart = new Chart(ctxDoughnut, {
            type: 'doughnut',
            data: {
                labels: ['Temperature', 'Humidity', 'Wind Speed'],
                datasets: [{
                    data: chartData,
                    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                    hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
                }]
            },
            options: {
                animation: {
                    delay: function (context) {
                        let delay = 0;
                        if (context.type === 'data' && context.mode === 'default' && !context.dropped) {
                            delay = context.dataIndex * 300 + context.datasetIndex * 100;
                            context.dropped = true;
                        }
                        return delay;
                    }
                }
            }
        });
    }

    // Line Chart with drop animation
    const ctxLine = document.getElementById('line-chart').getContext('2d');
    if (lineChart) {
        lineChart.data.datasets[0].data = chartData;
        lineChart.update();
    } else {
        lineChart = new Chart(ctxLine, {
            type: 'line',
            data: {
                labels: ['Temperature', 'Humidity', 'Wind Speed'],
                datasets: [{
                    label: 'Weather Data',
                    data: chartData,
                    fill: false,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    tension: 0.1
                }]
            },
            options: {
                animation: {
                    y: {
                        from: -1000, // drop animation from above
                        duration: 1500,
                        easing: 'easeOutBounce'
                    }
                }
            }
        });
    }
}
// Event listener for search button
searchButton.addEventListener('click', () => {
    const city = searchBar.value;
    if (city) {
        fetchWeather(city);
    } else {
        alert('Please enter a city name.');
    }
});

// Event listener for pressing Enter in the search bar
searchBar.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const city = searchBar.value;
        if (city) {
            fetchWeather(city);
        }
    }
});

// Event listener for switching between Celsius and Fahrenheit
switchButton.addEventListener('click', () => {
    isCelsius = !isCelsius;
    switchButton.textContent = isCelsius ? 'Switch to Fahrenheit' : 'Switch to Celsius';
    
    const city = searchBar.value;
    if (city) {
        fetchWeather(city); // Re-fetch the weather data for the same city after switching units
    }
});

// Geolocation API to fetch weather based on user's location
if (navigator.geolocation) { 
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            fetchWeatherByLocation(latitude, longitude); // Fetch weather based on user's current location
        },
        (error) => {
            console.error('Geolocation not available or permission denied', error);
            weatherDataContainer.innerHTML = `<p>Geolocation not available. Please search for a city manually.</p>`;
        },
        { enableHighAccuracy: true } // Enable high accuracy mode
    );
} else {
    weatherDataContainer.innerHTML = `<p>Geolocation not supported by this browser. Please search for a city manually.</p>`;
}
 