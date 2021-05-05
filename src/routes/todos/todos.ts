import express from 'express';
const router = express.Router();
import todos from './todosService'


router.post('/', async (req, res) => {
  const {title, content, category, column} = req.body;

  try {
    let newTodo = await todos.createTodo(title, content, category, column);
    res.json(newTodo);
  } catch(e) {
    res.status(400).json({error: e})
  }
})

router.post('/:key', async (req, res) => {
  const {title, content, category, column, key} = req.body;

  try {
    let newTodo = await todos.createTodo(title, content, category, column, key);
    res.json(newTodo);
  } catch(e) {
    res.status(400).json({error: e})
  }
})

router.get('/', async (req, res) => {
  try {
    const foundTodos = await todos.getTodos();
    res.json({todos: foundTodos})
  } catch(e) {
    res.status(400).json({error: e})
  }

})

router.get('/:key', async (req, res) => {
  const key = req.params.key;
  try {
    const foundTodos = await todos.getTodos(key);
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
    res.json(updatedTodo)
  } catch(e) {
    res.status(400).json({error: e})
  }
})

router.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const deletedTodo = await todos.deleteTodo(id);
    res.json({status: "success"})
  } catch(e) {
    res.status(400).json({error: e})
  }
})


export default router;

