import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import WeatherConsole from './components/weather-console';

import './scss/index.scss';

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