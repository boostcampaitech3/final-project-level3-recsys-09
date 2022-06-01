import React, {useState, useEffect, useCallback} from "react";
import Bookcover from "./Bookcover";
import Modal from "react-modal";
import Api from "../Api";
import Post from "../Post" 
import Ranklist from "./Ranklist";
import axios from "axios";
import { FaStar } from 'react-icons/fa';

function Bookselect () {

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [isSelect, setSelected] = useState([{idx: 0, state:false}, {idx: 1, state:false},
                                            {idx: 2, state:false}, {idx: 3, state:false},
                                            {idx: 4, state:false}, {idx: 5, state:false}])

    const [reviews, setreview] = useState([{idx: 0, state:"unselected", rate: 0, review: ""}, 
                                            {idx: 1, state:"unselected", rate: 0, review: ""},
                                            {idx: 2, state:"unselected", rate: 0, review: ""},
                                            {idx: 3, state:"unselected", rate: 0, review: ""},
                                            {idx: 4, state:"unselected", rate: 0, review: ""},
                                            {idx: 5, state:"unselected", rate: 0, review: ""},])

    const [li, setli] = useState(["1", "2", "3", "4", "5", "6"])
    const [length, plus] = useState(0)
    const tli = ["1", "2", "3", "4", "5", "6"] //Api("rand/20")
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
        height: "70vh",
        display: 'flex',
        flexDirection:"row",
        overflow:"auto",
    }

    const predstyle = {
        width: '250px',
        height: '50px',
        flexDirection: 'row',
        display: 'flex',
        margin: "auto",
    }
    
    const buttonstyle = {
        width: "100px",
        height: "50px",
        border: "1px solid black",
        margin: "20px"
    }

    const buttonstyle2 = {
        width: "80px",
        height: "40px",
        border: "1px solid black",
        margin: "20px"
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
            height: '70vh',
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

    const reviewmodalstyle = {
        
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
            width: '500px',
            height: '500px',
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
        
        if (reviews[i].state == "selected"){
            setreview(reviews.map(rv =>
                rv.idx === i ? {idx: i, state:"unselected", rate: 0, review: ""} : rv)
            );
        }
        else{
            if (isSelect[i].state == false){
                setSelected(isSelect.map(select =>
                    select.idx === i ? {"idx":i, state:true} : select)
                );
            }
            else{
                setSelected(isSelect.map(select =>
                    select.idx === i ? {"idx":i, state:false} : select)
                );
            }
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

    function submit(i) {
        setreview(reviews.map(rv =>
            rv.idx === i ? {idx: i, state:"selected", rate: 0, review: ""} : rv)
        );
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
                <div style={{width:"270px"}}>
                    <Bookcover title={li[0]}/>
                     <div style={selectstyle}><h3 style={{textAlign:"center", lineHeight:"20px"}}  onClick={() => change(0)}>{reviews[0].state}</h3></div>
                     <Modal style={reviewmodalstyle} isOpen={isSelect[0].state}>
                        <button style={{float:"right"}} onClick={()=> change(0)}>X</button>
                        <h2 style={{textAlign:"center"}}>{li[0]}</h2>
                        <div style={{display:"flex", width:"250px", margin:"auto"}}>
                            <FaStar style={{color: "lightgray"}} size="50"></FaStar>
                            <FaStar style={{color: "lightgray"}} size="50"></FaStar>
                            <FaStar style={{color: "lightgray"}} size="50"></FaStar>
                            <FaStar style={{color: "lightgray"}} size="50"></FaStar>
                            <FaStar style={{color: "lightgray"}} size="50"></FaStar>
                        </div>
                        <textarea style={{height:"300px", width:"400px", display:"flex", margin:"auto", fontSize:"15pt", padding:"10px"}}></textarea>
                        <div style={predstyle}>
                            <div style={buttonstyle2} onClick={() => {submit(0); change(0)}}><h4 style={{textAlign:"center", lineHeight:"0px"}}>Submit</h4></div>
                            <div style={buttonstyle2} onClick={() => change(0)}><h4 style={{textAlign:"center", lineHeight:"0px"}}>cancel</h4></div>
                        </div>
                     </Modal>
                </div>         
                <div style={{width:"270px"}}><Bookcover title={li[1]}/> <div style={selectstyle}><h3 style={{textAlign:"center", lineHeight:"20px"}}  onClick={() => change(1)}>{reviews[1].state}</h3></div></div>    
                <div style={{width:"270px"}}><Bookcover title={li[2]}/> <div style={selectstyle}><h3 style={{textAlign:"center", lineHeight:"20px"}}  onClick={() => change(2)}>{reviews[2].state}</h3></div></div>    
                <div style={{width:"270px"}}><Bookcover title={li[3]}/> <div style={selectstyle}><h3 style={{textAlign:"center", lineHeight:"20px"}}  onClick={() => change(3)}>{reviews[3].state}</h3></div></div>    
                <div style={{width:"270px"}}><Bookcover title={li[4]}/> <div style={selectstyle}><h3 style={{textAlign:"center", lineHeight:"20px"}}  onClick={() => change(4)}>{reviews[4].state}</h3></div></div>    
                <div style={{width:"270px"}}><Bookcover title={li[5]}/> <div style={selectstyle}><h3 style={{textAlign:"center", lineHeight:"20px"}}  onClick={() => change(5)}>{reviews[5].state}</h3></div></div>    
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