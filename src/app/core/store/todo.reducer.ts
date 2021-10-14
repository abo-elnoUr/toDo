import { Status, ToDo } from 'src/app/shared/models/todo.model';
import { Todo } from 'src/app/shared/models/todo-state.model';
import * as ToDoAction from './todo.action';
import { createReducer, on, Action } from '@ngrx/store';

// export interface TodoState {
  // id: number;
  // title : string;
  // description : string;
  // status : Status;
  // createdAt : Date;
  // updatedAt : Date;
  // deadline : Date;
  // complete : boolean;
  // todo : Todo
// }

export interface TodoState {
  todo : Todo[]
}

 const initialState : TodoState = {
  todo: [new Todo(1,'hello','Start',Status.pending,new Date(),new Date(),new Date(),false),new Todo(2,'hello again','Start end',Status.pending,new Date(),new Date(),new Date(),false)]
};


interface Actions
{
  type : string,
  payload : Todo
}

export const Reducer = createReducer(initialState,
  on(ToDoAction.addTodo, (state = initialState, action: Actions) => ({
    ...state,
    ingredients: [...state.todo, action.payload]
  }))

  )

