import { EventEmitter, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ToDo } from 'src/app/shared/models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  date = new Date();
  insertedList = new EventEmitter<ToDo[]>();

  private lists: ToDo[] = [
    {title : 'study',
    description : 'Start study Tomorrow',
    status : 'pending',
    createdAt : this.date,
    updatedAt : this.date,
    deadline : this.date
  }
  ];


  constructor() { }

  getToDos()
  {
    return this.lists.slice();
  }

  addToDo(list : ToDo)
  {
    return this.lists.push(list);
  }

  getToDoBySearch(word: ToDo)
  {
    return of(this.lists.filter(w => w === word));
  }


  getWithIndex(index:number)
  {
    return this.lists[index]
  }

  updateList(index: number, data: ToDo)
  {
    return this.lists[index] = data;
  }

  doneStatus(index: number)
  {
    return this.lists[index].status = 'done';
  }
  pendingStatus(index: number)
  {
    return this.lists[index].status = 'pending';
  }

  missedStatus(index:number)
  {
    return this.lists[index].status = 'missed';
  }

  onDeleteToDo(index:number)
  {
    if (index > -1) {
       this.lists.splice(index,1)
    }
  }
}
