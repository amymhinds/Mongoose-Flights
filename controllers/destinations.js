var Flight = require('../models/flight');
 
module.exports = {
  create
  
};

function create(req, res) {
    Flight.findById(req.params.id, function(err, flight) {
      flight.destinations.push(req.body);
      console.log(req.body);
      flight.save(function(err) {
          console.log(flight);
        res.redirect(`/flights/${req.params.id}`);
      });
    });
  }

