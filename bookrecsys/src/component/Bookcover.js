import React, {useState, useEffect} from 'react';
import Bookimage from './Bookimage';
import Booktitle from './Booktitle';
import Modal from "react-modal";
import axios from 'axios';

function Bookcover(props){
    
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [titles, settitle] = useState("")
    const [items, setitem] = useState({})

    const boardstyle = {
        width:"222px",
        height:"390px",
        margin:"10px",
        borderRadius:"10px",
        flexShrink: "0",
        background: "white",

    }

    const tmpstyle = {
        width:"222px",
        height:"392px",
        border:"1px solid black",
        //margin:"10px",
        borderRadius:"10px",
        flexShrink: "0",
        background: "white",
    }

    const modalstyle = {
        
        overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.75)'
        },
        content: {
            position: 'absolute',
            top: '12%',
            left: '13%',
            right: '13%',
            bottom: '12%',
            border: '1px solid #ccc',
            background: '#fff',
            overflow: 'auto',
            WebkitOverflowScrolling: 'touch',
            borderRadius: '2%',
            outline: 'none',
            padding: '2%'
        }
    }

    useEffect(() => {
        const link = "http://localhost:8000/items/" + props.title
        axios.get(link)
        .then(function(responseHandler) {
            setitem((items) => responseHandler.data[0]); 
            settitle((titles) => responseHandler.data[0].title)
        })
    }, [props.title])
    
    return <div style={boardstyle}>
        {(titles != "") && <div>
            <div style={tmpstyle} onClick={()=> setModalIsOpen(true)}>
                <Bookimage link={props.title}/>
                <Booktitle title={titles}/>    
            </div>
            <Modal style={modalstyle} isOpen={modalIsOpen}>
                <button style={{float:"right"}} onClick={()=> setModalIsOpen(false)}>X</button>
                <Bookimage link={props.title}/>
                {items.category}
                {items.description}
                {items.brand}
                {items.price}
                {items.asin}
                {items.main_cat}
            </Modal>
        </div>}
    </div>
}

export default Bookcover