require('dotenv').config();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const favicon = require('serve-favicon');
const hbs = require('hbs');
const mongoose = require('mongoose');
const logger = require('morgan');
const path = require('path');
const cors = require('cors');
const passport = require('./config/passport')

mongoose
  .connect('mongodb://localhost/project-electron-backend', { useNewUrlParser: true })
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();
// Middleware Setup
app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:3001'
  })
)
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize())

// Express View engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));



// default value for title local
app.locals.title = 'Express - Generated with IronGenerator';



const index = require('./routes/index');
const authRoutes = require('./routes/auth.routes')
const categoriesRoutes = require('./routes/categories.routes')
const screenshotsRoutes = require('./routes/screenshots.routes')
const commentsRoutes = require('./routes/comments.routes')
app.use('/', index);
app.use('/', authRoutes)
app.use('/', screenshotsRoutes)
app.use('/categories', categoriesRoutes)
app.use('/comments', commentsRoutes)




module.exports = app;
