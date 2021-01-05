const express = require('express')
const app = express()
const bodyparser = require('body-parser')
app.use(bodyparser.json())

const jwt = require('jsonwebtoken')
require('dotenv').config()
const users = [
    {
        userName : 'Mugilan',
        email : 'mg@trak.com',
        password : 'xxx'
    },
    {
        userName : 'Kaamil',
        email : 'km@trak.com',
        password : 'yyy'
    }
]
app.post('/user',(req,res) => {
    const userName = req.body.userName
    const email = req.body.email
    const password = req.body.password
    
    const user = {userName:userName, email:email, password:password}

    users.push(user)
    res.json(user)
})

app.get('/authenticate',(req,res) => {
    const userName = req.query.userName
    const password = req.query.password
    let isAuthenticated = false
    users.forEach((item)=>{
        if(item.userName == userName){
            if(item.password == password){

                const token = jwt.sign(JSON.stringify({userName:item.userName}),process.env.SECRET)
                isAuthenticated=true
                res.json(token)
            }
            else{
                res.send("password wrong")
            }
        }
    })
res.send("username does not exist")
})

app.get('/validate',(req,res) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)

    jwt.verify(token,process.env.SECRET,(err,user) => {
        if(err) return res.sendStatus(403)
        res.json(user)
    })
})
app.listen(3000)