import React, {useCallback, useState, useEffect} from "react";
import Bookcover from "./Bookcover";
import axios from "axios";

function Ranklist(props){
    
    const tmpstyle1 = {
        overflow: "flex",
        width: "100%",
        height: "440px",
        display: 'flex',
        flexDirection:"row",
        overflow:"auto",
    }

    const tmpstyle2 = {
        width:"100%",
        height:"500px",
        margin: "auto",
        padding:"20px",
        borderRadius:"10px",
    }

    const rlist = props.li 

    return<div style={tmpstyle2}>
        <h2>title</h2>
        <div style={tmpstyle1}>
            <Bookcover title={rlist[0]} link={rlist[0]}/>
            <Bookcover title={rlist[1]} link={rlist[1]}/>
            <Bookcover title={rlist[2]} link={rlist[2]}/>
            <Bookcover title={rlist[3]} link={rlist[3]}/>
            <Bookcover title={rlist[4]} link={rlist[4]}/>
            <Bookcover title={rlist[5]} link={rlist[5]}/>
            <Bookcover title={rlist[6]} link={rlist[6]}/>
            <Bookcover title={rlist[7]} link={rlist[7]}/>
            <Bookcover title={rlist[8]} link={rlist[8]}/>
            <Bookcover title={rlist[9]} link={rlist[9]}/>
    </div></div>

}  

export default Ranklist