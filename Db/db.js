const mongoose = require('mongoose');

function connectToDb(){
    mongoose.connect('mongodb://127.0.0.1:27017/Task-Tracker'
    ,).then(()=>{
        console.log('connected to DB');
    }).catch(err=>console.log(err))
}

module.exports = connectToDb; 