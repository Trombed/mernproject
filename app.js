const express = require('express');
const app = express();

app.get("/", (req, res) => {
    res.send('hello tester');
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Listening on port: ${port}`)
})