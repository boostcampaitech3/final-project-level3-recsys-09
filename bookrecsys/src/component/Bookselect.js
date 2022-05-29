import React, {useState, useEffect, useCallback} from "react";
import Bookcover from "./Bookcover";
import Modal from "react-modal";
import Api from "../Api";
import Post from "../Post" 
import Ranklist from "./Ranklist";
import axios from "axios";

function Bookselect () {

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [isSelect, setSelected] = useState([{idx: 0, state:"unselected"}, {idx: 1, state:"unselected"},
                                            {idx: 2, state:"unselected"}, {idx: 3, state:"unselected"},
                                            {idx: 4, state:"unselected"}, {idx: 5, state:"unselected"}])

    const [li, setli] = useState([])
    const [length, plus] = useState(0)
    const tli = Api("rand/20")
    const [ii, seti] = useState(0)
    const [predlist, addPredlist] = useState("inference/")
    const [ispred, setpred] = useState(false)
    const [inferenceList, returninference] = useState([])
    
    const tmpstyle = {
        width:"100%",
        height:"auto",
        margin: "auto",
        padding:"20px",
        borderRadius:"10px",
        border:"1px solid black",
    }

    const tmpstyle2 = {
        width: "100%",
        height: "40vh",
        display: 'flex',
        flexDirection:"row",
        overflow:"auto",
    }

    const predstyle = {
        width: '300px',
        height: '100px',
        flexDirection: 'row',
        display: 'flex',
        margin: "auto",
    }
    
    const buttonstyle = {
        width: "100px",
        height: "50px",
        border: "1px solid black",
        margin: "20px",
        
    }

    const selectstyle = {
        width: "200px",
        height: "60px",
        border: "1px solid black",
        margin: "auto"
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
            width: '1100px',
            height: '50vh',
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

    function change (i) {

        if (isSelect[i].state == "unselected"){
            
            setSelected(isSelect.map(select =>
                select.idx === i ? {"idx":i, state:"selected"} : select)
            );
        }
        else{
            setSelected(isSelect.map(select =>
                select.idx === i ? {...select, state:"unselected"} : select)
            );
        }
    }

    function next(tli, i) {
        isSelect.map(select => {
            if (select.state === "selected"){
                addPredlist((predlist) => predlist + "," + tli[i + select.idx])
                plus((length) => length + 1)
            }
        })
        setSelected([{idx: 0, state:"unselected"}, {idx: 1, state:"unselected"},
        {idx: 2, state:"unselected"}, {idx: 3, state:"unselected"},
        {idx: 4, state:"unselected"}, {idx: 5, state:"unselected"}])

        const ti = i + 6
        setli(tli.slice(ti, ti+6))
        seti(i + 6)
    }

    const infe = useCallback((props) => {
        const link = "http://localhost:8000/" + props
        axios.get(link)
        .then(function(responseHandler) {
            returninference((inferenceList) => responseHandler.data); 
        })
    })


    return <div>
        <div style={tmpstyle}>
            <h1 style={{textAlign:"center", lineHeight:"250px"}} onClick={()=> {setModalIsOpen(true); setli(tli.slice(0, 6))}}> Book Select</h1>
        </div>
        <Modal style={modalstyle} isOpen={modalIsOpen}>
            <button style={{float:"right"}} onClick={()=> setModalIsOpen(false)}>X</button>
            <div style={tmpstyle2}>
                <div style={{width:"270px"}}><Bookcover title={li[0]}/> <div style={selectstyle}><h3 style={{textAlign:"center", lineHeight:"20px"}}  onClick={() => change(0)}>{isSelect[0].state}</h3></div></div>         
                <div style={{width:"270px"}}><Bookcover title={li[1]}/> <div style={selectstyle}><h3 style={{textAlign:"center", lineHeight:"20px"}}  onClick={() => change(1)}>{isSelect[1].state}</h3></div></div>    
                <div style={{width:"270px"}}><Bookcover title={li[2]}/> <div style={selectstyle}><h3 style={{textAlign:"center", lineHeight:"20px"}}  onClick={() => change(2)}>{isSelect[2].state}</h3></div></div>    
                <div style={{width:"270px"}}><Bookcover title={li[3]}/> <div style={selectstyle}><h3 style={{textAlign:"center", lineHeight:"20px"}}  onClick={() => change(3)}>{isSelect[3].state}</h3></div></div>    
                <div style={{width:"270px"}}><Bookcover title={li[4]}/> <div style={selectstyle}><h3 style={{textAlign:"center", lineHeight:"20px"}}  onClick={() => change(4)}>{isSelect[4].state}</h3></div></div>    
                <div style={{width:"270px"}}><Bookcover title={li[5]}/> <div style={selectstyle}><h3 style={{textAlign:"center", lineHeight:"20px"}}  onClick={() => change(5)}>{isSelect[5].state}</h3></div></div>    
            </div>
            <div style={predstyle}>
                <div style={buttonstyle} onClick={()=> {setModalIsOpen(false); next(tli, ii); infe(predlist); setpred(true);}}><h4 style={{textAlign:"center", lineHeight:"3px"}}>Predict</h4></div>
                <div style={buttonstyle} onClick={() => next(tli, ii)}><h4 style={{textAlign:"center", lineHeight:"3px"}}>Next</h4></div>
            </div>
        </Modal>
        <div>
            {ispred && <div><Ranklist li={inferenceList}/><button onClick={() => alert(inferenceList)}>inference List</button></div>}    
        </div>
    </div> 
}

export default Bookselect