const router = require("express").Router();
const User = require("../models/User.model");
const Survey = require("../models/Survey.model");
const ObjectId = require("mongoose").Types.ObjectId;

router.post("/submitSurvey", (req, res, next) => {
  const username = req.body.username;

  Survey.create({
    username: req.body.username,
    listenTo: req.body.listenTo,
    beingListened: req.body.beingListened,
    listenInterest: req.body.listenInterest,
    sexScore: req.body.sexScore,
    nowsRank: req.body.nowsRank,
    momentDescription: req.body.momentDescription,
    personalSpace: req.body.personalSpace,
  }).then(() => {
    Survey.findOneAndUpdate(
      { username },
      { momentDescription: "update the last document" }
    ).sort({ date: -1 });
  });
});

router.get("/checkSurvey/:id", (req, res, next) => {
  const username = req.params.id;
  Survey.find({ username })
    .sort({ _id: -1 })
    .limit(1)
    .then((newestEntry) => {
      const createdAt = newestEntry[0].createdAt;
      const createdTime = newestEntry[0].createdAt.getTime();
      const day = createdAt.getDate();
      const month = createdAt.getMonth();
      const year = createdAt.getFullYear();
      const listenTo = newestEntry[0].listenTo;
      const beingListened = newestEntry[0].beingListened;
      const listenInterest = newestEntry[0].listenInterest;
      const sexScore = newestEntry[0].sexScore;
      const nowsRank = newestEntry[0].nowsRank;
      const momentDescription = newestEntry[0].momentDescription;
      const personalSpace = newestEntry[0].personalSpace;
      res.status(200).json({
        createdTime,
        day,
        month,
        year,
        listenTo,
        beingListened,
        listenInterest,
        sexScore,
        nowsRank,
        momentDescription,
        personalSpace,
      });
    })
    .catch((err) => console.log(err));
});

router.post("/checkPartnerSurvey/", (req, res, next) => {
  const partnerID = req.body.partnerID;

  User.findOne({ _id: partnerID })
    .then((partner) => {
      const partnerUsername = partner.username;
      console.log(partnerUsername, "hola");
      Survey.find({ partnerUsername })
        .sort({ _id: -1 })
        .limit(1)
        .then((newestPartnerEntry) => {
          const createdAt = newestPartnerEntry[0].createdAt;
          const createdTime = newestPartnerEntry[0].createdAt.getTime();
          const day = createdAt.getDate();
          const month = createdAt.getMonth();
          const year = createdAt.getFullYear();
          const listenTo = newestPartnerEntry[0].listenTo;
          const beingListened = newestPartnerEntry[0].beingListened;
          const listenInterest = newestPartnerEntry[0].listenInterest;
          const sexScore = newestPartnerEntry[0].sexScore;
          const nowsRank = newestPartnerEntry[0].nowsRank;
          const momentDescription = newestPartnerEntry[0].momentDescription;
          const personalSpace = newestPartnerEntry[0].personalSpace;

          res.status(200).json({
            createdTime,
            day,
            month,
            year,
            listenTo,
            beingListened,
            listenInterest,
            sexScore,
            nowsRank,
            momentDescription,
            personalSpace,
          });
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
