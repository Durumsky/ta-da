const router = require("express").Router();
const User = require("../models/User.model");

router.post("/connect", (req, res, next) => {

  console.log(req.body.user._id, req.body.partnerID);
  const username = req.body.user.username;
  const partnerID = req.body.partnerID;

  User.findOne({ _id: partnerID })
    .then((foundPartner) => {
      if (!foundPartner) {
        console.log("not found");
        res.status(400).json({ message: "The ID you provided was not found" });
        return;
      } else {
        console.log("found");
        res.status(200).json({ foundPartner: true });
        return;
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Internal Server Error" });
      return;
    });
});

router.post("/acceptConnect", (req, res, next) => {
  const username = req.body.user.username;
  const partnerID = req.body.partnerID;

  User.findOneAndUpdate({ username }, { partnerID: partnerID }, { new: true })
    .then((user) => {
      if (user._id === partnerID) {
        User.findOneAndUpdate({ username }, { connected: true }, { new: true })
          .then(() => {
            
            User.findOneAndUpdate(
              { _id: partnerID },
              { connected: true },
              { new: true }
            )
              .then(() => {
                res.status(200).json({ userConnected: userConnected });
              })
              .catch((err) => console.log(err));
          })
          .catch((err) => console.log(err));
      }
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

module.exports = router;
