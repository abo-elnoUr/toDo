import { EventEmitter, Injectable } from '@angular/core';
import { ToDo, Status } from 'src/app/shared/models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  // declartion

  date = new Date();
  insertedList = new EventEmitter<ToDo[]>();
  list :ToDo[] = [];
  lastId: number = 0;

  // lists dumy data

  private lists: ToDo[] = [
  //   {id: 1,
  //   title : 'study',
  //   description : 'Start study Tomorrow',
  //   status : Status.pending,
  //   createdAt : this.date,
  //   updatedAt : this.date,
  //   deadline : this.date,
  //   complete : false
  // },
  // {id: 2,
  //   title : 'play',
  //   description : 'Start play now',
  //   status : Status.done,
  //   createdAt : this.date,
  //   updatedAt : this.date,
  //   deadline : this.date,
  //   complete : true
  // },
  // {id: 3,
  //   title : 'Sports',
  //   description : 'sports',
  //   status : Status.missed,
  //   createdAt : this.date,
  //   updatedAt : this.date,
  //   deadline : this.date,
  //   complete : false
  // }
  ];


  constructor() { }

  // get all todos

  getToDos(id?: number)
  {
      return this.lists.slice();
  }

  // add todo to todos

  addToDo(list : ToDo)
  {
    if (!list.id) {
      list.id = ++this.lastId;
    }
    this.lists.push(list);
    return this;
  }

  // get todo by id

  getById(id:number)
  {
    return this.lists.filter(list => list.id == id);
  }

  // update todo

  updateList(id: number, data: ToDo)
  {
    let todo = this.getById(id).pop();
    Object.assign(todo, data);
    return todo;
  }

  // change status of todo

  doneStatus(id: number)
  {
    let list = this.getById(id);
    if (list[0].status === Status.done) {
      list[0].status = Status.done;
      list[0].complete = true;
    }
    else
    {
      list[0].status = Status.done;
      list[0].complete = true;
    }
  }
  pendingStatus(id: number)
  {
    let list = this.getById(id);
    if (list[0].status === Status.pending) {
      list[0].status = Status.pending;
      list[0].complete = false;
    }
    else
    {
      list[0].status = Status.pending;
      list[0].complete = false;
    }
  }

  // delete todo from todos

  onDeleteToDo(id:number)
  {
    this.lists = this.lists
      .filter(list => list.id !== id);
    return this;
  }
}
