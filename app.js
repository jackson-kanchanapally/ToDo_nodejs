const { response } = require("express");
const express = require("express");
const mongoose = require("mongoose");
const todo=require('./models/todo.js');
const app = express();
app.use(express.static("public"));
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/todo")
  .then((res) => {
    console.log("connected to the server");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/api/get", async (req,res)=>{
  const records=await todo.find({});
  res.json(records);
})

app.post("/api/modify", async (req,res)=>{
  const {old:oldtitle,new:newtitle}=req.body;
  console.log(oldtitle,newtitle)
  const response=await todo.updateOne({record:oldtitle},{$set :{record:newtitle}})
  // console.log(response);
  res.json({status: 'ok'});
})

app.post("/api/delete",async (req,res)=>{
  const {record}=req.body;
  const response=await todo.deleteOne({record});
  res.json({status:'ok'})
})

app.post("/api/create", async (req, res) => {
  const data = req.body;
  // console.log(data.record);
  await todo.create(data);  
  res.json({ status: "ok" });
});


app.listen(3000, () => {
  console.log("server ready...");
});
