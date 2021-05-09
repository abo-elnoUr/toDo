import { Status, ToDo } from 'src/app/shared/models/todo.model';
import { Todo } from 'src/app/shared/models/todo-state.model';
import * as ToDoAction from './todo.action';
import { createReducer, on, Action } from '@ngrx/store';

export interface TodoState{
  todo: Todo[];
}

export const initialState : TodoState = {
  todo: [new Todo(1,'study','Start study Tomorrow',Status.pending,new Date(),new Date(),new Date(),false)]
};


 const todoReducer = createReducer(
  initialState,
  on(ToDoAction.addTodo, (state, {payload}) => {
    return {
      ...state,
      todo: [...state.todo,payload]
    }
  })

)

export function Reducer (state: TodoState | undefined,action: Action )
{
  return todoReducer(state, action)
}


