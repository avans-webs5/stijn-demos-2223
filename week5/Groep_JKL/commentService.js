const express = require('express');
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/groep_jkl_comment');

let Comment = mongoose.model('comment', new mongoose.Schema({ username: String, content: String }));

let app = express();
app.use(express.json()); //json 


listenToUpdates();

app.post('/comment', (req, res) => {

    //Validatie ??
    let comment = new Comment(req.body);

    comment.save().then((comment) => {
            res.send(200, comment);
    });

});

app.listen(3002);

function listenToUpdates()
{
   

    const amqp = require('amqplib');

    const queue = 'hello';
    
    (async () => {
      try {
        const connection = await amqp.connect('amqp://localhost');
        const channel = await connection.createChannel();
    
        process.once('SIGINT', async () => { 
          console.log('DIE DIE DIE ');
          await channel.close();
          await connection.close();
        });
    
        await channel.assertQueue(queue, { durable: false });
        await channel.consume(queue, (message) => {
          console.log(" [x] Received '%s'", message.content.toString());

          //Database nog bijwekeren

        }, { noAck: true });
    
        console.log(' [*] Waiting for messages. To exit press CTRL+C');
      } catch (err) {
        console.warn(err);
      }
    })();


}