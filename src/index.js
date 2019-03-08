import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

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

// Set URL by editing .env file
const URL = process.env.REACT_APP_API_URL
    + process.env.REACT_APP_API_KEY + "/"
    + process.env.REACT_APP_LAT + ","
    + process.env.REACT_APP_LON
    + "?units=ca"
    + "&extend=hourly";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            weatherData: null,
            isLoading: false,
            error: null,
        };
    }

    async componentDidMount() {
        await this.getWeatherData();
    }

    async getWeatherData() {
        this.setState({ isLoading: true });

        try {
            const result = await axios.get(URL);
            this.setState({
                weatherData: result.data,
                isLoading: false,
            });
        } catch (e) {
            this.setState({
                isLoading: false,
                error: e,
            })
        }
    }

    render() {
        if (this.state.isLoading) {
            return <Loader />;
        }

        if (this.state.error) {
            return <div>An error occurred!</div>;
        }

        const weatherData = this.state.weatherData;

        return (
            <div className="App">
                { weatherData &&
                    <WeatherConsole
                        weatherData={this.state.weatherData}
                    />
                }
            </div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);