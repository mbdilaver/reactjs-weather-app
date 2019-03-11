import React, { Component } from 'react';
import CardShelf from './card-shelf';
import HourlyList from './hourly-list';
import {sliceHourlyData} from "../helpers";

class NextDays extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isListOpen: false,
            clickedDayTime: null,
        };

        this.handleCardClick = this.handleCardClick.bind(this);
    }

    handleCardClick(time) {
        this.setState({clickedDayTime: time, isListOpen: true})
    }

    render() {
        const hourlyData = sliceHourlyData(this.state.clickedDayTime, this.props.hourly);

        return (
            <div>
                <CardShelf
                    daily={this.props.daily.data.slice(1,5)}
                    onCardClick={this.handleCardClick}/>
                {this.state.isListOpen &&
                    <HourlyList hourlyData={hourlyData}/>}
            </div>
        );
    }
}

export default NextDays;