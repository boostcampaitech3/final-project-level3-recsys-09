import './App.css';
import React from "react";
import Ranklist from './component/Ranklist'
import Login from './component/Login';
import Bookselect from './component/Bookselect';
import axios from 'axios';
import Api from './Api';

function App() {
  
  const r1 = Api("rand/20")
  const r2 = Api("rand/20")

  return (
    <div style={{padding:"10%", paddingTop:"3%"}}>
      <h1>title</h1>
      <Login/>
      <hr style={{width:"102.5%", marginBottom:"2%"}}/>
      <Bookselect/>
      <hr style={{width:"102.5%", marginBottom:"2%"}}/>
      {(r1.length != 0) && <Ranklist li={r1}/>}
      <hr style={{width:"102.5%", marginTop:"0%", marginBottom:"0%"}}/>
      {(r2.length != 0) && <Ranklist li={r2}/>}
    </div>
  );
}

export default App;
