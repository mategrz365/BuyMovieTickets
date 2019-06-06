const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');
const passport = require('passport');

const User = require('../models/User');

router.get('/login', (req, res) => res.render('login'));

router.get('/register', (req, res) => res.render('register'));

router.post('/register', 
check('email')    
      .isEmail().withMessage('Wpisz poprawnie e-maila'),
   check('password')     
      .isLength({ min: 8 }).withMessage('Hasło musi zawierać min. 8 znaków')
      .matches(/\W/).withMessage('Hasło musi zawierać co najmniej jeden znak specjalny')   
      .matches('[0-9]').withMessage('Hasło musi zawierać co najmniej jedną cyfrę')    
      .matches('[A-Z]').withMessage('Hasło musi zawierać co najmniej jedną dużą literę')
      .custom((value, {req}) => {
          if (value !== req.body.password2) {
              return false;
          } else {
              return value;
          }
      }).withMessage("Hasła nie są takie same"),

(req, res) => {
    const {email} = req.body;    
    var errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render('register', {errors: errors.array(), email});
      } else {
          //Validation passed
          User.findOne({email:email})
            .then (user => {
                if(user){
                    //User exists 
                    req.flash('error_msg', 'Użytkownik o podanym emailu istnieje!');                  
                    res.redirect('/users/register');
                } else {
                   const newUser = new User({
                         email: req.body.email,
                         password: req.body.password
                         });

                    // Hash password
                    bcrypt.genSalt(10, (err, salt) => 
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                                if(err) throw err;
                                //Set password to hashed
                                newUser.password = hash;
                                //Save user
                                newUser.save()
                                    .then(user => {
                                        req.flash('success_msg', 'Rejestracja udana. Możesz się teraz zalogować.');
                                        res.redirect('/users/login');
                                    })
                                    .catch(err => console.log(err));
                        }))
                }
            });         
      }
});
      
router.post('/login', (req, res, next) => {
    req.session.email = req.body.email;
      passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        badRequestMessage : 'Wpisz poprawnie swoje dane',
        failureFlash: true,
        })(req, res, next);
});   

router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'Wylogowałeś się');
    res.redirect('/users/login');
});

module.exports = router;

