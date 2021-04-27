import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import classes from './Datepicker.module.css';
const Datepicker=()=> {
  const [value, setDate] = useState(new Date());
const onChange =date=>{
    setDate(date);
    console.log(date);
}
  return (
    <div>
      <Calendar className={classes.Date}
        onChange={onChange}
        value={value}
        minDate={new Date()}
      />
    </div>
  );
}
export default Datepicker;