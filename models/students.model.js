const mongoose=require('mongoose')
const joi=require('joi')

const schemaValidation=joi.object({
    firstname:joi.string().alphanum().min(3).required().max(15),
    lastname:joi.string().alphanum().min(3).required().max(15),
    age:joi.number().required(),
    email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    phone:joi.number().required()  
})
let schemaStudent=mongoose.Schema({
    firstname:String,
    lastname:String, 
    age:Number,
    email:String,
    phone:Number
})

var Student=mongoose.model('student',schemaStudent)

var url='mongodb://localhost:27017/university'

exports.testconnect=()=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
            mongoose.disconnect()
            resolve('connected')
        }).catch((err)=>reject(err))
    })
}

exports.postNewStudent=(firstname,lastname,age,email,phone)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
            let validation=  schemaValidation.validate({firstname:firstname,lastname:lastname,age:age,email:email,phone:phone})
            if(validation.error){
                mongoose.disconnect()
                reject(validation.error.details[0].message)
            }
            let student=new Student({
                firstname:firstname,
                lastname:lastname, 
                age:age,
                email:email,
                phone:phone
            })
            student.save().then((doc)=>{
                mongoose.disconnect()
                resolve(doc)
            }).catch((err)=>{
                mongoose.diconnect()
                reject(err)
            })
        }).catch((err)=>reject(err))
    })
}
exports.getallStudents=()=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
           return Student.find()
        }).then((doc)=>{
            mongoose.disconnect()
            resolve(doc)
        }).catch((err)=>{
            mongoose.disconnect()
            reject(err)
        })
    })
}
exports.getoneStudent=(id)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
           return Student.findById(id)
        }).then((doc)=>{
            mongoose.disconnect()
            resolve(doc)
        }).catch((err)=>{
            mongoose.disconnect()
            reject(err)
        })
    })
}
exports.deleteStudent=(id)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
           return Student.deleteOne({_id:id})
        }).then((doc)=>{
            mongoose.disconnect()
            resolve(doc)
        }).catch((err)=>{
            mongoose.disconnect()
            reject(err)
        })
    })
}
exports.updateStudent=(id,firstname,lastname,age,email,phone)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
           return Student.updateOne({_id:id},{firstname:firstname,lastname:lastname,age:age,email:email,phone:phone})
        }).then((doc)=>{
            mongoose.disconnect()
            resolve(doc)
        }).catch((err)=>{
            mongoose.disconnect()
            reject(err)
        })
    })
}