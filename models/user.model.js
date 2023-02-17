const mongoose=require("mongoose");

const userSchema=mongoose.Schema({
    name:String,
    email:String,
    age:Number,
    pass:String
})

const UserModel=mongoose.model("users",userSchema);

module.exports={
    UserModel
}