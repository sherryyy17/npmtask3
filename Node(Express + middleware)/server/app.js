var express = require("express");
var app=express();
const port=8000;
var users = require("./user.json");
var about=require('./about.json')
const fs=require('fs')
var bodyParser = require('body-parser')
var cors = require('cors')

app.use(cors());

const { v4: uuidv4 } = require('uuid');

var jsonParser = bodyParser.json();

var currenTime = (req,res,next) =>{
  req.requestTime=Date(Date.now()).toString()
  next();
}

app.get('/users',(req,res)=>{
  let wholeArray = Object.keys(users).map(key => users[key]);
  res.send(JSON.stringify(wholeArray))
})

app.post('/add-user',jsonParser,currenTime,(req,res)=>{
  let data={
    id:uuidv4(),
    time:req.requestTime,
    ...req.body
  };
  let key=users.length;
  let newUsers={
    data,
    ...users
  }
  let wholeArray = Object.keys(newUsers).map(key => newUsers[key]);
  fs.writeFileSync('./user.json',JSON.stringify(wholeArray));
  // console.log(newUsers);
  res.send("ok")
})

app.delete('/delete-user/:id',(req,res)=>{
  const newUsers=users.filter((item)=>item.id!==req.params.id)
  fs.writeFileSync('./user.json', JSON.stringify(newUsers));
  res.send(JSON.stringify(newUsers));
})

app.get('/about',(req,res)=>{
  res.send(JSON.stringify(about));
})

app.listen(port,()=>{
  console.log(`server is listening at port ${port}`)
})

