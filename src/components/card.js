import React from 'react'
import CountUp from 'react-countup';

const Card = ({ style, number, time }) => {
    return (
        <div className={style}>
            <p>Confirmed Cases: <br />
                <span>
                    <CountUp
                        start={0}
                        end={number}
                        duration={2.75}
                        separator=",">
                    </CountUp>
                </span>
            </p>
            <p>Last Updated: <br /> {new Date(time).toDateString()}</p>
        </div>
    )
}

export default Card
