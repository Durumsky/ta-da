import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth";
import axios from "axios";
import Survey from "../components/Survey"
import Results from "../components/Results"
import Footer from "../components/Footer"

export default function Tada(props) {
  const { user } = useContext(AuthContext);
  const [showSurvey, setShowSurvey] = useState(true);
  const [createdTime, setCreatedTime] = useState();
  const [partnerCreatedTime, setPartnerCreatedTime] = useState();
  



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


 if (lastSevenDays > createdTime && lastSevenDays > partnerCreatedTime) {
   console.log('Both documents are older than 7 days. Render next survey')
 } else if (lastSevenDays > createdTime){
    console.log('The partner didnt answer yet')
 } else if (createdTime > lastSevenDays && partnerCreatedTime > lastSevenDays) {
   console.log('Both documents are younger than 7 days. Render the results')
 }

  



 

  return (
    <>
    {showSurvey ? (
< Survey changeShowStatus={setShowSurvey} name={name} lastName={lastName} pronounce={pronounce} connected={connected} partnerName={partnerName} partnerLastName={partnerLastName} partnerPronounce={partnerPronounce} partnerID={partnerID}/>
    ): (
< Results changeCreatedTime={setCreatedTime} changePartnerCreatedTime={setPartnerCreatedTime} name={name} lastName={lastName} pronounce={pronounce} connected={connected} partnerName={partnerName} partnerLastName={partnerLastName} partnerPronounce={partnerPronounce} partnerID={partnerID}/>
    )}
      
    < Footer />
     
    </>
  );
}
