import express from 'express';
import cookieParser from 'cookie-parser';
import { authRouter } from '../routes/authRoutes.js';

const port = process.env.PORT || 3000; // CURL OR HTTPIE FOR BACKEND REQUESTS
const app = express();

app.use(express.json())
app.use(cookieParser())

app.use('/api/auth/', authRouter)

app.get("/", (req, res) => res.send("<h1>Hello world</h1>"));

app.listen(port, () => {
    console.log("Server is running on port " + port);
});
