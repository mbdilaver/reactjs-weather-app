import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './css/weather-icons.min.css';

const sliceHourlyData = (time, data) => {
    return data["data"].filter((val, i, arr) => {
        return new Date(val["time"] * 1000).getDate() === new Date(time * 1000).getDate();
        }
    );
};

const API = {
    key: "6c3f760a63f55ca7709542a80bad4fe7",
    lat: "41.0096",
    lon: "28.9652",
};

// Darksky weather icon 2 WeatherIcon icon
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
}

const WeatherCard = ({weather, onCardClick, isDaily}) => {

    const handleCardClick = () => {
        onCardClick(weather['time']);
    };

    // Find the name of the day
    let title = isDaily ? getDayName(weather['time']) : getFormattedHour(weather['time']);
    let tempLabels = isDaily
        ? [
            <div className="day-temp label">{Math.round(weather["temperatureHigh"]) + "\u00B0"}</div>,
            <div className="night-temp label">{Math.round(weather["temperatureLow"]) + "\u00B0"}</div>
          ]
        :   <div className="day-temp label">{Math.round(weather["temperature"]) + "\u00B0"}</div>;

    return (
        <div
            className="card"
            onClick={handleCardClick}>
            <div className="card-title label">
                {title}
            </div>
            <div className="card-icon">
                <i className={"wi " + DI2WI[weather["icon"]]}> </i>
            </div>
            <div className="temp-pair">
                {tempLabels}
            </div>
        </div>
    );
};

const CardListTab = ({weatherData, onCardClick, isDaily}) => {
    return (
        <div className="card-list-tab">
            {weatherData.map((weather) =>
                (
                    <div
                        key={weather["time"]}>
                        <WeatherCard
                            weather={weather}
                            onCardClick={onCardClick}
                            isDaily={isDaily}/>
                    </div>
                )
            )}
        </div>
    );
};

class WeatherConsole extends Component {

    constructor(props) {
        super(props);
        this.state = {
            daily: true,
            time: null
        };

        this.handleCardClick = this.handleCardClick.bind(this);
    }

    handleCardClick(time) {
        if (this.state.daily) {
            this.setState({
                daily: false,
                time: time,
            });
        } else {
            this.setState({
                daily: true,
            });
        }
    }

    render() {
        const {weatherData} = this.props;
        const data = this.state.daily ? weatherData['daily']['data'] : sliceHourlyData(this.state.time, weatherData['hourly']);

        return (
            <div className="weather-console">
                  <CardListTab
                    weatherData={data}
                    onCardClick={this.handleCardClick}
                    isDaily={this.state.daily}/>
            </div>
        );
    }
}

const Loader = () => <div className="loader" />;

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            weatherData: null,
        };
    }

    componentDidMount() {
        const URL = "https://cors.io/?https://api.darksky.net/forecast/"
            + API.key + "/"
            + API.lat + ","
            + API.lon
            + "?units=ca"
            + "&extend=hourly";
        fetch(URL)
            .then(response => {
                return response.json();
            })
            .then(json => {
                this.setState({weatherData: json});
            })
            .catch(error => console.error(error));
    }

    render() {
        const weatherData = this.state.weatherData;

        return (
            <div className="App">
                { weatherData
                  ? <WeatherConsole
                        weatherData={this.state.weatherData}
                    />
                  : <Loader />
                }
            </div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);