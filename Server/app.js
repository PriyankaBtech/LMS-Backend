import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import {config} from "dotenv";
import morgan from "morgan";
config();

const app = express();

app.use(express.json());

app.use(cors({
    origin: [process.env.CLIENT_URL],
    credentials: true
}));

app.use(cookieParser());

app.use(morgan('dev'));


app.use('/ping', (req, res) => {
    res.send("Pong");
});

// Routes of 3 Modules => User | Course | Payment

// for random url
app.all("*", (req, res) => {
    res.status(404).send("OPPS!! 404 Page Not Found");
});

export default app;

