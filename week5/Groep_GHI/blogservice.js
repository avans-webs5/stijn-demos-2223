const express = require('express');
const mongoose = require('mongoose');

let app = express();
app.use(express.json()); //json 

mongoose.connect('mongodb://127.0.0.1:27017/GHI_Blog',);

let Blog = mongoose.model('blog', new mongoose.Schema({ username: String, content: String }));

/**
 * @swagger
 * components:
 *   schemas:
 *     Blog:
 *       type: object
 *       required:
 *         - name
 *         - content
 *       properties:
 *         id:
 *           type: mongodbId
 *           description: The auto-generated id of the blog
 *         name:
 *           type: string
 *           description: The name of your blog
 *         content:
 *           type: string
 *           description: the HTML body of the blog
 
 *       example:
 *         id: d5fE_asz
 *         title: The New Turing Omnibus
 *         author: Alexander K. Dewdney
 *         finished: false
 *         createdAt: 2020-03-10T04:05:06.157Z
 */
app.post('/blog', (req, res) => {

    let blog = new Blog(req.body);

    blog.save().then((blog) => {    
        send();
        res.send(blog);
    });

});

app.listen(3001, () => {
  console.log('Blog service started on port 3001');
});


function send(){
    
const amqp = require('amqplib');

const queue = 'GHI';
const text = 'Hello World!';

(async () => {
  let connection;
  try {
    connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    await channel.assertQueue(queue, { durable: false });

    // NB: `sentToQueue` and `publish` both return a boolean
    // indicating whether it's OK to send again straight away, or
    // (when `false`) that you should wait for the event `'drain'`
    // to fire before writing again. We're just doing the one write,
    // so we'll ignore it.
    channel.sendToQueue(queue, Buffer.from(text));
    console.log(" [x] Sent '%s'", text);
    await channel.close();
  }
  catch (err) {
    console.warn(err);
  }
  finally {
    if (connection) await connection.close();
  };
})();  
}