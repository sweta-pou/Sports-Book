import React,{useState} from 'react';
import  './Button.module.css';

const Slot =(props)=>{
    let style={
        border: '2px solid black',
        marginRight: '4px',
        padding:'3px',
        backgroundColor: 'green'
    }
    let disabled= false


  let check=  props.time_array.slice(0,props.time_array.length-1).map(function(object, i){
      style.backgroundColor='green'
       disabled= false
   let value1 =props.time_array[i]
    let value2= props.time_array[i+1]
    let value = value1 +"-"+value2
      for(var j=0;j< props.booked.length;j++){
        if(object== props.booked[j])
        {
            style.backgroundColor= 'red'
            disabled=true
        }
      }

         
        return <label   key={i} style={disabled?{border: '2px solid black',
        marginRight: '4px',
        padding:'3px',
        backgroundColor: 'red'  } : { border: '2px solid black',
        marginRight: '4px',
        padding:'3px',
        backgroundColor: 'green' }} >
       <input
          name="isGoing"
          type="radio"
          value={value}
          disabled={disabled}
          onClick={props.onClicked}
          required="true"
        />
        
         {props.time_array[i]}-{props.time_array[i+1]}
      </label>
       

    })
  

    return(
        <div>
            {check}
        </div>
        
    )
}
export default Slot;