import express from 'express';
import todoRouter from './routes/todos/todos';
import debug from 'debug';

const log = debug('server');
const app = express();

app.disable('x-powered-by');  
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/todos', todoRouter)

const server = app.listen(process.env.PORT || 5000, () => {
  log("Server is ready and waiting on localhost:" + process.env.PORT)
})