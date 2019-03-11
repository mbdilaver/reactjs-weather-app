import React from 'react';
import Card from './card';

const CardShelf = ({daily, onCardClick}) => {

    return (
        <div className="card-shelf container-fluid py-1">
            <div className="row justify-content-center">
                {daily.map(({time, temperatureHigh, temperatureLow, icon}) =>
                    <Card key={time}
                          time={time}
                          tempHigh={Math.round(temperatureHigh)}
                          tempLow={Math.round(temperatureLow)}
                          logo={icon}
                          onCardClick={onCardClick}/>
                          )}
            </div>
        </div>
    );
};

export default CardShelf;