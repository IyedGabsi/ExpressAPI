const authmodel=require('../models/auth.model')
const router=require('express').Router()

router.post('/register',(req,res,next)=>{
    authmodel.register(req.body.username,req.body.email,req.body.password).then((user)=>res.status(200).json({user:user,msg:"registred"})).catch((err)=>res.status(400).json({error:err}))
})
router.post('/login',(req,res,next)=>{
    authmodel.login(req.body.email,req.body.password).then((token)=>res.status(200).json({token:token})).catch((err)=>res.status(400).json({error:err}))
})
module.exports=router