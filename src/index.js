import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './css/weather-icons.min.css';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import {Fetch} from 'react-request';

class WeatherConsole extends React.Component {

    render() {
        const weatherData= this.props.weatherData;

        return (
            <Router>
                <div className="weather-console">
                    <Route exact path="/" render={() => <CardListTab weatherData={weatherData["daily"]} /> } />
                    <Route path="/day/:time" render={() => <CardListTab weatherData={weatherData["hourly"]} /> } />
                </div>
            </Router>
        );
    }
}

function sliceHourlyData(time, data) {
    const slice = data.filter((val, i, arr) => {
        if (new Date(val["time"] * 1000).getDate() === new Date(time * 1000).getDate()) {
            return true;
        }
        return false;
        }
    );
    return slice;
}

class CardListTab extends React.Component {

    render() {

        const weatherData = this.props.weatherData;

        return (
            <div className="card-list-tab">
                {weatherData["data"].map((weather) =>
                    (
                        <div key={weather["time"]}>
                            <Route exact path="/" render={() => <LinkedCard weather={weather}/> }/>
                            <Route path="/day/:time" render={() => <WeatherCard weather={weather}/> }/>
                        </div>
                    )

                )}
            </div>
        );
    }
}

class LinkedCard extends React.Component {
    render() {
        const weather = this.props.weather;

        return (
            <Link to={'/day/' + weather.time} style={{textDecoration: 'none'}}>
                <WeatherCard weather={weather} />
            </Link>
        );
    }
}

class WeatherCard extends React.Component {

    render() {
        const weather = this.props.weather;

        // Find the name of the day in the following three lines
        let date = new Date(parseInt(weather["time"]) * 1000);
        let options = {weekday: 'long'};
        let title = new Intl.DateTimeFormat('en-US', options).format(date);

        return (
            <div className="card">
                <div className="card-title label">
                    <Route exact path="/" render={() => {return title;}} />
                    <Route path="/day/:time" render={() => {
                        if (date.getHours() < 10) {
                            return "0" + date.getHours() + ":00";
                        }
                        return date.getHours() + ":00";
                    }} />
                </div>

                <div className="card-icon">
                    <i className={"wi " + DI2WI[weather["icon"]]}> </i>
                </div>

                <div className="temp-pair">
                    <Route exact path="/" render={()=> [
                            <div className="day-temp label">{Math.round(weather["temperatureHigh"]) + "\u00B0"}</div>,
                            <div className="night-temp label">{Math.round(weather["temperatureLow"]) + "\u00B0"}</div>
                        ]
                        } />

                    <Route path="/day/:time" render={() => <div className="day-temp label">{Math.round(weather["temperature"]) + "\u00B0"}</div> }/>
                </div>
            </div>
        );
    }
}

class App extends React.Component {

    render() {
        const key = "6c3f760a63f55ca7709542a80bad4fe7";
        const lat = "41.0096";
        const lon = "28.9652";
        const URL = "https://cors.io/?https://api.darksky.net/forecast/" + key + "/" + lat + "," + lon + "?units=ca";

        console.log(URL);
        console.log(this.props);
        return (

            <Fetch url={URL} >
                {( {fetching, failed, data} ) => {
                    if (fetching) {
                        return <div>Loading data...</div>;
                    }

                    if (failed) {
                        return <div>The request did not succeed.</div>;
                    }

                    if (data) {
                        return (
                            <WeatherConsole weatherData={data}/>
                        );
                    }
                }}
            </Fetch>
        );
    }
}


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


{/*<WeatherConsole weatherList={weatherList}/>,*/}
ReactDOM.render(
    <App />,
    document.getElementById('root')
);