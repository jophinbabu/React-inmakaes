
import React, { useState } from 'react'

export default function State() {
    const [color1, setcolor1] = useState({
        div1_color : 'grey',
        div2_color :'yellow',
    }
    )
    function OnChange(){
        setcolor1({...color1,div1_color:'blue'})
    }
     function OnChange2(){
        setcolor1({...color1,div2_color:'red'})
    }
return(
    <>
    <h2>Two Usestate</h2>
    <div style={{width:'30%', height:200,border:"1px solid black",background:color1.div1_color}}>
        <p style={{marginTop:'15%',marginLeft:"40%"}}>First Div</p>
    </div>
    <button onClick={OnChange}>change First div</button>
    {/* <button onClick={() => {setcolor('grey')}}>RESET</button> */}

    <div style={{width:'30%',height:200,border:"1px solid black",background:color1.div2_color}}>

        <p style={{marginTop:'15%',marginLeft:'40%'}}>Second Div</p>

    </div>
<button onClick={OnChange2}>change second div</button>
{/* <button onClick={()=>{setcolor1("yellow")}}>Reset</button> */}


    </>
)
} 