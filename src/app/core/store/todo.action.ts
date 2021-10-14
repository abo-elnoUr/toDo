import { createAction, props } from "@ngrx/store";
import { Todo } from './../../shared/models/todo-state.model';


export const ADD_TODO = 'ADD_TODO';


export const addTodo = createAction(
  ADD_TODO,
  props<{payload: Todo}>()
)

