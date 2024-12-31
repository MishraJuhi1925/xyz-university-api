require('dotenv').config();
const express= require('express');
const app = express();
const cors = require('cors');
app.use(express.json());
app.use(cors());
const sequelize = require('./app/config/config')
const port = process.env.API_PORT || 4000; 

app.get('/health', (req, res, next) => {
    res.status(200).json({message: 'health check passed'});
})
// open route 
app.use('/', require('./app/routes/openRoute'));
app.use('/', require('./app/routes/program'));
app.use('/', require('./app/routes/course'));
app.use(require('./app/middlewares/authentication'));



app.use(require('./app/middlewares/error-handler'));

sequelize.sync().then(() => { console.log('Database & tables created!'); });

app.listen(port,()=>{
    console.log(`http://127.0.0.1:${port}`)
})