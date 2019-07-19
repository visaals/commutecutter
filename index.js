const express = require('express');
const path = require('path');
const app = express();
const directionsController = require('./controllers/DirectionsController');
var bodyParser = require('body-parser');
app.use(bodyParser.json());


// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

app.post('/api/directions', (req, res) => {
  directionsController.getRoute(req).then(
    (route) => res.json(route)
    );
});

// should take in an array of addresses and commute locations and return 
app.post('/api/bulk-directions', (req, res) => {
  directionsController.getBulkRoutes(req).then(routes => res.json(routes));
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Server listening on ${port}`);