const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser'); 
const cors = require("cors");
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));


//Config
app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2)

app.use(cors({origin: '*'}))

//Import routers
app.use(require('./routes/index'));

//middlewares
app.use(morgan('dev'));
app.use(express.json());

//start server
app.listen(app.get('port'));