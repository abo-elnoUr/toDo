import { Status } from 'src/app/shared/models/todo.model';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TodoService } from 'src/app/core/services/todo.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-to-do',
  templateUrl: './add-to-do.component.html',
  styleUrls: ['./add-to-do.component.scss']
})
export class AddToDoComponent implements OnInit {
  id : number = 0;

  constructor(private _ToDoService:TodoService, private _Router: Router) { }

  // from in reactive form

  listData = new FormGroup({
    id: new FormControl(),
    title : new FormControl('', [Validators.required,Validators.minLength(4)]),
    description: new FormControl('', Validators.required),
    createdAt: new FormControl(new Date()),
    updatedAt: new FormControl(new Date()),
    status: new FormControl(Status.pending, Validators.required),
    deadline : new FormControl( Validators.required)
  })

  // function to catch all controls to validation

  get listFormValidate() {return this.listData.controls};
  ngOnInit(): void {
  }


  // add new todo

  onAdd()
  {
  //  this.listData.value.id = this.getRandomId();
    this._ToDoService.addToDo(this.listData.value);
    this._ToDoService.insertedList.emit(this.listData.value);
    this.listData.reset();
    this._Router.navigate(['/'])
  }

  // get random id to store with todo

  getRandomId()
  {
    return Math.floor((Math.random()*100)+1);
  }

}
