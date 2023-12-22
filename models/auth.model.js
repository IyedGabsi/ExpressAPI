const mongoose=require('mongoose')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
require('dotenv').config()

let schemaUser=mongoose.Schema({
    username:String,
    email:String,
    password:String
})

let url=process.env.URL
var User=mongoose.model('user',schemaUser)


exports.register=(username,email,password)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
            return User.findOne({email:email})
        }).then((doc)=>{
            if(doc){
                mongoose.disconnect()
                reject('this email already registred !')
            }else{
                bcrypt.hash(password,15).then((hashedpassword)=>{
                    let user=new User({
                        username:username,
                        email:email,
                        password:hashedpassword
                    })
                    user.save().then((doc)=>{
                        mongoose.disconnect()
                        resolve(user)
                    }).catch((err)=>{
                        mongoose.disconnect()
                        reject(err)
                    })
                }).catch((err)=>{
                    mongoose.disconnect()
                    reject(err)
                })
            }
        })
    })
}
var privatekey=process.env.PRIVATE_KEY
exports.login=(email,password)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
            return User.findOne({email:email})
        }).then((user)=>{
            if(!user){
                mongoose.disconnect()
                reject('you should register first !')
            }else{
                bcrypt.compare(password,user.password).then((same)=>{
                      if(same){
                            let token= jwt.sign({id:user._id,username:user.username},privatekey,{expiresIn:'1h'})
                            mongoose.disconnect()
                            resolve(token)
                      }else{
                            mongoose.disconnect()
                            reject('invalid password')
                      }
                }).catch((err)=>{
                    mongoose.disconnect()
                    reject(err)
                })
                   
            }
        })
    })
}