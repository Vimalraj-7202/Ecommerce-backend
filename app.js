import express from 'express';
import cors from 'cors';

const app = express();

// ✅ Safer CORS for production:
const allowedOrigins = [
  'http://localhost:3000',             // your local frontend
  'https://your-frontend.vercel.app'   // your deployed frontend (update this!)
];

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

export default app;
