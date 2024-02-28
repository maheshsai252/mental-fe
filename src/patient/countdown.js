import React from 'react';
import Countdown from 'react-countdown';

const CountdownTimer = ({ date }) => {
    var dateString = date;
    var dateComponents = dateString.split(/[T\s]/); // Splitting the string by 'T' and space
    
    // Extracting date and time components
    var datePart = dateComponents[0];
    var timePart = dateComponents[1];
    
    // Parsing date components
    var dateArray = datePart.split("-");
    var year = parseInt(dateArray[0], 10);
    var month = parseInt(dateArray[1], 10) - 1; // Months are 0-indexed in JavaScript
    var day = parseInt(dateArray[2], 10);
    
    // Parsing time components
    var timeArray = timePart.split(":");
    var hour = parseInt(timeArray[0], 10);
    var minute = parseInt(timeArray[1], 10);
    
    // Creating a Date object
    var dateObject = new Date(year, month, day, hour, minute);  const targetDate = new Date(dateString);
console.log(date, dateObject)
  return (
    <Countdown
      date={dateObject}
      renderer={({ hours, minutes, seconds, completed }) => {
        if (completed) {
          return <span>Session started</span>;
        } else {
          return (
            <strong>
              {hours}h {minutes}m {seconds}s
            </strong>
          );
        }
      }}
    />
  );
};

export default CountdownTimer;
