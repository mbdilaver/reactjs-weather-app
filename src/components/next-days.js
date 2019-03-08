import React, { Component } from 'react';
import CardShelf from './card-shelf';
import HourlyList from './hourly-list';

class NextDays extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isListOpen: false,
        };
    }

    render() {
        return (
            <div>
                <CardShelf />
                <HourlyList />
            </div>
        );
    }
}

export default NextDays;