require('dotenv').config()

const express = require("express");
const bodyParser = require("body-parser");
// const sendMail = require("./sendgrid");
const path = require("path");
// const sendEmail = require("./utils/sendEmail")
const nodemailer = require("nodemailer");

const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const app = express();

const PORT = 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use("/public", express.static(path.join(__dirname, "public")))
app.use(bodyParser.urlencoded({extended: false}));
// app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());


app.get("/", function(req, res){
  res.render("index");
  //res.sendFile(__dirname + "/index.html");
});

app.get("/contact", function(req, res){
  // res.sendFile(__dirname + "/contact.html")
  res.render("contact");
});

app.get("/quote", function(req, res){
  res.render("quote");
  // res.sendFile(__dirname + "/quote.html")
});

// app.get("/features", function(req, res){
//   // res.sendFile(__dirname + "/features.html")
// });

app.post("/", function(req, res){
  console.log("Got It.");
  var btn = req.body.btn;
  console.log(btn);

  if (btn === "Contact Us"){
    res.redirect("contact");
    // res.sendFile(__dirname + "/contact.html")
  } else if (btn === "Request a Quote") {
    res.redirect("quote");
    // res.sendFile(__dirname + "/quote.html");
  }  else if (btn === "Get Started"){
    res.redirect("quote");
    // res.render("quote");
    // res.sendFile(__dirname + "/quote.html");
  } else {
    res.render("index");
    // res.sendFile(__dirname + "/features.html");
  }
});

app.post("/sendemail", (req, res) => {
  const { name, lastName, email, message } = req.body;
  const output = `
  <h3>Details<h3>
  <ul>
    <li>Name: ${name}</li>
    <li>Lastname: ${lastName}</li>
    <li>Email: ${email}</li>
    <li>Message: ${message}</li>
  </ul>
  `
  const msg = {
    to: 'johandgonzalezr@gmail.com', // Change to your recipient
    from: 'johandgonzalez@hotmail.com', // Change to your verified sender
    subject: 'Message For Devtouch ' + email,
    html: output
  }
  sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent')
    })
    .catch((error) => {
      console.error(error)
    })
  res.render("email", {name:req.body.name, lastName: req.body.lastName, email:req.body.email});
});

app.post("/quote", function(req, res){
  const { name, lastName, email, message, address, address2, province, postal, businessType, locations, staff, additionalInfo } = req.body;

  const output = `
  <h3>Details<h3>
  <ul>
    <li>Name: ${name}</li>
    <li>Lastname: ${lastName}</li>
    <li>Email: ${email}</li>
    <li>Message: ${message}</li>
    <li>Address: ${address}</li>
    <li>Address2: ${address2}</li>
    <li>Province: ${province}</li>
    <li>Postal: ${postal}</li>
    <li>Business Type: ${businessType}</li>
    <li>Number of locations: ${locations}</li>
    <li>Number of staff members: ${staff}</li>
    <li>Additional Info: ${additionalInfo}</li>
  </ul>
  `
  const msg = {
    to: 'johandgonzalezr@gmail.com', // Change to your recipient
    from: 'johandgonzalez@hotmail.com', // Change to your verified sender
    subject: 'Quote Request For Devtouch ' + email,
    html: output
  }

  sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent')
    })
    .catch((error) => {
      console.error(error)
    })
  res.render("quote-sent", {name:req.body.name, lastName: req.body.lastName, message: req.body.message, email:req.body.email, address: req.body.address, address2: req.body.address2, province: req.body.province, postal: req.body.postal, businessType: req.body.businessType, locations: req.body.locations, staff: req.body.staff, additionalInfo: req.body.additionalInfo});
});

app.listen(process.env.PORT || PORT, function(){
// app.listen(3000, function(){
  console.log("Server running on port 3000")
});
