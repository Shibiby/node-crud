const LocalStrategy = require('passport-local').Strategy;

const User = require('../routes/users');
var mysql = require('mysql');
var db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'node_crud',
  debug: false
});

module.exports = function(passport){
    passport.use(new LocalStrategy(function(username, password, done) {
        let query = {username:username};
        User.findOne(query, function(err, user) {
            if(err) throw err;
            if(!user){
                return done(null, false, {message: No User found});
            }
        });
    }));

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
}