import React from 'react';
import Countdown from 'react-countdown';

const CountdownTimer = ({ date }) => {
    var dateObject = new Date(date);
  return (
    <Countdown
      date={dateObject}
      renderer={({days, hours, minutes, seconds, completed }) => {
        if (completed) {
          return <span>Session Completed</span>;
        } else {
          return (
            <strong>
              {days ? `${days}d` : ''} {hours}h {minutes}m {seconds}s
            </strong>
          );
        }
      }}
    />
  );
};

export default CountdownTimer;
