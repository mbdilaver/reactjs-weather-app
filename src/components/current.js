import React, { Component } from 'react';
import Jumbo from './jumbo';
import HourlyList from './hourly-list';

class Current extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isListOpen: false,
        };

        this.handleListOpenClick = this.handleListOpenClick.bind(this);
    }

    handleListOpenClick() {
        this.setState(({isListOpen}) => {return {isListOpen: !isListOpen}})
    }

    render() {
        const {
            city,
            temp,
            logo,
            tempHigh,
            tempLow,
            hourlyData} = this.props;

        return (
            <div className="current-pane"
                 onClick={this.handleListOpenClick}>
                <Jumbo city={city}
                       temp={temp}
                       logo={logo}
                       tempHigh={tempHigh}
                       tempLow={tempLow}
                       />
                {this.state.isListOpen &&
                    <HourlyList hourlyData={hourlyData}/>}
            </div>
        );
    }
}

export default Current;