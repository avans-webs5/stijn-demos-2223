const express = require('express');
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/groep_jkl_blog');

let Blog = mongoose.model('blog', new mongoose.Schema({ username: String, content: String }));

let app = express();
app.use(express.json()); //json 

app.post('/blog', (req, res) => {

    let blog = new Blog(req.body);

    blog.save().then((blog) => {
            
            updateOtherServices(blog);//??
                
            res.send( blog);
    });

});

app.listen(3001, () => {
    console.log('Blog service listening on port 3001');
});

function updateOtherServices(blog)
{
    const amqp = require('amqplib');

    const queue = 'newblog';

    (async () => {
    let connection;
    try {
        connection = await amqp.connect('amqp://localhost:5672');
        const channel = await connection.createChannel();

        //?? Wat doet dit?
        await channel.assertQueue(queue, { durable: false });

        // NB: `sentToQueue` and `publish` both return a boolean
        // indicating whether it's OK to send again straight away, or
        // (when `false`) that you should wait for the event `'drain'`
        // to fire before writing again. We're just doing the one write,
        // so we'll ignore it.
        let message = {
            blogname: blog.username
        };

        channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
        console.log(" [x] Sent '%s'", "New blog");
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