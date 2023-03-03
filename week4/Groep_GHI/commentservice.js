const express = require('express');
const mongoose = require('mongoose');

let app = express();

mongoose.connect('mongodb://127.0.0.1:27017/GHI_Comment');

//Ga maar luisteren
Listen();

let Comment = mongoose.model('comment', new mongoose.Schema({ username: String, message: String }));

app.post('/comment', (req, res) => {

    let comment = new Comment(req.body);

    //if blog excsists

    comment.save().then((comment) => {    
        res.send(comment);
    });

});

app.listen(3002);
console.log('Blog service started on port 3001');

function Listen()
{
    
const amqp = require('amqplib');

const queue = 'GHI';

(async () => {
  try {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    process.once('SIGINT', async () => { 
      await channel.close();
      await connection.close();
    });

    await channel.assertQueue(queue, { durable: false });
    await channel.consume(queue, (message) => {
      console.log(" [x] Received '%s'", message.content.toString());
    }, { noAck: true });

    console.log(' [*] Waiting for messages. To exit press CTRL+C');
  } catch (err) {
    console.warn(err);
  }
})();
}