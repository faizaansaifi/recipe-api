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
                console.log(data)
                res.json(data).send().status(200);
            }).catch(e => console.log("Error 1"))
        }).catch(e => res.status(404).send('Error'))
    // Recipes.find({
    //         keywords: {'$in': req.body.search}}).
    // res.send(recipe).status(200)
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

app.get('/vila', (req, res) => {
    let q =[];
    mongo.then((client) => {
            client.db().collection('products').find().forEach(items => {
                q.push(items)
                console.log(q)
            }).then((data) => {
                res.json(q).send().status(200);
            })
        }).catch(e => console.log('Error'))
    // res.send(q).status(200)
})

app.listen(PORT, () =>
    console.log('Express server is running on localhost: ', PORT)
)
