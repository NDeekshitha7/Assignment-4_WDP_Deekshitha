const express = require("express");
const Note = require("../models/note");
const router = express.Router();

router.get("/", (req, res) => {
  try {
    const note = Note.getNote();
    res.send(note);
  } catch (err) {
    res.status(401).send({ message: "error in note" });
  }
});

module.exports = router;
