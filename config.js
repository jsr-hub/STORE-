const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://admin:admin@cluster0-lh3ow.mongodb.net/store?retryWrites=true&w=majority',{useNewUrlParser: true, dbName: "adminnstore"}).then(()=>{
    console.log("Connected sucessfully...");
}).catch((err)=>{
    console.log(err);
});

module.exports.mongoose = mongoose;	