const express = require('express');
const router = express.Router();
const {ensureAuthenticated} = require('../config/auth');
const sgMail = require('@sendgrid/mail');
const sendgrid_APIKey = require('../config/keys').sendgrid_APIKey;

let data_cinema = {}; 

const Cinema = require('../models/Cinema');
router.get('/', (req, res) => res.render('welcome'));
router.get('/dashboard', ensureAuthenticated, (req, res) => res.render('dashboard'));
router.get('/movies', ensureAuthenticated, (req, res) => res.render('movies'));
router.post('/movies', (req, res) =>{
        const area = req.body.cinema;    
            Cinema.findOne({area})
                .then(cinema => {
                    data_cinema.area = cinema.area;  
                    data_cinema.seats = cinema.seats;          
                    res.render('movies', { cinema })}
                        )
                .catch(err => console.log(err));   
}); 

router.get('/seats', ensureAuthenticated, (req, res) => {       
   res.render('seats', {data_cinema});
});

router.post('/seats', (req, res) => {
    data_cinema.movie = req.body.movie_title;   
    res.render('seats', {data_cinema});    
});

router.get('/summary', ensureAuthenticated, (req, res) => {      
    res.render('summary');
});

router.post('/summary', function(req,res,next){
    sgMail.setApiKey(sendgrid_APIKey);
    const msg = {
        to: req.session.email,
        from: 'order@bookmovietickets.com',
        subject: 'Twoje bilety do Starego Kina',       
        html: `<p>Zarezerwowałeś ${req.body.data.seats} miejsca</p>
            <p>Kino: ${data_cinema.area}</p>
            <p>Film: ${data_cinema.movie}</p>
            <p>Cena: ${req.body.data.sum},00 PLN</p>
            <p>Po odbiór biletów prosimy zgłosić się najpóżniej do 15 minut przed rozpoczęciem seansu.</p>`,             
    };
    sgMail.send(msg)
        .catch(err => console.log(err));
      next();
},
 (req, res) =>  {     
    let data_seats = req.body.data.seats;      
    let data_price = req.body.data.sum; 
    let data_email = req.session.email;   
    res.render('summary', {data_email, data_cinema, data_seats, data_price});
});

module.exports = router;




