//Tables.js
let forecastData = []; // Global array for forecast data
let currentPage = 1;
const itemsPerPage = 10;
let IsCelsius = true;

// Fetch 5-Day Weather Forecast Data
async function fetchFiveDayForecast(city) {
    const apiKey = '82bdfccab6c1f07d6ebfba9b715b59e7'; // Replace with your OpenWeather API Key
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${IsCelsius ? 'metric' : 'imperial'}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        forecastData = data.list; // Store the forecast data
        displayForecastData(forecastData); // Display the forecast data
    } catch (error) {
        console.error('Error fetching forecast data:', error);
    }
}

// Display Forecast Data in a Paginated Grid
function displayForecastData(data) {
    const forecastGrid = document.getElementById('forecast-grid');
    const paginatedData = paginate(data, currentPage, itemsPerPage);

    forecastGrid.innerHTML = ''; // Clear previous content

    paginatedData.forEach((item) => {
        const forecastItem = document.createElement('div');
        forecastItem.classList.add('forecast-item');
        const date = new Date(item.dt_txt).toLocaleDateString();
        const temp = item.main.temp;
        const description = item.weather[0].description;
        forecastItem.innerHTML = `
            <p><strong>Date:</strong> ${date}</p>
            <p><strong>Temperature:</strong> ${temp} °C</p>
            <p><strong>Description:</strong> ${description}</p>
        `;
        forecastGrid.appendChild(forecastItem);
    });

    displayPaginationControls(data.length);
}

// Pagination
function paginate(array, page, itemsPerPage) {
    return array.slice((page - 1) * itemsPerPage, page * itemsPerPage);
}

function displayPaginationControls(totalItems) {
    const paginationControls = document.getElementById('pagination');
    paginationControls.innerHTML = ''; // Clear previous controls
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        button.addEventListener('click', () => {
            currentPage = i;
            displayForecastData(forecastData); // Re-render the data for the selected page
        });
        paginationControls.appendChild(button);
    }
}

// Filter and Sorting Functions
function sortTemperaturesAscending(data) {
    const sortedData = [...data].sort((a, b) => a.main.temp - b.main.temp);
    displayForecastData(sortedData);
}

function sortTemperaturesDescending(data) {
    const sortedData = [...data].sort((a, b) => b.main.temp - a.main.temp);
    displayForecastData(sortedData);
}

function filterRainDays(data) {
    const rainyDays = data.filter(item => item.weather.some(weather => weather.main.toLowerCase().includes('rain')));
    displayForecastData(rainyDays);
}

function showHighestTemperatureDay(data) {
    const highestTempDay = data.reduce((max, item) => item.main.temp > max.main.temp ? item : max, data[0]);
    displayForecastData([highestTempDay]); // Display only the highest temp day
}

// Event Listeners for Search and Fetching Data
const SearchButton = document.querySelector('.search-button');
SearchButton.addEventListener('click', () => {
    const city = document.querySelector('.search-bar').value;
    if (city) {
        fetchFiveDayForecast(city);
    } else {
        alert('Please enter a city name.');
    }
});
