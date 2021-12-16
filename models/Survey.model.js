const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const surveySchema = new Schema(
  {
    username: String,
    listenTo: Number,
    beingListened: Number,
    listenInterest: String,
    sexScore: Number,
    nowsRank: Number,
    momentDescription: String,
    personalSpace: String,
   },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Survey = model("Survey", surveySchema);

module.exports = Survey;