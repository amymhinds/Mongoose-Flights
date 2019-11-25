var Flight = require('../models/flight');
var Ticket = require('../models/ticket');

module.exports = {
  index, 
  create,
  new: newFlight,
  show,
  addToFlight
};

function addToFlight(req, res){
  Ticket.findById(req.params.id, function(err, ticket){
    ticket.flight.push(req.body.flightId);
    ticket.save(function(err){
        res.redirect(`/ticket/${ticket._id}`);
    });
  });
}
function show(req, res) {
  Flight.findById(req.params.id, function(err, flight) {
    Ticket.find({flight: flight._id}, function(err, tickets) {
      console.log(tickets);
      res.render('flights/show', { title: 'Flight Detail', flight, tickets
    });
    });
});
}

function index(req, res) {
  Flight.find({}).sort([['departs', 1]]).exec( function(err, flights) {
    res.render('flights/index', {flights});
  });
}

function newFlight(req, res) {
    var newFlight = new Flight();
   //var dt = newFlight.departs;
    //var destDate = `${dt.getFullYear()}-${dt.getMonth() + 1}-${dt.getDate()}T${dt.getHours().toString().padStart(2, '0')}:${dt.getMinutes().toString().padStart(2, '0')}`;
    //res.render('flights/new', {dt});
    res.render('flights/new');
  }

  function create(req, res) {
    var flight = new Flight(req.body);
    flight.save(function(err) {
      // one way to handle errors
      if (err) return res.render('flights/new');
      console.log(flight);
      // for now, redirect right back to new.ejs
      res.redirect('/flights');
    });
  }