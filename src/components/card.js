import React from 'react';

import Logo from './logo';
import {getDayName} from "../helpers";

import '../scss/card.scss';

const Card = ({time, tempHigh, tempLow, logo, onCardClick}) => {
    const handleCardClick = () => onCardClick(time);

    return (
        <div
            className="card-mbd col-3"
            onClick={handleCardClick}>
            <div className="col-sm-10 offset-sm-1">
                <div className="day-name">
                    {getDayName(time).slice(0,3)}
                </div>
                <div className="logo py-1">
                    <Logo logo={logo}
                          width="100%"
                          height="100%"/>
                </div>
                <div className="">
                    <div>
                        {tempHigh + "\u00B0"}
                    </div>
                    <div>
                        {tempLow + "\u00B0"}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;