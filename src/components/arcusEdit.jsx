import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// const 

const addRow = () => {
  return (
    <label> 1 
      <input name='mastertopic' placeholder='category'></input> 
      <input name="topic" placeholder='Event Name'></input> 
      <DatePicker selected={eventDate} onChange={(date) => setEventDate(date)} /> 
      <button onClick={addRow}>+</button>
    </label>
  )
}

//trigger with sidebar click
const arcusEdit = function(){
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [eventDate, setEventDate] = useState(new Date());

  return (
    <section className="afterArcus editor">
      <h4>Arcus Editor</h4>
      <form className='arcusEditor'>
      <div>
      <label>Start Date: 
      <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
      </label>  
        <label>End Date:  <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
       </label>
      </div>
      <label> 1 <input name='mastertopic' placeholder='category'></input> <input name="topic" placeholder='Event Name'></input> <DatePicker selected={eventDate} onChange={(date) => setEventDate(date)} /> <button onClick={addRow}>+</button>
      </label> <button> Edit Arcus </button>   
      </form>
    </section>
  )
}

export default arcusEdit