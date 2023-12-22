const express=require('express')
const app=express()
const routstudent=require('./routers/student.route')
const routauth=require('./routers/auth.route')

app.use(express.json())
app.use(express.urlencoded({extended:true}))
//secure your api 
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin',"*")
    res.setHeader('Access-Control-Request-Method',"*")
    res.setHeader('Access-Control-Allow-Headers',"*")
    next()
})
//
app.use('/',routstudent)
app.use('/',routauth)

app.listen(3000,()=>console.log('server runing on http://localhost:3000/'))