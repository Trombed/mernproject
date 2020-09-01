const express = require('express');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
const db = require("./config/keys").mongoURI;
const users = router.use(require('./routes/api/users'));
const memes = router.use(require('./routes/api/memes'));


// const User = require('./models/User');
// const Meme = require('./models/Meme');
const bodyParser = require('body-parser');
const passport = require('passport');







app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", req.header('Origin'));
    res.header("Access-Control-Allow-Credentials", true);
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
  });

app.use(passport.initialize());
require('./config/passport')(passport);


const path = require('path');

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('frontend/build'));
    app.get('/', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    })
  }

mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.log(err));


app.use(bodyParser.urlencoded({
    extended: false
}));

// app.use(bodyParser.json());
app.use(bodyParser.json({limit: '100mb'}))

app.get("/", (req, res) => {

    res.send("Hello world~~~ root page");
});

app.get("/createMeme", (req, res) => {
    res.send("modal to create meme");
});

app.get("/login", (req, res) => {
    res.send("modal to login users");
});

app.get("/signup", (req, res) => {
    res.send("modal to signup users");
});

app.use('/api/users', users);
app.use('/api/memes', memes);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Backend listening on port: ${port}`)
})