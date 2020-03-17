const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const passport = require("passport");
const Meme = require("../../models/Meme");


// router.get("/test", (req, res) => {
//     res.json({msg: "This is the tweet route"});
// });

router.get("/", (req, res) => {
    Meme
        .find()
        .sort({ date: -1 })
        .then(memes => res.json(memes))
        .catch(err => res.status(400).json(err));
})

router.get("/users/:user_id", (req, res) => {
    Meme
        .find({ user: req.params.user_id })
        .then(memes => res.json(memes))
        .catch(err => res.status(400).json(err));
})

router.get("/:id", (req, res) => {
    Meme
        .findById(req.params.id)
        .then(meme => res.json(meme))
        .catch(err => res.status(400).json(err));
})

router.post("/",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        
        const newMeme = new Meme({
            user: req.user.id,
            text: req.body.text,
            category: req.body.category
            // text field might be changed in the future
        });
        newMeme.save()
            .then(meme => res.json(meme));
    }
)

module.exports = router;