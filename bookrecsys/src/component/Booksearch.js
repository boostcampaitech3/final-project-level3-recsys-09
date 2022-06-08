import React, { useState, useEffect } from "react";
import { Table } from "./Table";
import Modal from "react-modal/lib/components/Modal";
import { FaStar } from 'react-icons/fa';
import { useSelector } from 'react-redux'
import Calendar from "./Calendar";
import TCalendar from './TCalendar'
import Ranklist from "./Ranklist";
import axios from "axios";
import store4 from "./store4";

function Booksearch(props){

    const [rendering, rerendering] = useState(1)
    useEffect(() => {
        rerendering(Math.random())
    })

    store4.subscribe(function () {
        if (store4.getState().id === 0) {
            setstart(store4.getState().date);
        }
        else if (store4.getState().id === 1) {
            setend(store4.getState().date);
        }
    }.bind(this))

    const ID = useSelector( (state) => state)

    const [startdate, setstart] = useState(0)
    const [enddate, setend] = useState(0)

    const [isOpen, setOpen] = useState(false)
    const [modalopen, setmodal] = useState(false)
    const [ispred, setpred] = useState(false)
    const [rates, setrate] = useState([{idx:0, rate:[false, false, false, false, false], num:-1}])
    const [tempreview, settemp] = useState("")
    const [datalength, setlength] = useState(0)
    const [keyword, setkeyword] = useState("")

    const prevlist = ["0007350899","0091906814"]

    const [tmplist, settemplist] = useState([])

    const not_login = [{"idx" : 1, "Title":"", "rate": "", "review": "", "Date1":"", "Date2":""},
    {"idx" : 2, "Title":"", "rate": "", "review": "", "Date1":"", "Date2":""},
    {"idx" : 3, "Title":"", "rate": "", "review": "", "Date1":"", "Date2":""},
    {"idx" : 4, "Title":"", "rate": "", "review": "", "Date1":"", "Date2":""},
    {"idx" : 5, "Title":"", "rate": "", "review": "", "Date1":"", "Date2":""},
    {"idx" : 6, "Title":"", "rate": "", "review": "", "Date1":"", "Date2":""},
    {"idx" : 7, "Title":"", "rate": "", "review": "", "Date1":"", "Date2":""},
    {"idx" : 8, "Title":"", "rate": "", "review": "", "Date1":"", "Date2":""},
    {"idx" : 9, "Title":"", "rate": "", "review": "", "Date1":"", "Date2":""},
    {"idx" : 10, "Title":"", "rate": "", "review": "", "Date1":"", "Date2":""}]

    const [data, setdata] = useState([{"idx" : 1, "Title":"", "rate": "", "review": "", "Date1":"", "Date2":""},
    {"idx" : 2, "Title":"", "rate": "", "review": "", "Date1":"", "Date2":""},
    {"idx" : 3, "Title":"", "rate": "", "review": "", "Date1":"", "Date2":""},
    {"idx" : 4, "Title":"", "rate": "", "review": "", "Date1":"", "Date2":""},
    {"idx" : 5, "Title":"", "rate": "", "review": "", "Date1":"", "Date2":""},
    {"idx" : 6, "Title":"", "rate": "", "review": "", "Date1":"", "Date2":""},
    {"idx" : 7, "Title":"", "rate": "", "review": "", "Date1":"", "Date2":""},
    {"idx" : 8, "Title":"", "rate": "", "review": "", "Date1":"", "Date2":""},
    {"idx" : 9, "Title":"", "rate": "", "review": "", "Date1":"", "Date2":""},
    {"idx" : 10, "Title":"", "rate": "", "review": "", "Date1":"", "Date2":""}])

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
            height: '630px',
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

    const predstyle = {
        width: '250px',
        height: '50px',
        flexDirection: 'row',
        display: 'flex',
        margin: "auto",
    }

    const buttonstyle2 = {
        width: "80px",
        height: "40px",
        border: "1px solid black",
        margin: "20px"
    }

    function setstar(r){
        let temp = []
        for (let ii = 0; ii<r; ii++){
            temp.push(true)
        } 
        for (let ii = 0; ii<(5 - r); ii++){
            temp.push(false)
        }
        setrate([{idx:0, rate:temp, num:r}])
    }

    const additem = (title, asin) => {
        const link = "http://localhost:8000/intersave"
        let items = {id:ID.ID, title:title, asin:asin, rate:rates[0].num, review:tempreview, startdate:getFormatDate(startdate), enddate:getFormatDate(enddate)}
        axios.post(link, items)
        .then(function(responseHandler){
            if (datalength <= 10) {
                setdata(data.map(d =>
                    d.idx === datalength + 1 ? {"idx" : datalength, "Title":title, "rate": items.rate, "review": items.review, "Date1":items.startdate, "Date2":items.enddate, "asin":asin} : d)
                );
            }
            else{
                setdata([...data, {"idx" : datalength, "Title":title, "rate": items.rate, "review": items.review, "Date1":items.startdate, "Date2":items.enddate, "asin":asin}])
            }
            setlength(datalength + 1)
        })
    }

    const onContentChange = (event) => {
        settemp(event.currentTarget.value)
    };
    const onkeywordChange = (event) => {
        setkeyword(event.currentTarget.value)
    };

    useEffect(() => {
        if (ID.login == "logout"){
            const link = "http://localhost:8000/userdata/" + ID.ID
            axios.get(link)
            .then(function(responseHandler) {
                console.log(responseHandler.data)
                const d = responseHandler.data
                let temp = []
                for (let i = 0; i < d.length; i++){
                    temp.push({"idx" : i + 1, "Title":d[i].title, "rate": d[i].overall, "review": d[i].reviewText, "Date1":d[i].startdate, "Date2":d[i].enddate, "asin":d[i].asin})
                }
                setlength(d.length)
                if (d.length < 10){
                    for (let i = 0; i < 10 - d.length; i++){
                        temp.push({"idx" : i + 1 + d.length, "Title":"", "rate": "", "review": "", "Date1":"", "Date2":""})
                    }
                }
                setdata(temp)
        })
        }
        else{
            setdata(not_login)
        }
    }, [ID.login])
    
    const getItems = () => {        
        const link1 = "http://localhost:8000/itemsli/" + keyword
        axios.get(link1)
        .then(function(responseHandler){
            settemplist((tmplist) => responseHandler.data)
        })
        setOpen(true)
    }

    function getFormatDate(date){
        if (date == 0){ return "" }
        else{
            var year = date.getFullYear();              
            var month = (1 + date.getMonth());          
            month = month >= 10 ? month : '0' + month;  
            var day = date.getDate();                  
            day = day >= 10 ? day : '0' + day;          
            return  year + ' - ' + month + ' - ' + day;      
        }
    }

    function open(){
        setstart(0)
        setend(0)
        setrate([{idx:0, rate:[false, false, false, false, false], num:-1}])
        settemp("")
        setmodal(true)
    }

    const result = tmplist.map((items) => {
        return <div style={{margin:"20px", border:"1px solid black", height:"300px", display:"flex", width:"95%"}}>
            <img src={items.imgurl} style={{display:"flex", width:"220px", height:"280px", margin:"10px"}}/>
            <div style={{display:"flex", margin:"20px"}}>
                <div>
                    <div style={{display:"flex"}}>
                        <div style={{width:"110px", height:"50px"}}><h3 style={{textAlign:"center"}}>title : </h3></div>
                        <div style={{width:"1000px", height:"50px"}}><p>{items.title}</p></div>
                    </div>
                    <div style={{display:"flex"}}>
                        <div style={{width:"110px", height:"40px"}}><h3 style={{textAlign:"center"}}>category : </h3></div>
                        <div style={{width:"1000px", height:"40px"}}><p>{items.category}</p></div>
                    </div>
                    <div style={{display:"flex"}}>
                        <div style={{width:"110px", height:"100px"}}><h3 style={{textAlign:"center"}}>description : </h3></div>
                        <div style={{width:"1000px", height:"100px", overflow:"auto"}}><p>{items.description}</p></div>
                    </div>
                    <div style={{display:"flex"}}>
                        <div style={{width:"110px", height:"40px"}}><h3 style={{textAlign:"center"}}>price : </h3></div>
                        <div style={{width:"1000px", height:"40px"}}><p>{items.price}</p></div>
                    </div>
                    <div style={{display:"flex"}}>
                        <div style={{width:"110px", height:"40px"}}><h3 style={{textAlign:"center"}}>asin : </h3></div>
                        <div style={{width:"1000px", height:"40px"}}><p>{items.asin}</p></div>
                    </div>
                </div>
            
            <button style={{width:"25px", height:"20px"}} onClick={() => open()}>+</button>
            </div>
            <Modal style={reviewmodalstyle} isOpen={modalopen}>
                <button style={{float:"right"}} onClick={()=> setmodal(false)}>X</button>
                <h2 style={{textAlign:"center"}}>{items.title}</h2>
                <div style={{display:"flex", width:"250px", margin:"auto"}}>                   
                    {rates[0].rate[0] === false && <FaStar style={{color: "lightgray"}} size="50" onClick={() => {setstar(1)}}/>}
                    {rates[0].rate[0] && <FaStar style={{color: "black"}} size="50" onClick={() => {setstar(1)}}/>}
                    {rates[0].rate[1] === false && <FaStar style={{color: "lightgray"}} size="50" onClick={() => {setstar(2)}}/>}
                    {rates[0].rate[1] && <FaStar style={{color: "black"}} size="50" onClick={() => {setstar(2)}}/>}
                    {rates[0].rate[2] === false && <FaStar style={{color: "lightgray"}} size="50" onClick={() => {setstar(3)}}/>}
                    {rates[0].rate[2] && <FaStar style={{color: "black"}} size="50" onClick={() => {setstar(3)}}/>}
                    {rates[0].rate[3] === false && <FaStar style={{color: "lightgray"}} size="50" onClick={() => {setstar(4)}}/>}
                    {rates[0].rate[3] && <FaStar style={{color: "black"}} size="50" onClick={() => {setstar(4)}}/>}
                    {rates[0].rate[4] === false && <FaStar style={{color: "lightgray"}} size="50" onClick={() => {setstar(5)}}/>}
                    {rates[0].rate[4] && <FaStar style={{color: "black"}} size="50" onClick={() => {setstar(5)}}/>}
                </div>
                <input style={{height:"300px", width:"400px", display:"flex", margin:"auto", fontSize:"15pt", padding:"10px"}} type="text" value={tempreview} onChange={onContentChange}/>
                <Calendar/>
                <div style={predstyle}>
                    <div style={buttonstyle2} onClick={() => {additem(items.title, items.asin); setmodal(false)}}><h4 style={{textAlign:"center", lineHeight:"0px"}}>Submit</h4></div>
                    <div style={buttonstyle2} onClick={() => setmodal(false)}><h4 style={{textAlign:"center", lineHeight:"0px"}}>cancel</h4></div>
                </div>
            </Modal>
        </div> 
    })

    return<div>

        <div style={{display:"flex", margin:"20px"}}>
            <input style={{height:"20px", width:"400px", fontSize:"15pt", padding:"10px"}} type="text" value={keyword} onChange={onkeywordChange}/>
            <button onClick={() => {getItems();}} style={{width:"60px", height:"40px", textAlign:"center", margin:"3px"}}><p>search</p></button>
            <button onClick={() => {setpred(true)}} style={{width:"80px", height:"40px", textAlign:"center", margin:"3px"}}><p>추천받기</p></button>
        </div>
        {(ispred) && <Ranklist li={prevlist}/>}
        {(isOpen) && <div style={{width:"100%", height:"700px", margin:"15px",border:"1px solid black", overflow:"auto", flexDirection:"columns"}}>
            {result}
            
        </div>}
        <hr style={{width:"102.5%", marginBottom:"2%"}}/>
        <div style={{flexDirection:"row", display:"flex"}}>  
            <div style={{display:"flex"}}>
                <Table id={ID.ID} data={data}/>
            </div>
            <div style={{display:"flex", margin:"auto"}}>
                <TCalendar data={data}/>
            </div>
        </div>
    </div>
}

export default Booksearch