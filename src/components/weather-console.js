import React, { Component } from 'react';
import Current from './current';
import NextDays from './next-days';

class WeatherConsole extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: null,
            isLoading: false,
            error: null,
        };

    }

    render() {
        return (
            <div className="weather-console">
                <Current />
                <NextDays />
            </div>
        );
    }
}

export default WeatherConsole;