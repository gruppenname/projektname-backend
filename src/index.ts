import express from 'express'
import todoRouter from './routes/todos/todos'
const app = express()

app.disable('x-powered-by');  
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/todos', todoRouter)

const server = app.listen(5000, () => {
  console.log("Server is ready and waiting on localhost:5000")
})