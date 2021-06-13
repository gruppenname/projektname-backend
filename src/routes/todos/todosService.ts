import prisma from '../../services/db'
import { generateUID } from '../../services/uid'
import {Column} from '@prisma/client'
const todo =  prisma.todo;

export async function createTodo(title: string, content: string, category: string, column: Column, key?:string) {
  let keyForTodo = key || generateUID();

  return todo.create({
    data: {
      key: keyForTodo,
      title: title,
      content: content,
      category: category,
      column: column,
    }
  })
}

export async function updateTodo(_todo: {
  id: number,
  title?: string,
  category?: string,
  content?: string,
  column?: Column
}) {
  let updatedTodo:any = {
    where: {
      id: _todo.id
    },
    data: {
    }
  }

  if(_todo.title)
    updatedTodo.data.title = _todo.title

  if(_todo.category)
    updatedTodo.data.category = _todo.category

  if(_todo.content)
    updatedTodo.data.content = _todo.content

  if(_todo.column)
    updatedTodo.data.column = _todo.column

  return todo.update(updatedTodo)
}

export async function deleteTodo(id: number) {
  return todo.delete({
    where: {
      id: id
    }
  })  
}

export async function getTodos(key?: string) {
  if(key)
    return todo.findMany({
      where: {
        key: key
      }
    });
  
  return todo.findMany();
}

export default {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo,
}