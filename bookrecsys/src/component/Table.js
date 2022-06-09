import React from "react"
import Columns from "./Columns"

export const Table = (props) =>{

  

  const data = props.data
  const table = data.map((item) => {
    return (<div>
      {(item.idx % 2 == 1) && <Columns id={props.id} asin={item.asin} idx={item.idx} Title={item.Title} rate={item.rate} review={item.review} Date1={item.Date1} Date2={item.Date2}/>}
      {(item.idx % 2 == 0) && <Columns id={props.id} asin={item.asin} idx={item.idx} Title={item.Title} rate={item.rate} review={item.review} Date1={item.Date1} Date2={item.Date2} bgcolor={"#FAFAFA"}/>}
      </div>)
  });
  
  return <div style={{display:"flex", width:"1178px", height:"600px", flexDirection:"column", overflow:"auto"}}>
    <Columns idx={" "} Title={"title"} rate={"rate"} review={"review"} Date1={"start date"} Date2={"end date"} bgcolor={"#E2E2E2"}/>
    {table}
    
  </div>
}