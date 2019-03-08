import React, { Component } from 'react';
import Jumbo from './jumbo';
import HourlyList from './hourly-list';

class Current extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isListOpen: false,
        };
    }

    render() {
        return (
            <div>
                <Jumbo />
                <HourlyList />
            </div>
        );
    }
}

export default Current;