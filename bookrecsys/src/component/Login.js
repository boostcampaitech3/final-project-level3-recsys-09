import React, {useState} from "react";
import Modal from "react-modal";
import NaverLogin from "./NaverLogin";
import KakaoLogin from "./KakaoLogin";
import { useSelector, useDispatch } from "react-redux"

function Login(props){

    const ID = useSelector( (state) => state)
    const [ContentValue, setContentValue] = useState("");

    const dispatch = useDispatch()

    const [modalIsOpen, setModalIsOpen] = useState(false);

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
            width: "300px",
            height: "210px",
            margin:"auto",
            border: '1px solid #ccc',
            background: '#fff',
            overflow: 'auto',
            WebkitOverflowScrolling: 'touch',
            borderRadius: '10px',
            outline: 'none',
            padding: '2%'
        }
    }

    const onContentChange = (event) => {
        setContentValue(event.currentTarget.value);
    };

    const login = () => {
        
        if (ContentValue == ""){
            alert("ID를 입력하세요")
        }
        else{
            dispatch({type : 'login', payload: ContentValue}); 
            setModalIsOpen(false);
        }
    }

    return <div>
        {(ID.login === "login") && <button style={{float:"right", marginBottom:"1%"}} onClick={()=> setModalIsOpen(true)}>{ID.login}</button>}
        {(ID.login === "logout") && <button style={{float:"right", marginBottom:"1%"}} onClick={()=> {dispatch({type : 'logout'}); setContentValue("")}}>{ID.login}</button>}
        <Modal style={modalstyle} isOpen={modalIsOpen}>
            <button style={{float:"right"}} onClick={()=> setModalIsOpen(false)}>X</button>
            <h1 style={{textAlign:"center"}}>Login</h1>
            <div style={{flexDirection:"row", display:"flex", height: "70px"}}>
                <h2 style={{display:"flex", margin:"auto"}}>ID :</h2><input onChange={onContentChange} value={ContentValue} name="content" type="text" style={{height:"20px", margin:"auto"}}/>

            </div>  
            <div style={{border:"1px solid black", width:"45px", margin:"auto", textAlign:"center", borderRadius: '5px'}} onClick={() => login()}>login</div>
            <div style={{height:"30px"}}/>
        </Modal>

      </div>
}

export default Login