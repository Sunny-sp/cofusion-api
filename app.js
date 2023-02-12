import createError from 'http-errors';
import express from'express';
import path from'path';
import logger from'morgan';
import indexRouter from './routes/index.js';
import usersRouter from './routes/userRouter.js';
import mongoose from 'mongoose';
import passport from 'passport';
import './authenticate.js';
import config from './config.js';
import dishRouter from './routes/dishRouter.js';
import promoRouter from './routes/promoRouter.js';
import leaderRouter from './routes/leaderRouter.js';

const url = config.mongoUrl;
const connect = mongoose.connect(url);

connect.then(db=>{
  console.log('connected to database successfully');
},(err)=>{
  console.log(err);
});

const app = express();

app.use('*',(req, res, next)=>{
  if(req.secure){
    return next();
  }
  else{
    res.redirect('https://'+req.hostname+':'+ app.get('secPort')+ req.url);
  }
});
// view engine setup

import {fileURLToPath} from 'url';
import uploadRouter from './routes/uploadRouter.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser('1234-453-356-456-456454'));

app.use(passport.initialize());

app.use('/', indexRouter);
// authentications

app.use('/users', usersRouter);
app.use(express.static(path.join(__dirname, 'public')));
// after authentication now can access other end-points
app.use('/dishes',dishRouter);
app.use('/promotions',promoRouter);
app.use('/leaders',leaderRouter);
app.use('/imageUpload',uploadRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
