const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const secretSchema = new Schema(
  {
    username: String,
    secretTitle: String,
    secret: String,
   },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Secret = model("Secret", secretSchema);

module.exports = Secret;