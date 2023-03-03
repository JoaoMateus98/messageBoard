var express = require("express");
var router = express.Router();

const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date().toLocaleDateString("en-us", {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    }),
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date().toLocaleDateString("en-us", {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    }),
  },
];

/* GET home page. */
router.get("/", function (req, res) {
  res.render("index", { title: "Mini Messaging App", messages: messages });
});

router.get("/new", function (req, res) {
  res.render("form");
});

router.post("/new", function (req, res) {
  messages.push({
    text: req.body.messageText,
    user: req.body.messageName,
    added: new Date().toLocaleDateString("en-us", {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    }),
  });
  res.redirect("/");
});

module.exports = router;
