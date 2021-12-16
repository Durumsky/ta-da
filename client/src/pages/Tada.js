import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth";
import axios from "axios";
import Survey from "../components/Survey"
import Results from "../components/Results"

export default function Tada(props) {
  const { user } = useContext(AuthContext);
  const [showSurvey, setShowSurvey] = useState(true);
  const [createdTime, setCreatedTime] = useState();
  



  //
  const name=props.name 
  const lastName=props.lastName 
  const pronounce=props.pronounce
  const partnerName=props.partnerName 
  const partnerLastName=props.partnerLastName 
  const partnerPronounce=props.partnerPronounce
  const partnerID=props.partnerID
  const connected=props.connected







  const lastSevenDays = new Date().getTime() - (7 * 24 * 60 * 60 * 1000)


 if (lastSevenDays > createdTime) {
   console.log('the document is older than 7 days. Render next survey')
 } else if (createdTime > lastSevenDays){
   console.log('the document is younger than 7 days. Render the results')
 }

  



 

  return (
    <>
    {showSurvey ? (
< Survey changeShowStatus={setShowSurvey} name={name} lastName={lastName} pronounce={pronounce} connected={connected} partnerName={partnerName} partnerLastName={partnerLastName} partnerPronounce={partnerPronounce} partnerID={partnerID}/>
    ): (
< Results changeCreatedTime={setCreatedTime} name={name} lastName={lastName} pronounce={pronounce} connected={connected} partnerName={partnerName} partnerLastName={partnerLastName} partnerPronounce={partnerPronounce} partnerID={partnerID}/>
    )}
      
    
     
    </>
  );
}
