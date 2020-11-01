const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const connectDB = require('./configurations/db');

connectDB();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

// Get All Users
app.get("/get-users", function(req,res)
{
   User.find(function(err, foundUsers) {
         if(!err && foundUsers)
         {     
            res.send(foundUsers);   
         } else {
            res.send(err);
         }
   })
})

// Add a new User
app.post("/add-user",function(req,res)
{
  let newArticle= new Article({
        title: req.body.title,
        content: req.body.content
  });
  newUser.save(function(err) {
        if(!err)
        {
          res.send("Sucess!!")
        }else {
          res.send(err);
        }
    });
})

// Update a specific user
app.put("/update-user/:userNo",function(req,res)
{
  User.updateOne({mobile: req.params.userNo},{title: req.body.title, content: req.body.content},{overwrite: true}, function(err){
      if(!err)
      {
        res.send("Succesfully updated User!");
      }else{
        res.send(err);
      }
  })
})

// Delete a specific user
app.delete("/delete-user/:userNo",function(req,res)
{
  User.deleteOne({mobile: req.params.userNo},function(err){
    if(!err)
    {
      res.send("Succesfully deleted corresponding Article!");
    }else {
      res.send(err);
    }
  });
})

// Get all Users sorted by CreatedAt timestamp 
app.get("/get-sorted-users", function(req,res)
{
  User.find({}).sort('createdAt').exec(function(err, users) {
    if(!err && users) {
      res.send(users);
    } else {
      res.send(err);
    }
  });
})

app.listen(3000, function() { console.log("Server started on port 3000"); });
