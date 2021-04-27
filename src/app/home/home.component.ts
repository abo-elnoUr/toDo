import { TodoService } from './../core/services/todo.service';
import { Component, OnInit } from '@angular/core';
import { ToDo } from '../shared/models/todo.model';
import { FormGroup, FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // declartion

  lists: ToDo[]=[];
  list: any = [];
  index : number = 0;
  changeState : boolean = false;
  marked = false;
  usersArray: [] = [];
  search: string = '';
  status : string = '';
  activeLinkStyle = 'line-through';
  start : number = 0;
  end : number = 3;
  num:number[] = [];
  result : number = 0;
  i : number = 0;
  j : number = 0;
  m : number = 0;
  f : number = 0;



  constructor(private _ToDoService:TodoService, private _Router: Router) {

  }

  // froms in reactive form

  searchForm = new FormGroup({
    search : new FormControl()
  })

  toggleForm = new FormGroup({
    toggle : new FormControl(null)
  })



  ngOnInit(): void {
    // get all todos

    this.lists = this._ToDoService.getToDos();
    this._ToDoService.insertedList.subscribe(result => {
      this.lists = result;
    })


    this.searchForm.valueChanges.pipe(debounceTime(500), distinctUntilChanged()).subscribe((wrod) => {
      if (wrod.search) {
        this.lists = this.getToDoBySearch(this.lists, wrod.search);
      }
      else {
        this.lists = this._ToDoService.getToDos();
        this._ToDoService.insertedList.subscribe(result => {
          this.lists = result;
        })

      }
    });

    // change status value depending on time

    // for(let i =0; i< this.lists.length; i++)
    // {
    //   if(this.lists[i].status === 0)
    //   {
    //     setInterval(() => this._ToDoService.missedStatus(i), 5000);
    //   }
    //   if(this.lists[i].status === 1) {
    //     this.lists[i].status = 'done'
    //     }
    // }
  }

  // search in todo by word

  getToDoBySearch(list: ToDo[],word: string)
  {
    if (list.length === 0) {
      return list;
    }
    const searchArray = [];
    for (let item of list)
    {
      if (item['title'].includes(word))
      {
        searchArray.push(item);
      }
    }
    return searchArray;
  }

  // navigate to edit page with id

  onEdit(index: number)
  {
    this._Router.navigate(['edit/'+index])
  }

  // change status of todo

  toggleVisibility(e:any,id:number){
    this.marked= e.target.checked;
    if (this.marked == true) {
      this._ToDoService.doneStatus(id);
    }
    else
    {
      this._ToDoService.pendingStatus(id);
    }
  }

  // delete todo from todos

  onDelete(id: number)
  {
    this._ToDoService.onDeleteToDo(id);
    this.lists = this._ToDoService.getToDos();
    this._ToDoService.insertedList.subscribe(result => {
      this.lists = result;
    })
  }


  numberArray(length: number)
  {
    this.i = length / 3;
    this.j = length % 3;
    this.m = Math.round(this.i);
    if (this.j <= 5) {
      this.f = this.m + 1;
    }
    return new Array(this.f)
  }

  changeNumber(number : number)
  {
    this.start = number * 3;
    this.end = this.start + 3;
  }

}
