import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './css/weather-icons.min.css';


class WeatherConsole extends React.Component {

    render() {
        const weatherList= this.props.weatherList;

        return (
            <div className="weather-console">
                {/*<CardGraphTab />*/}
                <CardListTab weatherList={weatherList}/>
            </div>
        );
    }
}

class CardListTab extends React.Component {

    render() {
        const weatherList = this.props.weatherList;

        return (
            <div className="card-list-tab">
                {weatherList.map((weather) =>
                    <WeatherCard weather={weather} />
                )}
            </div>
        );
    }
}

class WeatherCard extends React.Component {

    render() {
        const weather = this.props.weather;
        return (
            <div className="card">
                <div className="card-title label">{weather.time}</div>

                <div className="card-icon">
                    <i className={"wi " + weather.icon}></i>
                </div>

                <div className="temp-pair">
                    <div className="day-temp label">{weather.dayTemp + "\u00B0"}</div>
                    <div className="night-temp label">{weather.nightTemp + "\u00B0"}</div>
                </div>
            </div>
        );
    }
}

const weatherList = [
    {
        time: "Mon",
        dayTemp: 20,
        nightTemp: 17,
        icon: "wi-day-sunny"
    },
    {
        time: "Tue",
        dayTemp: 19,
        nightTemp: 15,
        icon: "wi-day-cloudy"
    },
    {
        time: "Wed",
        dayTemp: 18,
        nightTemp: 14,
        icon: "wi-day-sunny"
    },
    {
        time: "Thu",
        dayTemp: 15,
        nightTemp: 11,
        icon: "wi-day-rain"
    },
    {
        time: "Sun",
        dayTemp: 3,
        nightTemp: -1,
        icon: "wi-snow"
    },
];

ReactDOM.render(
    <WeatherConsole weatherList={weatherList}/>,
    document.getElementById('root')
);