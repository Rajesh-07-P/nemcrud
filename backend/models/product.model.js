const mongoose=require("mongoose");

const prodSchema=mongoose.Schema({
    name:String,
    price:Number,
    userID:String,
    author:String
})

const ProdModel=mongoose.model("products",prodSchema);

module.exports={
    ProdModel
}