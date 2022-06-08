import React, {useState, useEffect} from "react";
import axios from "axios";

function Search(props){

    const [item, setitem] = useState([])

    function content(item){
        const link = "http://localhost:8000/search/" + item 
        axios.get(link)
        .then(function(responseHandler) {
            console.log(responseHandler)
            setitem(responseHandler.data);
        })
    }

    useEffect(() => {
        content(props)
    }, [])

    return item
}

export default Search