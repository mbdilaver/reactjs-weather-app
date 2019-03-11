import React from "react";
import ListItem from "./list-item";
import {getFormattedHour} from "../helpers";

const HourlyList = ({hourlyData}) => {
    return (hourlyData &&
        <div className="container-fluid">
            {hourlyData.map(({time, icon, temperature, precipProbability}) =>
                <ListItem
                    key={time}
                    time={getFormattedHour(time)}
                    logo={icon}
                    temp={Math.round(temperature)}
                    precip={Math.round(precipProbability * 100)}
                />)}
        </div>
    );
};

export default HourlyList;