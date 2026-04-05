import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    }
},{timestamps:true});

userSchema.pre("save", async function(){
    if(!this.isModified("password")) return;

    try{
        const salt = await bcrypt.genSalt(11);
        this.password = await bcrypt.hash(this.password, salt);
    }catch(error){
        console.log(error);
        throw new Error("Error in hashing password");
    }
});

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password);
}



export default mongoose.model('User',userSchema);