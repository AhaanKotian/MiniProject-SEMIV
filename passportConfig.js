const LocalStrategy = require("passport-local").Strategy;
const { authenticate } = require("passport");
const { pool } = require("./dbConfig");
const bcrypt = require("bcrypt");

function initialize(passport){
    const authenticateUser = (email, password, done) => {

        pool.query(
            `SELECT * FROM riders_signup WHERE email = $1`, [email],
            (err, results) => {
                if(err){
                    throw err;
                }

                console.log(results.rows);

                if(results.rows.length > 0){
                    const user = result.rows[0];

                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if(err){
                            throw err;
                        }
                        else if(isMatch){
                            return done(null, user);
                        }
                        else{
                            return done(null, false, {message: "Incorrect password"});
                        }
                    })
                }
                else{
                    return done(null, false, {message: "Email not registered"});
                }
            }
        )
    }

    
    passport.use(
        new LocalStrategy(
            {
                usernameField : "input_email_SI",
                passwordField: "input_pass_SI"
            },
            authenticateUser
        )
    );

    passport.serializeuser((user, done) => {
        done(null, user.id)
    })

    passport.deserializeuser((id, done) => {
        pool.query(
            `SELECT * FROM riders_signup WHERE id =$1`, [id], (err, results) => {
                if(err){
                    throw err
                }

                return done(null, results.rows[0]);
            } 
        )
    })
}

module.exports = initialize;