import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth";
import axios from "axios";

export default function Survey(props) {
  const { user } = useContext(AuthContext);
  const [listenTo, setListenTo] = useState(1);
  const [beingListened, setBeingListened] = useState(1);
  const [listenInterest, setListenInterest] = useState("yes");
  const [sexScore, setSexScore] = useState(1);
  const [nowsRank, setNowsRank] = useState(1);
  const [momentDescription, setMomentDescription] = useState("");
  const [personalSpace, setPersonalSpace] = useState("yes");
  const [pronoun, setPronoun] = useState("");
  const [partnerPronoun, setPartnerPronoun] = useState("");
  const [partnerDeterminant, setPartnerDeterminant] = useState("");
  const username = user.username;
  const partnerID = props.partnerID



  function checkPronoun(pronounce) {
    if (pronounce !== "") {
      if (pronounce === "She/her") {
        setPronoun("she");
      } else if (pronounce === "He/his") {
        setPronoun("he");
      } else if (pronounce === "They/their") {
        setPronoun("they");
      }
    }
  }
  useEffect(() => {
checkPronoun(props.pronounce)
  }, [])

  function checkPartnerPronoun(partnerPronounce) {
    if (partnerPronounce !== "") {
      if (partnerPronounce === "She/her") {
        setPartnerPronoun("she");
      } else if (partnerPronounce === "He/his") {
        setPartnerPronoun("he");
      } else if (partnerPronounce === "They/their") {
        setPartnerPronoun("they");
      }
    }
  }
  useEffect(() => {
checkPartnerPronoun(props.partnerPronounce)
  }, [])

  function checkPartnerDeterminant(partnerPronounce) {
    if (partnerPronounce !== "") {
      if (partnerPronounce === "She/her") {
        setPartnerDeterminant("her");
      } else if (partnerPronounce === "He/his") {
        setPartnerDeterminant("his");
      } else if (partnerPronounce === "They/their") {
        setPartnerDeterminant("their");
      }
    }
  }
  useEffect(() => {
checkPartnerDeterminant(props.partnerPronounce)
  }, [])
  

  const handleListenTo = (e) => {
    setListenTo(e.target.value);
  };
  const handleBeingListened = (e) => {
    setBeingListened(e.target.value);
  };
  const handleListenInterest = (e) => {
    setListenInterest(e.target.value);
  };
  const handleSexScore = (e) => {
    setSexScore(e.target.value);
  };
  const handleNowsRank = (e) => {
    setNowsRank(e.target.value);
  };
  const handleMomentDescription = (e) => {
    setMomentDescription(e.target.value);
  };
  const handlePersonalSpace = (e) => {
    setPersonalSpace(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.changeShowStatus(false);

    axios
      .post("/submitSurvey", {
        username,
        listenTo,
        beingListened,
        listenInterest,
        sexScore,
        nowsRank,
        momentDescription,
        personalSpace,
      })
      .then(() => {})
      .catch((err) => console.log(err.data));
  };

  function checkSurvey(){
    axios
    .get(`/checkSurvey/${user.username}`)
    .then((response) => {
        props.changeCreatedTime(response.data.createdTime)
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
        props.changePartnerCreatedTime(response.data.createdTime)
  
    })
    .catch((err) => console.log(err.data));
  }

  useEffect(() => {
    checkPartnerSurvey()
  }, [])

  return (
    <div className="form-container">
      <h2>The Survey of the Week </h2>
      <span>
        Score this questions to compare your views with those of <b>{props.partnerName} {props.partnerLastName}</b>
      </span>
      <br></br>
      <br></br>
      <form onSubmit={handleSubmit}>
      <div className="form-container">
        <h4>Communication</h4>
          <div>
            <div>
        <label className="label-survey">
          Of course you listened to <b>{props.partnerName}</b> this week, but
          how much?
        </label>
        <select onChange={handleListenTo} value={listenTo}>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </select>
        </div>
        </div>
        <br></br>
        <div>
        <label className="label-survey">
          And <b>{partnerPronoun}</b> to you?
        </label>
        <select onChange={handleBeingListened} value={beingListened}>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </select>
        </div>

        {/* <input type="radio" /> 1 */}
        <br></br>
        <div>
        <label className="label-survey">
          By hearing to <b>{props.partnerName}</b>, did you get any idea of
          something nice you could do to <b>{partnerDeterminant}</b>?
        </label>
        <select onChange={handleListenInterest} value={listenInterest}>
          <option>Yes!</option>
          <option>Not this time</option>
        </select>
        </div>

        <h4>Team Time</h4>
        <div>
        <label className="label-survey">It's time for a weekly sex score:</label>
        <select onChange={handleSexScore} value={sexScore}>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </select>
       </div>
        <br></br>
       
        <div>
        <label className="label-survey">
          If the old and almost dying version of yourself would look back into
          this week, how would <b>{pronoun}</b> rank the use you did of the NOWs with <b>{props.partnerName}</b>?
        </label>
        <select onChange={handleNowsRank} value={nowsRank}>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </select>
        </div>
        <br></br>
        
        <div>
        <label className="label-survey">So shortly as you can: one moment you very much liked:</label>
        <br></br>
        </div>
        <textarea
          type="text"
          rows="5"
          onChange={handleMomentDescription}
          value={momentDescription}
        ></textarea>
        
        <h4>Me Time</h4>
        <div>
        <label className="label-survey">
          Do you feel that you got enough space and time to pursue your personal
          hobbies/activities?
        </label>
        <select onChange={handlePersonalSpace} value={personalSpace}>
          <option>Yes</option>
          <option>Could have been more</option>
        </select>
        </div>
        <br></br>
        <button className="btn-general" style={{ width: 80}} type="submit">Send!</button>
  
        </div>
      </form>
      </div>
  );
}
