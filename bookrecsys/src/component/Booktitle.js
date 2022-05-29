import React from "react";

function Booktitle(props){

    const tmpstyle = {
        margin:"10px",
        width:"190px",
        height:"90px",
        //border:"1px solid black",
        display:"flex",
        borderRadius:"10px",
        padding:"5px",
        overflow:"auto",
    }

    const titlecenter = {
        margin:"auto"
    }

    return <div style={tmpstyle}>
        <div style={titlecenter}> {props.title} </div>
    </div>
}

export default Booktitle