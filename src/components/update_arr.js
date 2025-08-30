import React, { useState } from 'react'

function Update_arr() {
    const [arr,setarray] = useState(['jophin','aljo','hiren'])
const updation= ()=>{
        const newarr = ['suzan','rikka','meenakshi']
        setarray(newarr)
    }



  return (
    <>
    <h1>update Array</h1>
    <h3>List Of Array</h3>
    <ul>
        {arr.map((e,index)=>(
            <li key={index}>
                {e}
            </li>
        ))}
    </ul>
<button onClick={updation}>Update</button>
    
    </>
  )
}

export default Update_arr