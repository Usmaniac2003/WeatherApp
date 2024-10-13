
---

# Weather Dashboard with Chatbot Integration

This is a fully responsive weather dashboard application that provides current weather data, a 5-day forecast, and chatbot functionality. The application uses OpenWeather API to fetch weather data and the Gemini Chatbot API for chatbot integration. The dashboard is designed to be user-friendly, with sorting, filtering, and chart visualization features.

## Features

- **Current Weather Data**: Displays real-time weather data for any city using the OpenWeather API.
- **5-Day Weather Forecast**: Provides a 5-day forecast with temperatures, humidity, and weather conditions, along with pagination for easy navigation.
- **Sorting and Filtering**: Allows users to sort temperatures in ascending or descending order, filter out days without rain, and display the day with the highest temperature.
- **Responsive Design**: The application is fully responsive and adjusts seamlessly across different screen sizes and devices.
- **Weather Data Visualization**: Visualize weather data using charts (bar, line, and doughnut) created with Chart.js.
- **Chatbot Integration**: Ask weather-related questions like "What is the highest temperature this week?" and receive answers from a chatbot using the Gemini Chatbot API.

## Technologies Used

- **HTML5 & CSS3**: Structure and styling of the weather dashboard.
- **JavaScript**: Implements the core functionality for fetching data, handling user input, and chart animations.
- **OpenWeather API**: For fetching real-time weather data and forecasts.
- **Chart.js**: For rendering dynamic and interactive charts to visualize weather data.
- **Gemini Chatbot API**: For chatbot functionality to answer user queries.
- **Responsive Design**: Ensures the application looks great on both desktop and mobile devices.

## How to Use

1. **Search for Weather**: Enter a city name in the search bar and click "Search" to fetch the current weather and 5-day forecast for the specified location.
2. **Switch Units**: Toggle between Celsius and Fahrenheit using the "Switch to Fahrenheit" button.
3. **View Forecast Data**: Browse the 5-day forecast in a table format with pagination controls for navigation.
4. **Sorting & Filtering**:
    - Sort temperatures in ascending or descending order.
    - Filter to show only days with rain.
    - Show the day with the highest temperature.
5. **Chatbot**: Ask questions like "What is the highest temperature this week?" in the chatbot input box and receive responses based on the forecast data.

## Installation & Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/weather-dashboard.git
   ```

2. Navigate to the project directory:

   ```bash
   cd weather-dashboard
   ```

3. Open the project in a text editor or IDE (e.g., VS Code).

4. Create an `.env` file to store your API keys securely:

   ```bash
   API_KEY_OPENWEATHER = "your_openweather_api_key"
   API_KEY_GEMINI = "your_gemini_chatbot_api_key"
   ```

5. Open the `index.html` file in your browser to view the dashboard.

## Configuration

### APIs Used

1. **OpenWeather API**: Used to fetch real-time weather data and 5-day forecast data. You will need an API key from [OpenWeather](https://openweathermap.org/).
2. **Gemini Chatbot API**: Used for chatbot integration. Obtain an API key from Google Cloud's Gemini chatbot service.

### API Integration

- OpenWeather API Key is stored in the `script.js` file for fetching weather data.
- Gemini Chatbot API is integrated into `chatbot.js` for chatbot responses.

## Project Structure

```bash
├── index.html          # Dashboard for displaying weather data
├── tables.html         # 5-day weather forecast and chatbot section
├── styles.css          # Styling for the entire project
├── script.js           # Main JavaScript file for handling weather data and charts
├── tables.js           # JavaScript file for handling forecast table and pagination
├── chatbot.js          # Handles chatbot functionality using the Gemini API
└── README.md           # Documentation file
```

## Future Enhancements

- **Weather Alerts**: Add weather alerts to inform users of severe weather conditions.
- **Historical Data**: Allow users to view past weather data for comparison with current forecasts.
- **User Authentication**: Enable users to save their favorite cities and view personalized weather updates.
- **Voice Interaction**: Enhance the chatbot with voice interaction to make the app more accessible.

## License

This project is open-source and available under the [MIT License](LICENSE).

---

