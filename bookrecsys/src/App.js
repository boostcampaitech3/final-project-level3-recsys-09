import './App.css';
import React, { useState, useEffect } from "react";
import Ranklist from './component/Ranklist'
import Login from './component/Login';
import Bookselect from './component/Bookselect';
import Booksearch from './component/Booksearch';
import TCalendar from './component/TCalendar'
import axios from 'axios';
import Api from './Api';
import { useSelector } from 'react-redux'
import { Table } from './component/Table';

function App() {
  
  const ID = useSelector( (state) => state)
  
  return (
    <div style={{padding:"10%", paddingTop:"3%"}}>
      <h1>Booksby</h1>
      <Login/>
      <hr style={{width:"102.5%", marginBottom:"2%"}}/>
          <Booksearch/>
      <hr style={{width:"102.5%", marginBottom:"2%"}}/>
      <div style={{display:"flex", margin:"auto"}}>
      
     
      </div>

    </div>
  );
}

export default App;
