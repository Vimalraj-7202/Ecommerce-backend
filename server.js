import dotenv from 'dotenv';
import connectDB from './config/db.js';
import app from './app.js'
import commonRouter from './routes/commonRoutes.js';

dotenv.config();
const PORT = process.env.Port|| 5000
connectDB();

app.use('/api', commonRouter);
app.listen(PORT, () => {
    console.log(`Server is running on Port:${PORT}`);
})