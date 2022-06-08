import React, { useState } from "react";
import Calendar from "react-calendar/dist/umd/Calendar";
import 'react-calendar/dist/Calendar.css';

function TCalendar(props){

    const [value, onChange] = useState(new Date());

    
    return <div style={{display:"flex", margin:"auto"}}>
        <Calendar onChange={onChange} value={value}/>
    </div>
}

export default TCalendar