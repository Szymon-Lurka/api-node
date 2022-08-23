import express from "express";
import morgan from 'morgan';
import tourRouter from "./routes/tours/index.js";
import userRouter from "./routes/users/index.js";
import { getDirname } from "./utils/get-dirname.js";

const app = express();
if (process.env.NODE_ENV.trim() == 'development') {
    app.use(morgan('dev'));
}
app.use(express.json());
app.use(express.static(`${ getDirname(import.meta.url) }/public`));

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

export default app;
