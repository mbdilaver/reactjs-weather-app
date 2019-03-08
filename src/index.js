import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import WeatherConsole from './components/weather-console';

import './index.css';
import './css/weather-icons.min.css';

const sliceHourlyData = (time, data) => {
    return data["data"].filter((val) => {
        return new Date(val["time"] * 1000).getDate() === new Date(time * 1000).getDate();
        }
    );
};

/* DarkSky icon to WeatherIcon icon */
const DI2WI = {
    "wind": "wi-cloudy-gusts",
    "fog": "wi-fog",
    "clear-day": "wi-day-sunny",
    "partly-cloudy-day": "wi-day-cloudy",
    "clear-night": "wi-night-clear",
    "partly-cloudy-night": "wi-night-alt-cloudy",
    "snow": "wi-snow",
    "rain": "wi-rain",
    "cloudy": "wi-day-cloudy",
};

const getDayName = (time) => {
    let date = new Date(parseInt(time) * 1000);
    return new Intl.DateTimeFormat(
        'en-US',
        {weekday: 'long'})
        .format(date);
};

const getFormattedHour = (time) => {
    let date = new Date(parseInt(time) * 1000);
    return date.getHours() < 10 ? "0" + date.getHours() + ":00" : date.getHours() + ":00";
};

class App extends Component {
    render() {
        return (
            <div className="App">
                <WeatherConsole />
            </div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);