import axios from "axios";
import React, {useState, useEffect} from "react";

function Post(props){
    alert(props)
    const [item, setitem] = useState([])
    const [k, re] = useState(0)

    function content(props){
        alert(props)
        const link = "http://localhost:8000/" + props
        axios.get(link)
        .then(function(responseHandler) {
            setitem((item) => responseHandler.data);
        })
    }
    
    useEffect(() => {
        alert(props)
        content(props)
    }, [])

    return item
}

export default Post