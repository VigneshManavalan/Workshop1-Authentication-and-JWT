const { request } = require('express')
const express = require('express')
const app = express()

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
app.get('/authenticate',(req,res) => {
    const userName = req.query.userName
    const password = req.query.password
    let isAuthenticated = false
    users.forEach((item)=>{
        if(item.userName == userName){
            if(item.password == password){
                // token
                isAuthenticated=true
                res.send("you are authenticated")
            }
            else{
                res.send("password wrong")
            }
        }
    })
res.send("username does not exist")
})

app.listen(3000)