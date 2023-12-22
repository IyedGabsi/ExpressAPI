const router=require('express').Router()
const studentmodel=require('../models/students.model')
const jwt=require('jsonwebtoken')
require('dotenv').config()


router.get('/',(req,res,next)=>{
   res.write('welcome to api')
})

var privatekey="lboss eidbzbbebceh"
verifyToken=(req,res,next)=>{
    let token=req.headers.authorization
    if(!token){
        res.status(400).json({msg:'access rejected....!!!'})
    }
    try{
        jwt.verify(token,privatekey)
        next()
    }catch(e){
        res.status(400).json({msg:e})
    }
}

var secretkey=process.env.SECRET_KEY
var clientkey=process.env.CLIENT_KEY

verifysecretclient=(req,res,next)=>{
    let sk=req.params.secret
    let ck=req.params.client
    if(sk==secretkey && ck==clientkey){
        next()
    }else{res.status(400).json({erroe:"you can't access to this route because you didn't sent me secret key and client key"})}
}



router.post('/addstudent/:secret/:client',verifysecretclient,verifyToken,(req,res,next)=>{
    studentmodel.postNewStudent(req.body.firstname,req.body.lastname,req.body.age,req.body.email,req.body.phone).then((doc)=>res.status(200).json(doc)).catch((err)=>res.status(400).json(err))
})
router.get('/students/:secret/:client',verifysecretclient,verifyToken,(req,res,next)=>{
    
        let token=req.headers.authorization
        let user=jwt.decode(token,{complete:true})
        studentmodel.getallStudents().then((doc)=>res.status(200).json({students:doc,user:user})).catch((err)=>res.status(400).json(err))
    
   
})
router.get('/student/:id/:secret/:client',verifysecretclient,verifyToken,(req,res,next)=>{
    studentmodel.getoneStudent(req.params.id).then((doc)=>res.status(200).json(doc)).catch((err)=>res.status(400).json(err))
})
router.delete('/student/:id/:secret/:client',verifysecretclient,verifyToken,(req,res,next)=>{
    studentmodel.deleteStudent(req.params.id).then((doc)=>res.status(200).json(doc)).catch((err)=>res.status(400).json(err))
})
router.patch('/student/:id/:secret/:client',verifysecretclient,verifyToken,(req,res,next)=>{
    studentmodel.updateStudent(req.params.id,req.body.firstname,req.body.lastname,req.body.age,req.body.email,req.body.phone).then((doc)=>res.status(200).json(doc)).catch((err)=>res.status(400).json(err))
})




module.exports=router