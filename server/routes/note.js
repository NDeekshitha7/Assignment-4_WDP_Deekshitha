const express = require('express');
const User = require('../models/note');
const router = express.Router();
router
.post('/getnote', async (req, res) => {
    try {
      let noteget = await User.getnote(req.body);
      res.send(noteget)
    } catch(err) {
      res.status(401).send({message: err.message});
    }
  })

  .post('/creatingnote', async (req, res) => {
    try {
      let notecreates = await User.creatingnote(req.body);
      res.send(notecreates)
    } catch(err) {
      res.status(401).send({message: err.message});
    }
  })
  

  .post('/deletingnote', async (req, res) => {
    try {
      let noteupdates = await User.deletingnote(req.body);
      res.send(noteupdates)
    } catch(err) {
      res.status(401).send({message: err.message});
    }
  })
  .post('/editingnote', async (req, res) => {
    try {
      let noteedit= await User.editingnote(req.body);
      res.send(noteedit)
    } catch(err) {
      res.status(401).send({message: err.message});
    }
  })

  
module.exports=router;