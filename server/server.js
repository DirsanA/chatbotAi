import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

dotenv.config();


const app=express();
app.use(cors());
app.use(bodyParser.json());
const port=5000;

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
}   );
