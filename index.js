const express = require("express");
const app = express();
const path = require("path");
const axios = require("axios");

//set the view engine to PUG
app.set("views", path.join(__dirname,"views"));
app.set("view engine", "pug");

app.use(express.static("./assets"));

//basic route
app.get("/", (req,res, next)=>{

    let users=[];
  //random users API
  axios.get("https://randomuser.me/api/?results=10")
  .then((response)=>{
     response.data.results.map((user)=>{
        users.push(user);
     });
     console.log(users);
     res.render("main", {
         users
     });
  })
  .catch((err)=>{
      console.log(err);
      res.render("main");
  });

    
});


//add the manifest
app.get("/manifest.json", function(req, res){
    //send the correct headers
    res.header("Content-Type", "text/cache-manifest");
    //console.log(path.join(__dirname,"manifest.json"));
    //send the manifest file
    //to be parsed bt express
    res.sendFile(path.join(__dirname,"manifest.json"));
  });

//add the service worker
  app.get("/sw.js", function(req, res){
    //send the correct headers
    res.header("Content-Type", "text/javascript");
    
    res.sendFile(path.join(__dirname,"sw.js"));
  });

  app.get("/loader.js", function(req, res){
    //send the correct headers
    res.header("Content-Type", "text/javascript");
    
    res.sendFile(path.join(__dirname,"loader.js"));
  });


app.listen(3000, ()=>{
    console.log("server running @ localhost:3000");
});
