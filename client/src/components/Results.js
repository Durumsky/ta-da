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
  const [personalSpace, setPersonalSpace] = useState('yes');
  //survey data from partnerName
  //survey data from user
  const [partnerCreatedTime, setPartnerCreatedTime] = useState();
  const [partnerListenTo, setPartnerListenTo] = useState();
  const [partnerBeingListened, setPartnerBeingListened] = useState();
  const [partnerListenInterest, setPartnerListenInterest] = useState();
  const [partnerSexScore, setPartnerSexScore] = useState();
  const [partnerNowsRank, setPartnerNowsRank] = useState();
  const [partnerMomentDescription, setPartnerMomentDescription] = useState();
  const [partnerPersonalSpace, setPartnerPersonalSpace] = useState('yes');

  //
  const name = props.name;
  const lastName = props.lastName;
  const pronounce = props.pronounce;
  const partnerName = props.partnerName;
  const partnerLastName = props.partnerLastName;
  const partnerPronounce = props.partnerPronounce;
  const connected = props.connected;
  const partnerID = props.partnerID;

  function checkSurvey() {
    axios
      .get(`/checkSurvey/${user.username}`)
      .then((response) => {
        props.changeCreatedTime(response.data.createdTime);
        setListenTo(response.data.listenTo);
        setBeingListened(response.data.beingListened);
        setListenInterest(response.data.listenInterest);
        setSexScore(response.data.sexScore);
        setNowsRank(response.data.nowsRank);
        setMomentDescription(response.data.momentDescription);
        setPersonalSpace(response.data.personalSpace);
      })
      .catch((err) => console.log(err.data));
  }

  useEffect(() => {
    checkSurvey();
  }, []);

  function checkPartnerSurvey() {
    axios
      .post("/checkPartnerSurvey/", { partnerID })
      .then((response) => {
        props.changePartnerCreatedTime(response.data.createdTime);
        setPartnerListenTo(response.data.listenTo);
        setPartnerBeingListened(response.data.beingListened);
        setPartnerListenInterest(response.data.listenInterest);
        setPartnerSexScore(response.data.sexScore);
        setPartnerNowsRank(response.data.nowsRank);
        setPartnerMomentDescription(response.data.momentDescription);
        setPartnerPersonalSpace(response.data.personalSpace);
      })
      .catch((err) => console.log(err.data));
  }

  useEffect(() => {
    checkPartnerSurvey();
  }, []);

  return (
    <>
      <h1>Survey Results</h1>
      <p>How much you thought to have listened to {partnerName}?</p>
      <div className="bar-total" style={{ width: 5 * 150 }}>
        <div
          className="user-color"
          style={{ width: listenTo * 150, height: 20 }}
        >
          {" "}
          your opinion: {listenTo}/5
        </div>
      </div>
      <br></br>
      <div className="bar-total" style={{ width: 5 * 150 }}>
        <div
          className="partner-color"
          style={{ width: partnerBeingListened * 150, height: 20 }}
        >
          {" "}
          {partnerName}'s opinion: {partnerBeingListened}/5
        </div>
      </div>
      <br></br>
      <p>How much you thought that {partnerName} listened to you?</p>
      <div className="bar-total" style={{ width: 5 * 150 }}>
        <div
          className="user-color"
          style={{ width: beingListened * 150, height: 20 }}
        >
          {" "}
          your opinion: {beingListened}/5
        </div>
      </div>
      <br></br>
      <div className="bar-total" style={{ width: 5 * 150 }}>
        <div
          className="partner-color"
          style={{ width: partnerListenTo * 150, height: 20 }}
        >
          {" "}
          {partnerName}'s opinion: {partnerListenTo}/5
        </div>
      </div>
      <br></br>
      <p>
        By hearing each other, did you get an idea of something nice to the
        other?
      </p>
      <span className="user-color" style={{ height: 20 }}>
        {" "}
        {listenInterest}
      </span>
      <span className="partner-color" style={{ height: 20 }}>
        {" "}
        {partnerListenInterest}
      </span>
      <br></br>
      <p>Your weekly sex score:</p>
      <div className="bar-total" style={{ width: 5 * 150 }}>
        <div
          className="user-color"
          style={{ width: sexScore * 150, height: 20 }}
        >
          {" "}
          {name} {sexScore}/5
        </div>
      </div>
      <br></br>
      <div className="bar-total" style={{ width: 5 * 150 }}>
        <div
          className="partner-color"
          style={{ width: partnerSexScore * 150, height: 20 }}
        >
          {" "}
          {partnerName} {partnerSexScore}/5
        </div>
      </div>
      <br></br>
      <p>
        How would your old and almost dying version of you rank your use of the
        NOWs with each other:
      </p>
      <div className="bar-total" style={{ width: 5 * 150 }}>
        <div
          className="user-color"
          style={{ width: nowsRank * 150, height: 20 }}
        >
          {" "}
          {name} {nowsRank}/5
        </div>
      </div>
      <br></br>
      <div className="bar-total" style={{ width: 5 * 150 }}>
        <div
          className="partner-color"
          style={{ width: partnerNowsRank * 150, height: 20 }}
        >
          {" "}
          {partnerName} {partnerNowsRank}/5
        </div>
      </div>
      <br></br>
      <p>Your moment of the week:</p>
      <div className="user-color" style={{ padding: 3 }}>
        {" "}
        {momentDescription}
      </div>
      <br></br>
      <div className="partner-color" style={{ padding: 3 }}>
        {" "}
        {partnerMomentDescription}
      </div>
      <br></br>
      <p>
        Did you felt enought space and time for your personal
        hobbies/activities:
      </p>
      <span className="user-color" style={{ height: 20 }}>
        {" "}
        {personalSpace}
      </span>
      <span className="partner-color" style={{ height: 20 }}>
        {" "}
        {partnerPersonalSpace}
      </span>
    </>
  );
}
