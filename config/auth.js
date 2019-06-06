module.exports = {
    ensureAuthenticated: function(req, res, next){
        if(req.isAuthenticated()) {
            return next();
        }
        req.flash('error_msg', 'Zaloguj się aby mieć dostęp');
        res.redirect('/users/login');
    }
}