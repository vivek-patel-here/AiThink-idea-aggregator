const mongoose =require("mongoose");

const DB_Connect = async url => {
    await mongoose.connect(url);
}

module.exports ={DB_Connect};
