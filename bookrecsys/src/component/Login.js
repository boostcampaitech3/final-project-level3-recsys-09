import React, {useState} from "react";
import Modal from "react-modal";
import NaverLogin from "./NaverLogin";
import KakaoLogin from "./KakaoLogin";

function Login(){

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
            height: "500px",
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
    
    return (
      <>
        <button style={{float:"right", marginBottom:"1%"}} onClick={()=> setModalIsOpen(true)}>Login</button>
        <Modal style={modalstyle} isOpen={modalIsOpen}>
            <button style={{float:"right"}} onClick={()=> setModalIsOpen(false)}>X</button>
            <h1 style={{textAlign:"center"}}>Login</h1>   
            <NaverLogin />
            <KakaoLogin />
        </Modal>
      </>
    )
}

export default Login