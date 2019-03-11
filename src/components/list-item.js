import React from 'react';
import Logo from "./logo";

const ListItem = ({time, logo, temp, precip}) => {

    return (
        <div className="row align-items-center text-center py-2 border-bottom border-dark">
            <div className="col-3">
                {time}
            </div>
            <div className="col-3">
                <div className="col-10 offset-1">
                    <Logo logo={logo}
                          width="100%"
                          height="100%"/>
                </div>
            </div>
            <div className="col-3">
                {temp + "\u00B0"}
            </div>
            <div className="col-3">
                {precip + '%'}
            </div>
        </div>
    );
};

export default ListItem;