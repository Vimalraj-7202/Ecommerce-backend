import express from 'express';
import cors from 'cors';

const app = express();



app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/',(req,res)=>{
    res.send('Ecommerce backed server is runing successfully!')
})

export default app;
