import React, {useState, useEffect, useCallback} from "react";
import Bookcover from "./Bookcover";
import Modal from "react-modal";
import Api from "../Api";
import Post from "../Post" 
import Ranklist from "./Ranklist";
import axios from "axios";
import { FaStar } from 'react-icons/fa';
import { useSelector, useDispatch } from "react-redux"

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
                                            {idx: 5, state:"unselected", rate: 0, review: ""}])
    
    const [rates, setrate] = useState([{idx:0, rate:[false, false, false, false, false], num:-1},
                                        {idx:1, rate:[false, false, false, false, false], num:-1},
                                        {idx:2, rate:[false, false, false, false, false], num:-1},
                                        {idx:3, rate:[false, false, false, false, false], num:-1},
                                        {idx:4, rate:[false, false, false, false, false], num:-1},
                                        {idx:5, rate:[false, false, false, false, false], num:-1}])
    
    const [tempreview, settemp] = useState("")
    const [temptitle, settitle] = useState("")

    const [li, setli] = useState(["1", "2", "3", "4", "5", "6"])
    const tli = Api("rand/30")
    const [ii, seti] = useState(0)
    const [predlist, addPredlist] = useState("inference/")
    const [ispred, setpred] = useState(false)
    const [inferenceList, returninference] = useState([])
    
    const ID = useSelector( (state) => state)

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
        reviews.map(select => {
            if (select.state === "selected"){
                intersave(select, i)
            }
        })

        setreview([{idx: 0, state:"unselected", rate: 0, review: ""}, 
        {idx: 1, state:"unselected", rate: 0, review: ""},
        {idx: 2, state:"unselected", rate: 0, review: ""},
        {idx: 3, state:"unselected", rate: 0, review: ""},
        {idx: 4, state:"unselected", rate: 0, review: ""},
        {idx: 5, state:"unselected", rate: 0, review: ""}])

        setSelected([{idx: 0, state:false}, {idx: 1, state:false},
            {idx: 2, state:false}, {idx: 3, state:false},
            {idx: 4, state:false}, {idx: 5, state:false}])

        const ti = i + 6
        setli(tli.slice(ti, ti+6))
        seti(i + 6)
    }

    function submit(i) {
        if (rates[i].num < 1){
            alert("평점이 필요합니다")
        }
        else{
            setreview(reviews.map(rv =>
                rv.idx === i ? {idx: i, state:"selected", rate: rates[i].num, review: tempreview} : rv)
            );
            change(i)
        }
    }

    function setstar(i, r){
        let temp = []
        for (let ii = 0; ii<r; ii++){
            temp.push(true)
        } 
        for (let ii = 0; ii<(5 - r); ii++){
            temp.push(false)
        }
        setrate(rates.map(rt =>
            rt.idx === i ? {idx:0, rate:temp, num:r} : rt)
        );
    }

    const infe = useCallback((props) => {
        const link = "http://localhost:8000/" + props
        axios.get(link)
        .then(function(responseHandler) {
            returninference((inferenceList) => responseHandler.data); 
        })
    })

    const intersave = useCallback((item, i) => {
        const link = "http://localhost:8000/intersave"
        let items = {id:ID.ID, asin:tli[i + item.idx], rate:item.rate, review:item.review}

        axios.post(link, items)
        .then(function(responseHandler) {})
    })

    const onContentChange = (event) => {
        settemp(event.currentTarget.value)
    };

    const gettitle = useCallback((asin) => {
        const link = "http://localhost:8000/title/" + asin

        axios.get(link)
        .then(function(responseHandler){
            settitle(responseHandler.data)
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
                     <div style={selectstyle}><h3 style={{textAlign:"center", lineHeight:"20px"}}  onClick={() => {settitle(""); gettitle(li[ii]); settemp(""); change(0)}}>{reviews[0].state}</h3></div>
                     <Modal style={reviewmodalstyle} isOpen={isSelect[0].state}>
                        <button style={{float:"right"}} onClick={()=> change(0)}>X</button>
                        <h2 style={{textAlign:"center"}}>{temptitle}</h2>
                        <div style={{display:"flex", width:"250px", margin:"auto"}}>                   
                            {rates[0].rate[0] === false && <FaStar style={{color: "lightgray"}} size="50" onClick={() => {setstar(0, 1)}}/>}
                            {rates[0].rate[0] && <FaStar style={{color: "black"}} size="50" onClick={() => {setstar(0, 1)}}/>}
                            {rates[0].rate[1] === false && <FaStar style={{color: "lightgray"}} size="50" onClick={() => {setstar(0, 2)}}/>}
                            {rates[0].rate[1] && <FaStar style={{color: "black"}} size="50" onClick={() => {setstar(0, 2)}}/>}
                            {rates[0].rate[2] === false && <FaStar style={{color: "lightgray"}} size="50" onClick={() => {setstar(0, 3)}}/>}
                            {rates[0].rate[2] && <FaStar style={{color: "black"}} size="50" onClick={() => {setstar(0, 3)}}/>}
                            {rates[0].rate[3] === false && <FaStar style={{color: "lightgray"}} size="50" onClick={() => {setstar(0, 4)}}/>}
                            {rates[0].rate[3] && <FaStar style={{color: "black"}} size="50" onClick={() => {setstar(0, 4)}}/>}
                            {rates[0].rate[4] === false && <FaStar style={{color: "lightgray"}} size="50" onClick={() => {setstar(0, 5)}}/>}
                            {rates[0].rate[4] && <FaStar style={{color: "black"}} size="50" onClick={() => {setstar(0, 5)}}/>}
                        </div>
                        <input style={{height:"300px", width:"400px", display:"flex", margin:"auto", fontSize:"15pt", padding:"10px"}} type="text" value={tempreview} onChange={onContentChange}/>
                        <div style={predstyle}>
                            <div style={buttonstyle2} onClick={() => submit(0)}><h4 style={{textAlign:"center", lineHeight:"0px"}}>Submit</h4></div>
                            <div style={buttonstyle2} onClick={() => change(0)}><h4 style={{textAlign:"center", lineHeight:"0px"}}>cancel</h4></div>
                        </div>
                     </Modal>
                </div>
                <div style={{width:"270px"}}>
                    <Bookcover title={li[1]}/>
                     <div style={selectstyle}><h3 style={{textAlign:"center", lineHeight:"20px"}}  onClick={() => {settitle(""); gettitle(li[ii + 1]); settemp(""); change(1)}}>{reviews[1].state}</h3></div>
                     <Modal style={reviewmodalstyle} isOpen={isSelect[1].state}>
                        <button style={{float:"right"}} onClick={()=> change(1)}>X</button>
                        {(temptitle != "") && <h2 style={{textAlign:"center"}}>{temptitle}</h2>}
                        <div style={{display:"flex", width:"250px", margin:"auto"}}>                   
                            {rates[1].rate[0] === false && <FaStar style={{color: "lightgray"}} size="50" onClick={() => {setstar(1, 1)}}/>}
                            {rates[1].rate[0] && <FaStar style={{color: "black"}} size="50" onClick={() => {setstar(1, 1)}}/>}
                            {rates[1].rate[1] === false && <FaStar style={{color: "lightgray"}} size="50" onClick={() => {setstar(1, 2)}}/>}
                            {rates[1].rate[1] && <FaStar style={{color: "black"}} size="50" onClick={() => {setstar(1, 2)}}/>}
                            {rates[1].rate[2] === false && <FaStar style={{color: "lightgray"}} size="50" onClick={() => {setstar(1, 3)}}/>}
                            {rates[1].rate[2] && <FaStar style={{color: "black"}} size="50" onClick={() => {setstar(1, 3)}}/>}
                            {rates[1].rate[3] === false && <FaStar style={{color: "lightgray"}} size="50" onClick={() => {setstar(1, 4)}}/>}
                            {rates[1].rate[3] && <FaStar style={{color: "black"}} size="50" onClick={() => {setstar(1, 4)}}/>}
                            {rates[1].rate[4] === false && <FaStar style={{color: "lightgray"}} size="50" onClick={() => {setstar(1, 5)}}/>}
                            {rates[1].rate[4] && <FaStar style={{color: "black"}} size="50" onClick={() => {setstar(1, 5)}}/>}
                        </div>
                        <input style={{height:"300px", width:"400px", display:"flex", margin:"auto", fontSize:"15pt", padding:"10px"}} type="text" value={tempreview} onChange={onContentChange}/>
                        <div style={predstyle}>
                            <div style={buttonstyle2} onClick={() => submit(1)}><h4 style={{textAlign:"center", lineHeight:"0px"}}>Submit</h4></div>
                            <div style={buttonstyle2} onClick={() => change(1)}><h4 style={{textAlign:"center", lineHeight:"0px"}}>cancel</h4></div>
                        </div>
                     </Modal>
                </div>
                <div style={{width:"270px"}}>
                    <Bookcover title={li[2]}/>
                     <div style={selectstyle}><h3 style={{textAlign:"center", lineHeight:"20px"}}  onClick={() => {settitle(""); gettitle(li[ii + 2]); settemp(""); change(2)}}>{reviews[2].state}</h3></div>
                     <Modal style={reviewmodalstyle} isOpen={isSelect[2].state}>
                        <button style={{float:"right"}} onClick={()=> change(2)}>X</button>
                        {(temptitle != "") && <h2 style={{textAlign:"center"}}>{temptitle}</h2>}
                        <div style={{display:"flex", width:"250px", margin:"auto"}}>                   
                            {rates[2].rate[0] === false && <FaStar style={{color: "lightgray"}} size="50" onClick={() => {setstar(2, 1)}}/>}
                            {rates[2].rate[0] && <FaStar style={{color: "black"}} size="50" onClick={() => {setstar(2, 1)}}/>}
                            {rates[2].rate[1] === false && <FaStar style={{color: "lightgray"}} size="50" onClick={() => {setstar(2, 2)}}/>}
                            {rates[2].rate[1] && <FaStar style={{color: "black"}} size="50" onClick={() => {setstar(2, 2)}}/>}
                            {rates[2].rate[2] === false && <FaStar style={{color: "lightgray"}} size="50" onClick={() => {setstar(2, 3)}}/>}
                            {rates[2].rate[2] && <FaStar style={{color: "black"}} size="50" onClick={() => {setstar(2, 3)}}/>}
                            {rates[2].rate[3] === false && <FaStar style={{color: "lightgray"}} size="50" onClick={() => {setstar(2, 4)}}/>}
                            {rates[2].rate[3] && <FaStar style={{color: "black"}} size="50" onClick={() => {setstar(2, 4)}}/>}
                            {rates[2].rate[4] === false && <FaStar style={{color: "lightgray"}} size="50" onClick={() => {setstar(2, 5)}}/>}
                            {rates[2].rate[4] && <FaStar style={{color: "black"}} size="50" onClick={() => {setstar(2, 5)}}/>}
                        </div>
                        <input style={{height:"300px", width:"400px", display:"flex", margin:"auto", fontSize:"15pt", padding:"10px"}} type="text" value={tempreview} onChange={onContentChange}/>
                        <div style={predstyle}>
                            <div style={buttonstyle2} onClick={() => submit(2)}><h4 style={{textAlign:"center", lineHeight:"0px"}}>Submit</h4></div>
                            <div style={buttonstyle2} onClick={() => change(2)}><h4 style={{textAlign:"center", lineHeight:"0px"}}>cancel</h4></div>
                        </div>
                     </Modal>
                </div>
                <div style={{width:"270px"}}>
                    <Bookcover title={li[3]}/>
                     <div style={selectstyle}><h3 style={{textAlign:"center", lineHeight:"20px"}}  onClick={() => {settitle(""); gettitle(li[ii + 3]); settemp(""); change(3)}}>{reviews[3].state}</h3></div>
                     <Modal style={reviewmodalstyle} isOpen={isSelect[3].state}>
                        <button style={{float:"right"}} onClick={()=> change(3)}>X</button>
                        {(temptitle != "") && <h2 style={{textAlign:"center"}}>{temptitle}</h2>}
                        <div style={{display:"flex", width:"250px", margin:"auto"}}>                   
                            {rates[3].rate[0] === false && <FaStar style={{color: "lightgray"}} size="50" onClick={() => {setstar(3, 1)}}/>}
                            {rates[3].rate[0] && <FaStar style={{color: "black"}} size="50" onClick={() => {setstar(3, 1)}}/>}
                            {rates[3].rate[1] === false && <FaStar style={{color: "lightgray"}} size="50" onClick={() => {setstar(3, 2)}}/>}
                            {rates[3].rate[1] && <FaStar style={{color: "black"}} size="50" onClick={() => {setstar(3, 2)}}/>}
                            {rates[3].rate[2] === false && <FaStar style={{color: "lightgray"}} size="50" onClick={() => {setstar(3, 3)}}/>}
                            {rates[3].rate[2] && <FaStar style={{color: "black"}} size="50" onClick={() => {setstar(3, 3)}}/>}
                            {rates[3].rate[3] === false && <FaStar style={{color: "lightgray"}} size="50" onClick={() => {setstar(3, 4)}}/>}
                            {rates[3].rate[3] && <FaStar style={{color: "black"}} size="50" onClick={() => {setstar(3, 4)}}/>}
                            {rates[3].rate[4] === false && <FaStar style={{color: "lightgray"}} size="50" onClick={() => {setstar(3, 5)}}/>}
                            {rates[3].rate[4] && <FaStar style={{color: "black"}} size="50" onClick={() => {setstar(3, 5)}}/>}
                        </div>
                        <input style={{height:"300px", width:"400px", display:"flex", margin:"auto", fontSize:"15pt", padding:"10px"}} type="text" value={tempreview} onChange={onContentChange}/>
                        <div style={predstyle}>
                            <div style={buttonstyle2} onClick={() => submit(3)}><h4 style={{textAlign:"center", lineHeight:"0px"}}>Submit</h4></div>
                            <div style={buttonstyle2} onClick={() => change(3)}><h4 style={{textAlign:"center", lineHeight:"0px"}}>cancel</h4></div>
                        </div>
                     </Modal>
                </div>
                <div style={{width:"270px"}}>
                    <Bookcover title={li[4]}/>
                     <div style={selectstyle}><h3 style={{textAlign:"center", lineHeight:"20px"}}  onClick={() => {settitle(""); gettitle(li[ii + 4]); settemp(""); change(4)}}>{reviews[4].state}</h3></div>
                     <Modal style={reviewmodalstyle} isOpen={isSelect[4].state}>
                        <button style={{float:"right"}} onClick={()=> change(4)}>X</button>
                        {(temptitle != "") && <h2 style={{textAlign:"center"}}>{temptitle}</h2>}
                        <div style={{display:"flex", width:"250px", margin:"auto"}}>                   
                            {rates[4].rate[0] === false && <FaStar style={{color: "lightgray"}} size="50" onClick={() => {setstar(4, 1)}}/>}
                            {rates[4].rate[0] && <FaStar style={{color: "black"}} size="50" onClick={() => {setstar(4, 1)}}/>}
                            {rates[4].rate[1] === false && <FaStar style={{color: "lightgray"}} size="50" onClick={() => {setstar(4, 2)}}/>}
                            {rates[4].rate[1] && <FaStar style={{color: "black"}} size="50" onClick={() => {setstar(4, 2)}}/>}
                            {rates[4].rate[2] === false && <FaStar style={{color: "lightgray"}} size="50" onClick={() => {setstar(4, 3)}}/>}
                            {rates[4].rate[2] && <FaStar style={{color: "black"}} size="50" onClick={() => {setstar(4, 3)}}/>}
                            {rates[4].rate[3] === false && <FaStar style={{color: "lightgray"}} size="50" onClick={() => {setstar(4, 4)}}/>}
                            {rates[4].rate[3] && <FaStar style={{color: "black"}} size="50" onClick={() => {setstar(4, 4)}}/>}
                            {rates[4].rate[4] === false && <FaStar style={{color: "lightgray"}} size="50" onClick={() => {setstar(4, 5)}}/>}
                            {rates[4].rate[4] && <FaStar style={{color: "black"}} size="50" onClick={() => {setstar(4, 5)}}/>}
                        </div>
                        <input style={{height:"300px", width:"400px", display:"flex", margin:"auto", fontSize:"15pt", padding:"10px"}} type="text" value={tempreview} onChange={onContentChange}/>
                        <div style={predstyle}>
                            <div style={buttonstyle2} onClick={() => submit(4)}><h4 style={{textAlign:"center", lineHeight:"0px"}}>Submit</h4></div>
                            <div style={buttonstyle2} onClick={() => change(4)}><h4 style={{textAlign:"center", lineHeight:"0px"}}>cancel</h4></div>
                        </div>
                     </Modal>
                </div>  
                <div style={{width:"270px"}}>
                    <Bookcover title={li[5]}/>
                     <div style={selectstyle}><h3 style={{textAlign:"center", lineHeight:"20px"}}  onClick={() => {settitle(""); gettitle(li[ii + 5]); settemp(""); change(5)}}>{reviews[5].state}</h3></div>
                     <Modal style={reviewmodalstyle} isOpen={isSelect[5].state}>
                        <button style={{float:"right"}} onClick={()=> change(5)}>X</button>
                        {(temptitle != "") && <h2 style={{textAlign:"center"}}>{temptitle}</h2>}
                        <div style={{display:"flex", width:"250px", margin:"auto"}}>                   
                            {rates[5].rate[0] === false && <FaStar style={{color: "lightgray"}} size="50" onClick={() => {setstar(5, 1)}}/>}
                            {rates[5].rate[0] && <FaStar style={{color: "black"}} size="50" onClick={() => {setstar(5, 1)}}/>}
                            {rates[5].rate[1] === false && <FaStar style={{color: "lightgray"}} size="50" onClick={() => {setstar(5, 2)}}/>}
                            {rates[5].rate[1] && <FaStar style={{color: "black"}} size="50" onClick={() => {setstar(5, 2)}}/>}
                            {rates[5].rate[2] === false && <FaStar style={{color: "lightgray"}} size="50" onClick={() => {setstar(5, 3)}}/>}
                            {rates[5].rate[2] && <FaStar style={{color: "black"}} size="50" onClick={() => {setstar(5, 3)}}/>}
                            {rates[5].rate[3] === false && <FaStar style={{color: "lightgray"}} size="50" onClick={() => {setstar(5, 4)}}/>}
                            {rates[5].rate[3] && <FaStar style={{color: "black"}} size="50" onClick={() => {setstar(5, 4)}}/>}
                            {rates[5].rate[4] === false && <FaStar style={{color: "lightgray"}} size="50" onClick={() => {setstar(5, 5)}}/>}
                            {rates[5].rate[4] && <FaStar style={{color: "black"}} size="50" onClick={() => {setstar(5, 5)}}/>}
                        </div>
                        <input style={{height:"300px", width:"400px", display:"flex", margin:"auto", fontSize:"15pt", padding:"10px"}} type="text" value={tempreview} onChange={onContentChange}/>
                        <div style={predstyle}>
                            <div style={buttonstyle2} onClick={() => submit(5)}><h4 style={{textAlign:"center", lineHeight:"0px"}}>Submit</h4></div>
                            <div style={buttonstyle2} onClick={() => change(5)}><h4 style={{textAlign:"center", lineHeight:"0px"}}>cancel</h4></div>
                        </div>
                     </Modal>
                </div>       
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