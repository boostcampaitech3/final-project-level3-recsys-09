import React, {useState, useEffect} from "react";
import axios from "axios";
import PropTypes from 'prop-types';

export function Api(props){

    const [item, setitem] = useState([])

    function content(props){

        const link = "http://localhost:8000/" + props
        axios.get(link)
        .then(function(responseHandler) {
            setitem((item) => responseHandler.data);
        })
    }

    useEffect(() => {
        content(props)
    }, [])

    return item
}

export default Api
