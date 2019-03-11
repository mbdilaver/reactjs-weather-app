import React from "react";
import Logo from './logo';
import '../scss/jumbo.scss';

const Jumbo = ({city, logo, temp, tempHigh, tempLow}) =>
    <div className="jumbo text-center py-2 container-fluid">
        <div className="location-text">
            {city}
        </div>
        <div className="row justify-content-center align-items-center">
            <div className="logo col-3 py-2 px-0">
                <Logo
                    logo={logo}
                    width="100%"
                    height="100%"/>
            </div>
            <div className="curr-temp col-2 p-0">
                {temp + "\u00B0"}
            </div>
        </div>
        <div className="temp-pair">
            {tempHigh + "\u00B0/" + tempLow + "\u00B0"}
        </div>
    </div>

export default Jumbo;