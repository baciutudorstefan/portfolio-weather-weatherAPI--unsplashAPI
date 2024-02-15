<template>
  <v-container fluid>
    <span class="data">
      <button @click="toggleFullscreen" class="ml-auto">
        Toggle Fullscreen
      </button>
      <v-row>
        <v-col>
          <v-text-field
            class="search_input pr-0"
            v-model="selectedCapital"
            color="grey-lighten-3"
            density="compact"
            variant="solo"
            label="Search cities"
            single-line
            hide-details
            @keyup.enter="fetchWeatherData"
          >
            <v-icon slot="appendInnerIcon" large color="black"
              >mdi-magnify</v-icon
            >
            <v-icon slot="prependInnerIcon" large color="black"
              >mdi-backspace</v-icon
            >
          </v-text-field>
        </v-col></v-row
      >
      <v-row v-if="weatherData" class="text-center d-flex flex-column">
        <span
          style="
            background: #ffffff94;
            color: black;
            border-radius: 45px;
            width: fit-content;
            margin: 0 auto;
          "
          class="pb-10 pl-9 pr-9"
        >
          <v-col
            >{{ weatherData.location.country }}/{{
              weatherData.location.region
            }}/{{ weatherData.location.name }}</v-col
          >
          <v-col cols="2" class="mx-auto">
            <img :src="weatherData.current.condition.icon" />
            <p class="text-h1">{{ weatherData.current.temp_c }}°</p></v-col
          ><br />

          <v-col cols="4" class="mx-auto"
            >Condition: {{ weatherData.current.condition.text }}</v-col
          >

          <v-col cols="8" class="mx-auto"
            >Last Updated: {{ weatherData.current.last_updated }}</v-col
          >
          <v-row class="d-flex flex-row justify-center mt-2 ga-4">
            <span>Feels Like: {{ weatherData.current.feelslike_c }}</span>
            <span>Wind: {{ weatherData.current.wind_kmh }} kmh</span>
            <span>Visibility: {{ weatherData.current.vis_km }}km</span>
          </v-row>
        </span>
        <v-row class="mt-15">
          <div class="accordion pa-6">
            <div
              v-for="hour in weatherData.forecast.forecastday[0].hour"
              :key="hour.time"
              class="accordion-item"
            >
              <div class="hour">{{ hour.time }}</div>
              <div class="temperature">{{ hour.temp_c }}°C</div>
              <div class="wind">{{ hour.wind_kph }} km/h</div>
              <div class="uv">{{ hour.uv }}</div>
              <div class="pressure">{{ hour.pressure_in }}</div>
              <div class="wind-direction">{{ hour.wind_dir }}</div>
            </div>
          </div>
        </v-row>

        <v-row class="mt-15">
          <div class="accordion pa-6">
            <div
              class="accordion-item"
              v-for="day in weatherData.forecast.forecastday"
              :key="day.date"
            >
              <label
                class="accordion-item-title"
                for="accordion-item-{{ day.date }}"
                @click="openModal(day)"
              >
                <p>Date: {{ day.date }}</p>
                <p>Max Temperature (C): {{ day.day.maxtemp_c }}</p>
                <p>Min Temperature (C): {{ day.day.mintemp_c }}</p>
                <p>Condition: {{ day.day.condition.text }}</p>
                <img :src="day.day.condition.icon" />
              </label>
            </div>
          </div>
        </v-row>
        <v-dialog v-model="modalOpen" max-width="600px">
          <template v-slot:activator="{ on }"></template>
          <v-card class="dialog-card">
            <v-card-title class="dialog-title">
              Hourly Data for {{ selectedDay.date }}
            </v-card-title>
            <v-card-text>
              <v-row class="hourly-data">
                <div
                  v-for="hour in selectedDay.hour"
                  :key="hour.time"
                  class="hourly-item"
                >
                  <div class="hour">{{ hour.time }}</div>
                  <div class="temperature">{{ hour.temp_c }}°C</div>
                  <div class="wind">Wind : {{ hour.wind_kph }} km/h</div>
                  <div class="uv">UV : {{ hour.uv }}</div>
                  <div class="pressure">Pressure :{{ hour.pressure_in }}</div>
                  <div class="wind-direction">
                    Wind dir.: {{ hour.wind_dir }}
                  </div>
                </div>
              </v-row>
            </v-card-text>
            <v-card-actions class="dialog-actions">
              <v-btn color="primary" text @click="modalOpen = false"
                >Close</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </span>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      selectedCapital: "",
      modalOpen: false,
      selectedDay: null,
      capitalList: [], // Initialize the list of capitals
      apiKey: "eed7936814ac436989e195101240802", // Replace with your WeatherAPI.com API key
      weatherData: null,
      backgroundImageUrl: "", // Holds the URL of the background image
      unsplashApiKey:
        "09858877bb2538e70eac2d6d50a1fee25311837a5591af779de312869ecda475", // Replace with your Unsplash API key
    };
  },
  mounted() {
    this.fetchCapitalCities(); // Fetch capital cities when the component mounts
  },
  methods: {
    async fetchCapitalCities() {
      try {
        // Fetch the list of capital cities from the provided API endpoint
        const response = await axios.get(
          `https://restcountries.com/v3.1/capital/tallinn${this.selectedCapital}`
        );

        // Extract capital names from the response data and populate the capitalList array
        this.capitalList = response.data.map((country) => country.capital[0]);
      } catch (error) {
        console.error("Error fetching capital cities:", error);
      }
    },
    async fetchWeatherData() {
      try {
        const response = await axios.get(
          "http://api.weatherapi.com/v1/forecast.json",
          {
            params: {
              key: this.apiKey,
              q: this.selectedCapital,
              aqi: "yes",
              days: 14, // Fetch only current weather
            },
          }
        );
        // Handle response data
        this.weatherData = response.data;

        // Fetch an image from Unsplash based on the current weather condition text
        await this.fetchImageFromUnsplash(
          this.weatherData.location.country,
          this.weatherData.location.name
        );
      } catch (error) {
        // Handle errors
        console.error("Error fetching forecast:", error);
      }
    },
    async fetchImageFromUnsplash(country, city) {
      try {
        const response = await axios.get(
          "https://api.unsplash.com/photos/random",
          {
            params: {
              client_id: this.unsplashApiKey,
              query: `${country} `, // Concatenate 'weather' string to the search query
            },
          }
        );
        // Set the background image URL
        this.backgroundImageUrl = response.data.urls.regular;
      } catch (error) {
        console.error("Error fetching image from Unsplash:", error);
      }
    },
    toggleFullscreen() {
      // Check if fullscreen mode is enabled
      if (!document.fullscreenElement) {
        // If not, enable fullscreen mode
        if (document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
          /* Firefox */
          document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
          /* Chrome, Safari and Opera */
          document.documentElement.webkitRequestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) {
          /* IE/Edge */
          document.documentElement.msRequestFullscreen();
        }
      } else {
        // If fullscreen mode is enabled, exit fullscreen
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
          /* Firefox */
          document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
          /* Chrome, Safari and Opera */
          document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
          /* IE/Edge */
          document.msExitFullscreen();
        }
      }
    },
    openModal(day) {
      this.selectedDay = day;
      this.modalOpen = true;
    },
  },
};
</script>

<style>
.v-container {
  background: rgb(157, 156, 4);
  background: radial-gradient(
    circle,
    rgba(157, 156, 4, 1) 0%,
    rgba(0, 0, 0, 1) 71%,
    rgba(2, 0, 36, 1) 90%
  );
  height: 100vh;
}

.v-main {
  color: white;
}

.search_input {
  width: 50vw;
  margin: 0 auto;
}
.v-field.v-field--appended {
  border-radius: 50px;
  box-shadow: none;
}
.v-field__input {
  font-size: 48px;
  height: 10vh;
  text-align: center;
}
.v-field-label {
  font-size: 49px !important;
  left: 35% !important;
}
#input-2 {
  padding-top: 0px;
  padding-bottom: 0px;
}

.accordion {
  display: flex;
  color: black;
  flex-direction: row;
  background: #ffffff94;
  border-radius: 45px;
  overflow-x: auto;
  max-width: 80vw;
  margin: 0 auto;
}

.accordion-item {
  flex: 0 0 auto;
  margin-right: 10px;
}

.accordion-item-trigger {
  display: none;
}

.accordion-item-title {
  cursor: pointer;
  background-color: #0000;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 5px;
  display: block;
}

.accordion-item-content {
  display: none;
}

.accordion-item-trigger:checked
  + .accordion-item-title
  + .accordion-item-content {
  display: block;
}

.dialog-card {
  border-radius: 10px;
}

.dialog-title {
  background-color: #2196f3;
  color: white;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.hourly-data {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.hourly-item {
  background-color: #f5f5f5;
  border-radius: 10px;
  padding: 10px;
  margin: 5px;
  text-align: center;
  min-width: 120px;
}

.hour {
  font-weight: bold;
}

.temperature {
  font-size: 18px;
}

.wind,
.uv,
.pressure,
.wind-direction {
  font-size: 14px;
  color: #666;
}

.dialog-actions {
  justify-content: center;
}

.data {
  /* position: relative; */
  background: rgba(
    255,
    255,
    255,
    0.2
  ); /* Set the background color with transparency */
  border-radius: 10px; /* Add some border-radius for rounded corners */
  backdrop-filter: blur(10px); /* Apply blur effect to the background */
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37); /* Add shadow for depth */
  backdrop-filter: blur(4px); /* Add blur to the shadow */
}
</style>
