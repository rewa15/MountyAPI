const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./models/user');
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
  let today = new Date();
  let newAddress = {};
  var coordArr = [];
  newAddress.street = req.body.street;
  newAddress.locality = req.body.locality;
  newAddress.city = req.body.city;
  newAddress.state = req.body.state;
  newAddress.pincode = req.body.pincode;
  newAddress.coordinatesType = req.body.coordinatesType;
  var lat = req.body.latitude;
  var long = req.body.longitude;
  if(lat && long) {
     coordArr.push(lat);
     coordArr.push(long);
  }
  newAddress.coordinates = coordArr;

  let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile,
        createdAt: today,
        address: newAddress
  });

  newUser.save(function(err) {
      if(!err)
      {
        res.send("Sucess!! Added new User.")
      }else {
        res.send(err);
      }
  });
})

// Update a specific user
app.put("/update-user/:userNo",function(req,res)
{
  User.updateOne({mobile: req.params.userNo},{email: req.body.email}, function(err){
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
      res.send("Succesfully deleted corresponding User!");
    }else {
      res.send(err);
    }
  });
})

// Get all Users sorted by CreatedAt timestamp in ascending order
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

app.get("/get-nearest-users/:latitude/:longitude", function(req,res)
{
    // Setting Max Distance as 8 kilometers
    let maxDistance = req.query.distance || 8;
    // Convert the distance to radians
    // the raduis of Earth is approximately 6371 kilometers
    maxDistance /= 6371;

    let coordsArr = [];
    coordsArr[0] = req.params.longitude;
    coordsArr[1] = req.params.latitude;
    User.find({coordinates: {  $near: coordsArr, $maxDistance: maxDistance }}).exec(function(err, allUsers) {
      if (err) {
        res.send(err);
      }
      res.send(allUsers);
    });
})

app.listen(3000, function() { console.log("Server started on port 3000"); });
