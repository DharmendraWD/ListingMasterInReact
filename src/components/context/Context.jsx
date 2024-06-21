import React, { createContext, useState, useEffect } from 'react'
export const data = createContext()

function Context(props) {
const [name, setName] = useState("John Doe")
//MASTER LISTING SIDEBAR DATA BEGINS HERE 
const chartOfAccount = [
    {
        ttl:"Account Group",
        link:"ListReport/ListingAccountGroup"
    },
    {
        ttl:"Account Sub Group",
        link:"ListReport/ListingAccountSubGroup"
    },
    {
        ttl:"Account Add Group 1",
        link:"ListReport/ListingAccountAddGroup"
    },
    {
        ttl:"Account Add Group 2",
        link:"ListReport/ListingAccountAddSubGroup"
    },
    {
        ttl:"General Ledger",
        link:"ListReport/ListingGeneralLedger"
    },
    {
        ttl:"Customer",
        link:"ListReport/ListingCustomerLedger"
    },
    {
        ttl:"Vendor",
        link:"ListReport/ListingVendorLedger"
    },
    {
        ttl:"Ledger List Account Group Wise",
        link:""
    },
    {
        ttl:"Ledger List Agent Wise"
    },
    {
        ttl:"Subledger",
        link:"ListReport/ListingSubLedger"
    },
    {
        ttl:"Opening Ledger",
        link:"ListReport/ListingOpeningLedger"
    },
]
const product = [
{
    ttl:"Item Product", 
    link:""
},
{
    ttl:"Group", 
    link:""
},
{
    ttl:"Group 1", 
    link:""
},
{
    ttl:"Group 2", 
    link:""
},
{
    ttl:"Sub Group", 
    link:""
},
{
    ttl:"Unit", 
    link:""
},
{
    ttl:"Opeining Products", 
    link:""
},
{
    ttl:"Unit Conversion", 
    link:""
},
{
    ttl:"POS", 
    link:""
},
]
const billingTerm = [
    {
        ttl:"Purchase Term",
        lnk:""
    },
    {
        ttl:"Sales Term",
        lnk:""
    },
]
const areaAgent = [
    {
        ttl:"Area",
        lnk:""
    },
    {
        ttl:"Agent",
        lnk:""
    },
]
const others =[
{
        ttl:"Godown",
        lnk:""
    },
    {
        ttl:"Cost Center",
        lnk:""
    },
    {
        ttl:"Currency",
        lnk:""
    },
]
// SIDEBAR "MENU" TABLE HEADING 
let accntGrpHeading = [
    {
        heading:"Group Desc"
    },
      {
        heading:"Group Code"
    },
      {
        heading:"Schedule"
    },
      {
        heading:"Main Group"
    },
]
// 1ST PAGE TABLE DATA BEGINS 
let [tableData, setTableData] = useState([])
let [fetchedData, setfetchedData] = useState([])
async function getData(){
 try{

  let response = await fetch("http://myomsapi.globaltechsolution.com.np:802/api/MasterList/ProductListCustomer?DbName=MOBILEAP01")
  if(!response.ok){
    console.log("error")
  }
     const data = await response.json();
     setTableData(data.data)
     setfetchedData(data.data)
}catch(error){
  console.log(error)
}
}
useEffect(() => {
getData()
}, [])
// 1ST PAGE TABLE DATA ENDS 

// LEFT SIDE LIST DATA ON CLICK THEN SHOW DETAILS OF CLICKED LIST
  const [PDesc, setPDesc] = useState("")
  const [PCode, setPCode] = useState("")
  const [GrpName, setGrpName] = useState("")
// // UPDATE HEADING DETAILS OF LIST | UPPER LEFT SIDE IN 1ST LEFT SIDE TAB
  // Function to update GrpName
  const showDetailsHandle = (e) => {
    setPDesc(tableData[e.target.id].PDesc)
    setPCode(tableData[e.target.id].PCode)
    setGrpName(tableData[e.target.id].GroupName)
  };
// LEFT SIDE LIST DATA ON CLICK ENDS
// SEARCH 

let searchHandle = (e)=>{


    if(e.target.value.length===0){
setTableData(fetchedData)
    }
    else{
        let searchText = e.target.value.toLowerCase();
        // Filter tableData based on searchText
        const filteredData = tableData.filter(elem =>
            elem.PDesc.toLowerCase().includes(searchText)
        );
        setTableData(filteredData)
    }
   
}
// SEARCH CODE ENDS HERE 



 return <data.Provider value={{chartOfAccount, accntGrpHeading, product, billingTerm, areaAgent, others, tableData, showDetailsHandle, PDesc, PCode, GrpName, searchHandle}}>
 {props.children}
 </data.Provider>
}

export default Context