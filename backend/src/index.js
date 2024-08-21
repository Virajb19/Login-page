import express from 'express';
import { authRouter } from '../routes/authRoutes.js';

const port = process.env.PORT || 3000; 
const app = express();

app.use(express.json())

app.use('/api/auth/', authRouter)

app.get("/", (req, res) => res.send("<h1>Hello world</h1>"));

app.listen(port, () => {
    console.log("Server is running on port " + port);
});
