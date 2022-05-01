const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    email:{type:String,require:true},
    password:{type:String,require:true}
},
{timestamps:true}
)

UserSchema.pre("save",function(next){
    if(!this.isModified("password")) return next();
    bcrypt.hash(this.password,8,(err,hash)=>{
        if(err) return next(err);
        this.password = hash;
        next();
    })
})

UserSchema.methods.checkPassword = function(password) {
    const passwordHash = this.password;
    return new Promise((resolve, reject) => {
        bcrypt.compare(password,passwordHash,(err,same)=>{
            if(err) return reject(err);
            resolve(same);
        })
    })
}
const User = mongoose.model('user',UserSchema)
module.exports = User