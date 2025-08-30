import React, { useState } from 'react'

function Update() {
    const [value, setValue] = useState({
        Name: 'jophin',
        Age: '23',
        Gender: 'Male',
        dept: "Science"

    })
    const OnChange=()=>{
        setValue({...value,Name:'Avin'})
    }
    console.log("name change",value)
    return (
        <>
        <h2>StudentDetails</h2>
        <p>Name:{value.Name}</p>
        <p>Age:{value.Age}</p>
        <p>Gender:{value.Gender}</p>
        <p>Dept:{value.dept}</p>
        <button onClick={OnChange}>Update</button>
        console.log("button pressed")
        </>
    )
}

export default Update