var express = require("express");
var router = express.Router();
const Message = require("../models/message");

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

(async () => {
  await mongoose.connect(process.env.DATABASE_URL);
})().catch((err) => console.log(err));

async function createMessage(req) {
  const messageDetail = {
    user: req.body.messageName,
    text: req.body.messageText,
    date: new Date().toLocaleDateString("en-us", {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    }),
  };

  const newMessage = new Message(messageDetail);
  await newMessage.save();
}

async function getMessages() {
  const messages = Message.find();

  return messages;
}

/* GET home page. */
router.get("/", async function (req, res) {
  res.render("index", {
    title: "Mini Messaging App",
    messages: await getMessages(),
  });
});

router.get("/new", function (req, res) {
  res.render("form");
});

router.post("/new", async function (req, res) {
  await createMessage(req);
  res.redirect("/");
});

module.exports = router;
