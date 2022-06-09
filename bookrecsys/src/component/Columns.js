import React, { useEffect, useState } from "react";
import Modal from "react-modal/lib/components/Modal";
import axios from "axios";

function Columns(props){

    const [isopen, setopen] = useState(false)
    const [view, noview] = useState(true)

    const predstyle = {
        width: '250px',
        height: '50px',
        flexDirection: 'row',
        display: 'flex',
        margin: "auto",
    }

    const buttonstyle = {
        width: "80px",
        height: "40px",
        border: "1px solid black",
        margin: "20px",
        borderRadius: '10%',
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
            width: '250px',
            height: '200px',
            margin: 'auto',
            border: '1px solid #ccc',
            background: '#fff',
            overflow: 'auto',
            WebkitOverflowScrolling: 'touch',
            borderRadius: '2%',
            outline: 'none',
            padding: '2%',
            flexDirection:"row",

        }
    }

    const itemdelete = (props) => {
        setopen(false)
        noview(false)
        const link = "http://localhost:8000/del"
        let item = {id:props.id, title:props.Title, asin:props.asin, rate:props.rate, review:props.review, startdate:props.Date1, enddate:props.Date2}
        console.log(item)
        axios.post(link, item)({})
    }

    return <div>
    {(view) && <div style={{display:"flex", width:"100%", flexDirection:"row", background:props.bgcolor}}>
        <div style={{display:"flex", borderRight:"1px solid #D0CFD2", height:"6.5vh", width:"5%"}}><p style={{textAlign:"center", margin:"auto"}}>{props.idx}</p></div>
        <div style={{display:"flex", borderRight:"1px solid #D0CFD2", height:"6.5vh", width:"20%", overflow:"auto"}}><p style={{textAlign:"center", margin:"auto"}}>{props.Title}</p></div>
        <div style={{display:"flex", borderRight:"1px solid #D0CFD2", height:"6.5vh", width:"5%"}}><p style={{textAlign:"center", margin:"auto"}}>{props.rate}</p></div>
        <div style={{display:"flex", borderRight:"1px solid #D0CFD2", height:"6.5vh", width:"42%", overflow:"auto"}}><p style={{textAlign:"center", margin:"auto"}}>{props.review}</p></div>
        <div style={{display:"flex", borderRight:"1px solid #D0CFD2", height:"6.5vh", width:"14%"}}><p style={{textAlign:"center", margin:"auto"}}>{props.Date1}</p></div>
        <div style={{display:"flex", borderRight:"1px solid #D0CFD2", height:"6.5vh", width:"14%"}}><p style={{textAlign:"center", margin:"auto"}}>{props.Date2}</p></div>
        <div style={{display:"flex", height:"4vh", width:"5%"}} onClick={() => setopen(true)}><p style={{textAlign:"center", margin:"auto"}}>{(props.rate != "rate" && props.rate != "") && <button>X</button>}</p></div>
        <Modal isOpen={isopen} style={modalstyle}>
            <button style={{float:"right"}} onClick={() => setopen(false)}>X</button>
            <h2>삭제하시겠습니까?</h2>
            <h3>title : {props.Title}</h3> 
            <div style={predstyle}>
                <div style={buttonstyle} onClick={() => {itemdelete(props);}}><h4 style={{textAlign:"center", lineHeight:"0px"}}>삭제</h4></div>
                <div style={buttonstyle} onClick={() => setopen(false)}><h4 style={{textAlign:"center", lineHeight:"0px"}}>취소</h4></div>
            </div>
        </Modal>
    </div>}
    </div>
}

export default Columns