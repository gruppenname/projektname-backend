import express from 'express';
import todos from './todosService'
import debug from 'debug';
const log = debug('route:todos');

const router = express.Router();

router.post('/', async (req, res) => {
  const {title, content, category, column} = req.body;

  try {
    let newTodo = await todos.createTodo(title, content, category, column);
    log('New todo created - title: "' + title + '", id: "' + newTodo.id + '"');

    res.json(newTodo);
  } catch(e) {
    res.status(400).json({error: e})
  }
})

router.post('/:key', async (req, res) => {
  const {title, content, category, column, key} = req.body;

  try {
    let newTodo = await todos.createTodo(title, content, category, column, key);
    log('New todo created - title: "' + title + '", id: "' + newTodo.id + '"');
    res.json(newTodo);
  } catch(e) {
    res.status(400).json({error: e})
  }
})

router.get('/', async (req, res) => {
  try {
    const foundTodos = await todos.getTodos();
    log('Fetched todos');

    res.json({todos: foundTodos})
  } catch(e) {
    res.status(400).json({error: e})
  }

})

router.get('/:key', async (req, res) => {
  const key = req.params.key;
  try {
    const foundTodos = await todos.getTodos(key);
    log('Fetched todos for key: "' + key + '"');

    res.json({todos: foundTodos})
  } catch(e) {
    res.status(400).json({error: e})
  }
})

router.put('/:id', async (req, res) => {
  const {id, title, category, status} = req.body;

  try {
    const updatedTodo = await todos.updateTodo({
      id,
      title,
      category,
      status
    });
    log('Edited Todo - title: "' + title + '", id: "' + updatedTodo.id + '"');

    res.json(updatedTodo)
  } catch(e) {
    res.status(400).json({error: e})
  }
})

router.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const deletedTodo = await todos.deleteTodo(id);
    log('Deleted todo - id: "' + id + '"');

    res.json({status: "success"})
  } catch(e) {
    res.status(400).json({error: e})
  }
})


export default router;

