## Weather Forecast App

This is a weather forecast web application that utilizes various APIs to provide real-time weather information based on the user's selected location. The app fetches weather data from the WeatherAPI, retrieves background images from Unsplash, and gets a list of capital cities from the Rest Countries API.

### Features

- **Real-Time Weather Forecast**: Get accurate and up-to-date weather forecast information for any city around the world.
- **Dynamic Background Images**: The app dynamically changes the background image based on the current weather condition of the selected location.
- **Search Functionality**: Users can search for their desired city to fetch the weather forecast.
- **Responsive Design**: The app is designed to be responsive and works seamlessly across various devices.

### APIs Used

1. **WeatherAPI**: The WeatherAPI provides comprehensive weather data including current weather, forecasts, and historical data. The app utilizes the `forecast.json` endpoint to fetch weather forecast information.
   - Endpoint: `http://api.weatherapi.com/`

2. **Unsplash API**: Unsplash is a platform that provides high-quality images for free. The app uses the Unsplash API to fetch background images based on the current weather condition of the selected location.
   - Getting backgound images based on city/country searched and the weather condition.
   - Endpoint: `https://api.unsplash.com/`

4. **Rest Countries API**: The Rest Countries API provides information about countries, including their capitals. The app fetches the list of capital cities to facilitate the search functionality.
   - Endpoint: `https://restcountries.com`

### Technologies Used

- **Vue.js**: The app is built using the Vue.js framework for building user interfaces.
- **Vuetify**: Vuetify is a Material Design component framework for Vue.js. It's used for styling and layout components in the app.
- **Axios**: Axios is used for making HTTP requests to fetch data from the APIs.
- **HTML/CSS**: The app's layout and styling are implemented using HTML and CSS.
- **JavaScript**: JavaScript is used for implementing dynamic functionality and interactivity.

### Usage

To use the app, simply open the deployed version in your web browser. Enter the name of the city you want to check the weather for in the search input field and press Enter or click on the search button. The app will fetch the weather forecast and display it along with a dynamic background image.

### Deployment

The app can be deployed on any web hosting service that supports static websites. Simply clone the repository, build the Vue.js project, and deploy the generated files to your hosting provider.

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### Credits

- Weather data provided by WeatherAPI.
- Background images provided by Unsplash.
- Capital city data provided by Rest Countries API.

### Contributors

- [Baciu Tudor](https://github.com/baciutudorstefan) - Developer
