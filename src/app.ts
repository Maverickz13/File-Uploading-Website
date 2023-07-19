import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import passport from "passport";
import cookieSession from "cookie-session";

import configureSwagger from "./config/swaggerConfig";
import uploadRouter from "./routes/uploadRouter";
import downloadRouter from "./routes/downloadRouter";
import fetchRouter from "./routes/fetchRouter";
import authRouter from "./routes/authRouter";

import configurePassport from './config/passport';

const app = express();
app.use(express.json());
app.use(
  cookieSession({
    name: "session",
    keys: ["test"],
    maxAge: 24 * 60 * 60 * 100,
  })
);
app.use(express.static('src/assets'));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors({
  origin: "http://localhost:3000",
  methods: "GET,PUT,POST,DELETE",
  credentials: true,
}));
configurePassport();
mongoose.connect('mongodb://127.0.0.1', {
  dbName: 'file-repo'
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.log('Error connecting to MongoDB::', error));

app.use('/auth', authRouter);
app.use('/upload', uploadRouter);
app.use('/download', downloadRouter);
app.use('/files', fetchRouter);

configureSwagger(app);

app.listen(8080, () => {
  console.log('Server is running on port 8080');
})