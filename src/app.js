const express = require('express')
const cors = require('cors')
const pino = require('express-pino-logger')();
const Recipes = require('../src/models/Recipes')
require('../src/db/mongoose')

const app = express();
app.use(pino);
app.use(cors());

app.use(express.json())

const PORT = process.env.PORT || 8081;
app.get('/', (req, res) => {
    res.send('Home Page');
})
app.post('/search', (req, res) => {
    console.log('Body we get: ', req.body)
    let data= []
    req.body.search.forEach((item, index) =>{
        Recipes.find({
            ['keywords.'+item]: {'$exists': true}}, {}).then((recipe) => {
            // data = [...data, recipe];
            console.log(recipe)
            res.send(recipe)
        }).catch(e => res.status(404).send('Eror', e))
    })
    // res.send(data).status(200)
})

app.listen(PORT, () =>
    console.log('Express server is running on localhost: ', PORT)
);
