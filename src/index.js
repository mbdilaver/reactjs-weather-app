import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './css/weather-icons.min.css';

class WeatherConsole extends React.Component {

    render() {
        return (
            <div className="weather-console">
                {/*<CardGraphTab />*/}
                <CardListTab />
            </div>
        );
    }
}

class CardListTab extends React.Component {

    render() {
        return (
            <div className="card-list-tab">
                <WeatherCard />
                <WeatherCard />
                <WeatherCard />
            </div>
        );
    }
}

class WeatherCard extends React.Component {

    render() {
        const degreeSign = "\u2103";
        const weatherInfo = {
            "day-temp": 20,
            "night-temp": 17,
        };
        return (
            <div className="card">
                <div className="card-title label">12:00</div>

                <div className="card-icon">
                    <i className="wi wi-day-sunny card-icon"></i>
                </div>

                <div className="temp-pair">
                    <div className="day-temp label">{weatherInfo["day-temp"] + "\u00B0"}</div>
                    <div className="night-temp label">{weatherInfo["night-temp"] + "\u00B0"}</div>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <WeatherConsole />,
    document.getElementById('root')
);