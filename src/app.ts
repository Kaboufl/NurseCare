const dotenv = require('dotenv');
dotenv.config();


import express from 'express';
import "reflect-metadata";


import NCDB from './data_source/datasource';


const app = express();
const port = 3000;


app.get('/', (req, res) => {
    res.send('Salut sa marche')
});

app.listen(port, async () => {
    
    console.log(`server is listening on ${port}`);

    console.log(await NCDB())
});