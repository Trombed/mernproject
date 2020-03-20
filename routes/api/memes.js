const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const passport = require("passport");
const Meme = require("../../models/Meme");
const Like = require('../../models/Like');


// router.get("/test", (req, res) => {
//     res.json({msg: "This is the tweet route"});
// });

router.get("/", (req, res) => {
    Meme
        .find()
        .limit(3)
        .sort({ date: -1 })
        .populate('user', '-password')
        .then(memes => res.json(memes))
        .catch(err => res.status(400).json(err));
})

// 5e72ccdae837d562bf2eb967 - id

router.get("/users/:user_id", (req, res) => {
    Meme
        .find({ user: req.params.user_id })
        .then(memes => res.json(memes))
        .catch(err => res.status(400).json(err));
})

router.get("/:id", (req, res) => {
    Meme
        .findById(req.params.id)
        .populate('user', '-password')
        .populate('likes', '-password')
        .then(meme => res.json(meme))
        .catch(err => res.status(400).json(err));
})

// extracting id from the route
router.param('id', function (req, res, next, id) {
    req.id = id;
    next();
})

// route to like a specific meme for the current user
router.post("/:id/like", 
passport.authenticate("jwt", { session: false }),
(req, res) => {
    
    Meme.findByIdAndUpdate(req.id,
        { "$push": { "likes": req.user.id } },
        // { "$push": { "likes": '5e72d13a602b3566600668ac'} },
        { "new": true, "upsert": true },
        function (err, meme) {
            if (err) return res.status(500).send("There was a problem creating a like.");
            res.status(200).send("Like was added!");
        }
    );
})

// delete (unlike) a meme

router.delete("/:id/like",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {

        Meme.findByIdAndUpdate(req.id,
            { "$pull": { "likes": req.user.id } },
            // { "$pull": { "likes": '5e72d13a602b3566600668ac' } },
            { "new": true, "upsert": true },
            function (err, meme) {
                if (err) return res.status(500).send("There was a problem deleting a like.");
                res.status(200).send("Like was deleted successfully!");
            }
        );
    })


router.delete('/:id', (req, res) => {
    Meme.findByIdAndRemove(req.params.id, function (err, meme) {
        if (err) return res.status(500).send("There was a problem deleting the meme.");
        res.status(200).send("Meme was deleted.");
    });
});

router.post("/",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        // meme id to test delete 5e740d19ba9a128406f85ae7
        const newMeme = new Meme({
            user: req.user.id,
            // user: '5e72d13a602b3566600668ac',
            image: req.body.image
        });
        newMeme.save()
            .then(meme => res.json(meme));
    }
)

module.exports = router;