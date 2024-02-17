const express = require('express');
const app = express();

Port = 4000;

app.listen(Port, () => {
    console.log(`server is created at port no. ${Port}`)
});