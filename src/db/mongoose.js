const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://recipe:Saifi@123@cluster0-buzwz.mongodb.net/test?retryWrites=true&w=majority", {
    useUnifiedTopology: true,
    useCreateIndex: true,
})

