import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth";
import axios from "axios";

export default function Results(props) {
    const { user } = useContext(AuthContext);
    const [showSurvey, setShowSurvey] = useState(true);
    //survey data from user
    const [createdTime, setCreatedTime] = useState();
    const [day, setDay] = useState();
    const [month, setMonth] = useState();
    const [year, setYear] = useState();
    const [listenTo, setListenTo] = useState();
    const [beingListened, setBeingListened] = useState();
    const [listenInterest, setListenInterest] = useState();
    const [sexScore, setSexScore] = useState();
    const [nowsRank, setNowsRank] = useState();
    const [momentDescription, setMomentDescription] = useState();
    const [personalSpace, setPersonalSpace] = useState();
    //survey data from partnerName
    //survey data from user
    const [partnerCreatedTime, setPartnerCreatedTime] = useState();
    const [partnerListenTo, setPartnerListenTo] = useState();
    const [partnerBeingListened, setPartnerBeingListened] = useState();
    const [partnerListenInterest, setPartnerListenInterest] = useState();
    const [partnerSexScore, setPartnerSexScore] = useState();
    const [partnerNowsRank, setPartnerNowsRank] = useState();
    const [partnerMomentDescription, setPartnerMomentDescription] = useState();
    const [partnerPersonalSpace, setPartnerPersonalSpace] = useState();
  

  
    //
    const name=props.name 
    const lastName=props.lastName 
    const pronounce=props.pronounce
    const partnerName=props.partnerName 
    const partnerLastName=props.partnerLastName 
    const partnerPronounce=props.partnerPronounce
    const connected=props.connected
    const partnerID=props.partnerID
   
  
    function checkSurvey(){
      axios
      .get(`/checkSurvey/${user.username}`)
      .then((response) => {
          setCreatedTime(response.data.createdTime)
          setListenTo(response.data.listenTo)
          setBeingListened(response.data.beingListened)
          setListenInterest(response.data.listenInterest)
          setSexScore(response.data.sexScore)
          setNowsRank(response.data.nowsRank)
          setMomentDescription(response.data.momentDescription)
          setPersonalSpace(response.data.personalSpace)
      })
      .catch((err) => console.log(err.data));
    }
  
    useEffect(() => {
      checkSurvey()
    }, [])


    function checkPartnerSurvey(){
        axios
        .post("/checkPartnerSurvey/", {partnerID})
        .then((response) => {
          console.log(response.data)
            setPartnerCreatedTime(response.data.createdTime)
            setPartnerListenTo(response.data.listenTo)
            setPartnerBeingListened(response.data.beingListened)
            setPartnerListenInterest(response.data.listenInterest)
            setPartnerSexScore(response.data.sexScore)
            setPartnerNowsRank(response.data.nowsRank)
            setPartnerMomentDescription(response.data.momentDescription)
            setPartnerPersonalSpace(response.data.personalSpace)
        })
        .catch((err) => console.log(err.data));
      }
    
      useEffect(() => {
        checkPartnerSurvey()
      }, [])

      console.log('user:', createdTime, listenTo, beingListened, listenInterest, sexScore, nowsRank, momentDescription, personalSpace)
      console.log('partner:', partnerCreatedTime, partnerListenTo, partnerBeingListened, partnerListenInterest, partnerSexScore, partnerNowsRank, partnerMomentDescription, partnerPersonalSpace)
  
    
    return (
        <>
        <h1>Survey Results</h1>
        <p>How much you thought to have listened to {partnerName}?</p>
        <div style={{backgroundColor: 'green', width: listenTo*150, height: 20}}>  your opinion: {listenTo}/5</div>
        <br></br>
        <div style={{backgroundColor: 'yellow', width: partnerBeingListened*150, height: 20}}>  {partnerName}'s opinion: {partnerBeingListened}/5</div>
        <br></br>
        <p>How much you thought that {partnerName} listened to you?</p>
        <div style={{backgroundColor: 'green', width: beingListened*150, height: 20}}>  your opinion</div>
        <br></br>
        <div style={{backgroundColor: 'yellow', width: partnerListenTo*150, height: 20}}>  {partnerName}'s opinion</div>
        <br></br>
        <p>By hearing each other, did you get an idea of something nice to the other?</p>
        <span style={{backgroundColor: 'green', height: 20}}>  {listenInterest}</span>
        <span style={{backgroundColor: 'yellow', height: 20}}>  {partnerListenInterest}</span>
        <br></br>
        <p>Your weekly sex score:</p>
        <div style={{backgroundColor: 'green', width: setSexScore*150, height: 20}}>  {name}</div>
        <br></br>
        <div style={{backgroundColor: 'yellow', width: partnerSexScore*150, height: 20}}>  {partnerName}</div>
        <br></br>
        <p>How would your old and almost dying version of you rank your use of the NOWs with each other:</p>
        <div style={{backgroundColor: 'green', width: nowsRank*150, height: 20}}>  {name}</div>
        <br></br>
        <div style={{backgroundColor: 'yellow', width: partnerNowsRank*150, height: 20}}>  {partnerName}</div>
        <br></br>
        <p>Your moment of the week:</p>
        <div style={{backgroundColor: 'green'}}>  {momentDescription}</div>
        <br></br>
        <div style={{backgroundColor: 'yellow'}}>  {partnerMomentDescription}</div>
        <br></br>
        <p>Did you felt enought space and time for your personal hobbies/activieties:</p>
        <span style={{backgroundColor: 'green', height: 20}}>  {personalSpace}</span>
        <span style={{backgroundColor: 'yellow', height: 20}}>  {personalSpace}</span>
        </>
    )
}
