const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const HTTP = require('http');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//import routers
const indexRouter = require("./app.routes/index.routes");
const userRouter = require('./app.routes/user.routes');
const postRouter = require("./app.routes/post.routes");
const commentRouter = require("./app.routes/comment.routes");
app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/post', postRouter);
app.use('/comment', commentRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = (req.app.get('env') === 'development') ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const WWW = require('./utilities/www.class');
const port = WWW.normalizePort(process.env.PORT || '3000');
app.set('port', port);

const server = HTTP.createServer(app);
server.listen(port, () => {
    console.log(`server listen on port : ${port}`);
});
server.on('error', WWW.onError);

