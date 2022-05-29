import React, {useEffect, useState} from "react";
import axios from "axios";

function Bookimage(props){
    
    const [link, setlink] = useState("x")

    const tmpstyle = {
        margin:"10px",
        width:"200px",
        height:"260px",
        border:"1px solid black",
        display:"flex",
        
    }

    function Search(item){
        const link = "http://localhost:8000/search/" + item 
        axios.get(link)
        .then(function(responseHandler) {
            setlink((link) => responseHandler.data);
        })
    }

    const imgcenter = {
        margin:"auto"
    }

    useEffect(() => {
        if (!props.link){ }
        else{
            Search(props.link)
        } 
    }, [props.link])

    return<div style={tmpstyle}>
        {(link != "x") && <div style={imgcenter}><img src={link}/></div>}
    </div>
}

export default Bookimage