import React, {useState} from "react"
import { FaClock } from "react-icons/fa6";


function DateCard(){

    const [date, setDate] = useState("")

    const updateTime = () =>  {
        // Get the current date and time
        const now = new Date();
    
        // Format the time as 12-hour clock with AM/PM
        const hours = now.getHours() % 12 || 12; // Convert 0 to 12
        const minutes = now.getMinutes();
        const ampm = now.getHours() >= 12 ? 'pm' : 'am';
    
        // Format the date as "YYYY-MM-DD"
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
    
        // Construct the final string
        const timeString = `${hours}:${String(minutes).padStart(2, '0')}${ampm}, ${year}-${month}-${day}`;
    
        // Update the HTML element
        setDate(timeString)
    }

    setInterval(updateTime, 1000);

    return (
        <div style={{display:"flex", width:172, alignItems:"center", justifyContent:"space-between"}}>
            <FaClock color="#007BFF"/>
            <p style={{fontSize: 15, fontFamily:"Montserrat"}}>{date}</p>
        </div>
    )  
}

export default DateCard