import express, { urlencoded } from 'express';
import { PORT } from './config/portConfig.js';
import { dbConnet } from './config/dbConfig.js';
import bookRoutes from './routes/bookRoutes.js';
import cors from 'cors';

const app = express();

dbConnet();

// middlewares 
app.use(cors());
// app.use(express.urlencoded({extended:true}))
app.use(express.json()); 
app.use('/books', bookRoutes);

// routes
app.get('/', (req, res) => {
    try{
        res.status(200).send('welcome to the bookstore applicaion')
    } 
    catch (error) {
        res.status(500).send({message: error.message})
    }
});




//  app listener
app.listen(PORT) 