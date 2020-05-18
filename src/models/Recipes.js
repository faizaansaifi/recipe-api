const mongoose = require('mongoose')

const Recipes = mongoose.model('recipe', {
            name: {
                type: String
            },
            ingrd: {},
            desc: {
                type: String,
            },
            time: {
                type: String,
            }

})

const dummy = new Recipes(
    [
        {
            name: 'Shahi Paneer',
            ingrd: {
                paneer: true,
                tomatoes: true,
                milk: false,
            },
            desc: ['1. Cut it', '2. Cook it', '3. Eat it'],
            time: '20 min',
        },
        {
            name: 'Afghani Chicken',
            ingrd: {
                chicken: true,
                grill: true,
                cream: false,
                butter: false,
            },
            desc: ['1. Prepare Grill', '2. Roast it'],
            time: '30 min',
        },
        {
            name: 'French Toast',
            ingrd: {
                eggs: true,
                bread: true,
                oil: true,
                honey: false,
                syrup: false,
            }
        }
    ]
)

// dummy.save().then((res) =>{
//     console.log(res)
// })
module.exports = Recipes;
