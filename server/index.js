const express = require('express');
const path = require('path');
const pgClient = require('./db');
const index = express();
const io = require('socket.io').listen(9000)
const port = 8000
const cors = require('cors')

//require the auto updater of position
let updatePosition = require('./personmove');



// postrges notify and sockest.io emmet
pgClient.connect((err, client) => {

    client.query('LISTEN new_position');

    io.sockets.on('connection', function (socket) {


        client.on('notification', function (msg) {
            let payload = JSON.parse(msg.payload);
            socket.emit('update', {message: payload});

        });

    });
});





//Cors
index.use(cors())


//json parser and url encoder
index.use(express.json());
index.use(express.urlencoded({ extended: true }));


//import all router
const personsRouter = require('./routes/persons');
const positionRouter = require('./routes/position');
//static react folder
//index.use(express.static(path.join(__dirname, '../client/build')));

//api routes
index.use('/api/persons', personsRouter);
index.use('/api/position', positionRouter);

//send to the react index
// index.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname,'../client/build/index.html'));
// });


setInterval(updatePosition, 60000);

index.listen(port, () => {
    console.log(`running on port ${port}.`)
})

