const mongoose = require('mongoose');

function connectToDb(){
    mongoose.connect('mongodb://mongo:npCOuFOyDfqujORGhDTFpKQIHKTuwLBT@mongodb.railway.internal:27017'
    ,).then(()=>{
        console.log('connected to DB');
    }).catch(err=>console.log(err))
}

module.exports = connectToDb; 