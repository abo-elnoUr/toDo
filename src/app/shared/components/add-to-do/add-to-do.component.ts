import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TodoService } from 'src/app/core/services/todo.service';

@Component({
  selector: 'app-add-to-do',
  templateUrl: './add-to-do.component.html',
  styleUrls: ['./add-to-do.component.scss']
})
export class AddToDoComponent implements OnInit {

  constructor(private _ToDoService:TodoService) { }


  listData = new FormGroup({
    title : new FormControl('', [Validators.required,Validators.minLength(4)]),
    description: new FormControl('', Validators.required),
    createdAt: new FormControl(new Date()),
    updatedAt: new FormControl(new Date()),
    status: new FormControl('pending'),
    deadline : new FormControl(new Date('Apr 20 2021'))
  })

  ngOnInit(): void {
  }

  get title() { return this.listData.get('title') as FormControl }
  get description() { return this.listData.get('description') as FormControl }

  onAdd()
  {
    this._ToDoService.addToDo(this.listData.value);
    this._ToDoService.insertedList.emit(this.listData.value);
    this.listData.reset();}

}
