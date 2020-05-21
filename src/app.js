const express = require('express')
const cors = require('cors')
const pino = require('express-pino-logger')();

const MongoClient = require('mongodb').MongoClient;

const app = express();
app.use(pino);
app.use(cors());

app.use(express.json())

const PORT = process.env.PORT || 8080;

const mongo = MongoClient.connect("mongodb+srv://recipe:OKR0QMYNTjkwDFT3@cluster0-buzwz.mongodb.net/dummy?retryWrites=true&w=majority");
// const mongo = MongoClient.connect("mongodb+srv://dummy:apache200@cluster0-buzwz.mongodb.net/dummy?retryWrites=true&w=majority");

app.use((req, res, next) => {
    // Set CORS headers so that the React SPA is able to communicate with this server
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET,POST,PUT,PATCH,DELETE,OPTIONS'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.get('/check', (req, res) => {
    res.send('Dummy text just for Check');
})
app.post('/search', (req, res) => {
    console.log('Body we get: ', req.body.search)
    let data= []

    mongo.then((client) => {
            client.db().collection('recipes').find({
                keywords: {'$in': req.body.search}
            }).forEach((items) =>{
                data.push(items)
            }).then((recipe) => {
                res.json(data).send().status(200);
            }).catch(e => console.log("Data returns null"))
        }).catch(e => res.status(404).send('Error: Data not Found'))
})

app.get('/test', (req, res) => {
    mongo.then((client) => {
        let data = [];
        client.db().collection('recipes').find().forEach((items) => {
                data.push(items)
            }).then((recipe) => {
                console.log(data)
            res.json(data).send().status(200);
        }).catch(e => console.log('Error test 1'))
    }).catch(e => res.status(404).send('Error : '))
})


app.listen(PORT, () =>
    console.log('Express server is running on localhost: ', PORT)
)
