const router = require("express").Router();
const User = require("../models/User.model");
const ObjectId = require("mongoose").Types.ObjectId;

router.post("/connect", (req, res, next) => {
  //console.log(req.body.user._id, req.body.partnerID);
  const username = req.body.user.username;
  const partnerID = req.body.partnerID;

  if (ObjectId.isValid(partnerID)) {
    User.findOne({ _id: partnerID })
      .then((foundPartner) => {
        if (!foundPartner) {
          console.log("not found");
          res
            .status(400)
            .json({ message: "The ID you provided was not found" });
          return;
        } else {
          console.log("found");
          res
            .status(200)
            .json({ foundPartner: true, partnerName: foundPartner.username });
          return;
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
        return;
      });
  } else {
    res.status(400).json({ message: "You didn't provide a correct ID" });
  }
});

router.post("/acceptConnect", (req, res, next) => {
  const username = req.body.user.username;
  const userID = req.body.user._id;
  const partnerID = req.body.partnerID;

  User.findOneAndUpdate({ username }, { partnerID: partnerID }, { new: true })
    .then((user) => {
      const connected = user.connected;
      User.findOne({ _id: partnerID })
        .then((foundPartner) => {
          if (foundPartner.partnerID === userID) {
            console.log("ids crossed");
            User.findOneAndUpdate(
              { username },
              { connected: true },
              { new: true }
            )
              .then(() => {
                User.findOneAndUpdate(
                  { _id: partnerID },
                  { connected: true },
                  { new: true }
                )
                  .then(() => {
                    res.status(200).json({ userConnected: connected });
                  })
                  .catch((err) => console.log(err));
              })
              .catch((err) => console.log(err));
          }
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});

router.post("/connectCheck", (req, res, next) => {
  //console.log('/connectCheck works')
  const username = req.body.username;
  User.findOne({ username })
    .then((foundUser) => {
      const connected = foundUser.connected;
      res.status(200).json({ userConnected: connected });
    })
    .catch((err) => console.log(err));
});

router.post("/connectionInfo", (req, res, next) => {
  const username = req.body.username;
  User.findOne({ username })
    .then((foundUser) => {
      const partnerID = foundUser.partnerID;
      const connected = foundUser.connected;
      const name = foundUser.name;
      const lastName = foundUser.lastName;
      const pronounce = foundUser.pronounce;


      if (ObjectId.isValid(partnerID)){
        User.findOne({ _id: partnerID })
        .then((foundPartner) => {
          const partnerName = foundPartner.name;
          const partnerLastName = foundPartner.lastName;
          const partnerPronounce = foundPartner.pronounce;
          res
            .status(200)
            .json({
              partnerID: partnerID,
              partnerName: partnerName,
              partnerLastName: partnerLastName,
              partnerPronounce: partnerPronounce,
              name: name,
              lastName: lastName,
              pronounce: pronounce,
              connected: connected,
            });
        })
        .catch((err) => console.log(err));
      }
      
    })
    .catch((err) => console.log(err));
});

router.post("/deleteConnection", (req, res, next) => {
  const username = req.body.user.username
  const partnerName = req.body.partnerName;
  User.findOneAndUpdate(
    { username },
    { partnerID: "", connected: false },
    { new: true }
  )
    .then(() => {
      console.log(partnerName)
      User.findOneAndUpdate(
        { partnerName },
        { partnerID: "", connected: false },
        { new: true }
      )
        .then(() => {
          res.status(200).json('users were unconnected');
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
  
});

router.post("/deleteAccount", (req, res, next) => {
  const userID = req.body._id;
  User.findByIdAndRemove({_id: userID})
  .then(()=>{})
  .catch(err => console.log(err))
});

module.exports = router;
