const functions = require('firebase-functions');
const express = require('express');
const path = require('path');

// Initialize the Express app
const app = express();

// Set the view engine to ejs
app.set('view engine', 'ejs');

// Set the views folder
app.set('views', path.join(__dirname, 'views'));

app.use(express.static("public"))

// Define a route to serve the ejs page
app.get('/', (req, res) => {
    res.render('index'); // This will render the index.ejs file
});

// Export the Express app as a Firebase Function
exports.app = functions.https.onRequest(app);
// exports.app = functions.region('us-central1').https.onRequest(app);

// const PORT = 3000;
// app.listen(process.env.PORT || PORT, function(){
//   // app.listen(3000, function(){
//     console.log("Server running on port 3000")
//   });
