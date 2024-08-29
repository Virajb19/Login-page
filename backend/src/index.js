import express from 'express';
import cookieParser from 'cookie-parser';
import { authRouter } from '../routes/authRoutes.js';
import cors from 'cors'
import path from 'path'

const port = process.env.PORT || 3000; // CURL OR HTTPIE FOR BACKEND REQUESTS
const app = express();
const __dirname = path.resolve()

app.use(express.json())
app.use(cookieParser())
app.use(cors({origin: '*', methods: 'GET,POST,PUT,DELETE,OPTIONS', credentials: true}))

app.use('/api/auth/', authRouter)

if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname,'/frontend/dist')))

    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
    })
}

app.get("/", (req, res) => res.send("<h1>Hello world</h1>"));

app.listen(port, () => {
    console.log("Server is running on port " + port);
});
