import bodyParser from "body-parser";
import express from "express";
import passport from "passport";
import User from "../models/user.js";
import * as authenticate from '../authenticate.js';

const userRouter = express.Router();
userRouter.use(bodyParser.json());

/* GET users listing. */
userRouter.get('/',authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
  User.find({})
  .then(users=>{
    res.statusCode = 200;
    res.setHeader('Content-Type','application/json');
    res.json(users);
  })
  .catch(err=>next(err));
});

userRouter.post('/signup', (req, res, next) => {
  User.register(new User({username: req.body.username}), req.body.password, (err, user) => {
      if (err) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.json({
          err: err
        });
      } else {
        if (req.body.firstname) {
          user.firstname = req.body.firstname;
        }
        if (req.body.lastname) {
          user.lastname = req.body.lastname;
        }
        user.save((err, user) => {
          passport.authenticate('local')(req, res, () => {
            if (err) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.json({
                err: err
              });
              return;
            }
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({
              success: true,
              status: 'Registration Successful!'
            });
          });
        });
      }
    });
});

userRouter.post('/login', passport.authenticate('local'), (req, res)=>{
  const token = authenticate.getToken({_id:req.user._id});
  res.statusCode = 200;
  res.setHeader('Content-Type','application/json');
  res.json({success:true, token:token, status:'You are logged-in successfully!'});
});

userRouter.get('/logout',(req, res, next)=>{
  if(req.user){
    req.session.destroy();
    res.clearCookie('session-Id');
    res.redirect('/');
  }
  else{
    const err = new Error('You are not logged-In!');
    err.status = 401;
    next(err);
  }
});
export default userRouter;
