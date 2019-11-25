var Ticket = require('../models/ticket');
var Flight = require('../models/flight')

module.exports = {
    new: newTicket, 
    create,
    delete: deleteTicket
  };

  function deleteTicket(req, res){
    Ticket.findByIdAndDelete(req.params.id, function(err, ticket) {
      console.log(err);
      res.redirect(`/flights/${req.params.id}`);
    });
    
  }
  function newTicket(req, res) {
      res.render('tickets/new', {
        title: 'Add Ticket',
        flight: req.params.id
      });
  }

  function create(req, res){
    Ticket.create({
     seat: req.body.seat,
     price: req.body.price,
     flight: req.params.id
   }, function(err, ticket) {
      res.redirect(`/flights/${req.params.id}`);
  });
}
