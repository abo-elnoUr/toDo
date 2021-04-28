import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgModel } from '@angular/forms';
import { TodoService } from 'src/app/core/services/todo.service';
import { ToDo } from '../../models/todo.model';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-mange-to-do',
  templateUrl: './mange-to-do.component.html',
  styleUrls: ['./mange-to-do.component.scss']
})
export class MangeToDoComponent implements OnInit {

  // declartion

  lists: ToDo[]=[];
  id;
  submitted : boolean = false;
  currentId : number = 0;
  status : string = '';



  constructor(private _ToDoService:TodoService, private _ActivatedRoute:ActivatedRoute, private _Router: Router) {

    // get id from url

    this.id = this._ActivatedRoute.snapshot.paramMap.get('id');
  }

  // from in reactive form

  listForm = new FormGroup({
    id: new FormControl(),
    title : new FormControl('', [Validators.required,Validators.minLength(4)]),
    description: new FormControl('', Validators.required),
    createdAt: new FormControl(),
    updatedAt: new FormControl(new Date()),
    status: new FormControl(null, Validators.required),
    deadline : new FormControl(null, Validators.required)
  })

  // function to catch all controls to validation

  get listFormValidate() {return this.listForm.controls};

  ngOnInit(): void {

    // convert id to number

    this.currentId = JSON.parse(this.id || '{}');

    // get current todo of active id to show and edit

    this.lists = this._ToDoService.getById(this.currentId);
    // for(let s =0; s< this.lists.length; s++)
    // {
    //   if (this.lists[s].status === 0)
    //   {
    //     this.status = 'pending';
    //   }
    //   if (this.lists[s].status === 1)
    //   {
    //     this.status = 'done';
    //   }
    //   if(this.lists[s].status === 2)
    //   {
    //     this.status = 'missed';
    //   }
    // }

    // to assign values to each input in form

    this.listForm.patchValue({
      id : this.lists[0].id,
      title : this.lists[0].title,
      description : this.lists[0].description,
      status : this.lists[0].status,
      deadline : this.lists[0].deadline,
      createdAt : this.lists[0].createdAt,
      updatedAt : new Date()
    })
  }

  // update todo and store

  onUpdate()
  {
    if (this.listForm.value.status == 1) {
      this.listForm.value.complete = true;
    }
    else
    {
      this.listForm.value.complete = false;
    }
    this.listForm.value.status = parseInt(this.listForm.value.status);
    this._ToDoService.updateList(this.currentId, this.listForm.value);
    this.lists = this._ToDoService.getToDos();
    this._ToDoService.insertedList.subscribe(result => {
      this.lists = result;
    })
    this._Router.navigate(['/']);
  }
}
