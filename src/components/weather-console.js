import React, { Component } from 'react';
import axios from 'axios';

import Current from './current';
import NextDays from './next-days';
import {sliceHourlyData, getCityName} from "../helpers";

class WeatherConsole extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: null,
            isLoading: false,
            error: null,
        };
    }

    async componentDidMount() {
        this.setState({isLoading: true});

        const URL = process.env.REACT_APP_API_URL
            + process.env.REACT_APP_API_KEY + "/"
            + process.env.REACT_APP_LAT + ","
            + process.env.REACT_APP_LON
            + "?units=ca"
            + "&extend=hourly";

        try {
            const result = await axios.get(URL);
            this.setState({data:result.data, isLoading: false});
        } catch (e) {
            console.error("Cannot get data from service...");
            this.setState({error: e});
        }
    }



    render() {
        if (this.state.isLoading) {
            return <div>Loading...</div>;
        }

        if (this.state.error) {
            return <div>An error occurred. Please try again later.</div>;
        }

        const data = this.state.data;

        return (
            data &&
                <div className="container-fluid weather-console p-0">
                    <Current
                        city={getCityName(data.timezone)}
                        temp={Math.round(data.currently.temperature)}
                        logo={data.currently.icon}
                        tempHigh={Math.round(data.daily.data[0].temperatureHigh)}
                        tempLow={Math.round(data.daily.data[0].temperatureLow)}
                        hourlyData={sliceHourlyData(data.hourly.data[0].time, data.hourly)}
                    />
                    <NextDays daily={data.daily} hourly={data.hourly}/>
                </div>
        );
    }
}

export default WeatherConsole;