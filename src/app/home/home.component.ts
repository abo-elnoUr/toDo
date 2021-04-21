import { Observable } from 'rxjs';
import { TodoService } from './../core/services/todo.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ToDo } from '../shared/models/todo.model';
import { FormGroup, FormControl, Validators, NgModel } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  editMode:boolean = false;
  lists: ToDo[]=[];
  list: any = [];
  index : number = 0;
  changeState : boolean = false;
  marked = false;
  usersArray: [] = [];
  search: string = '';
  index_mine:number = 0;


  @ViewChild('searchElem') searchElem!: NgModel;

  constructor(private _ToDoService:TodoService) {

  }

  get title() { return this.listForm.get('title') as FormControl }
  get description() { return this.listForm.get('description') as FormControl }

  listForm = new FormGroup({
    title : new FormControl('', [Validators.required,Validators.minLength(4)]),
    description: new FormControl('', Validators.required),
    createdAt: new FormControl(),
    updatedAt: new FormControl(new Date()),
    status: new FormControl(),
    deadline : new FormControl()
  })

  searchForm = new FormGroup({
    search : new FormControl()
  })

  ngOnInit(): void {
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
          console.log('null')
        })

      }
    });
    // for(let i =0; i< this.lists.length; i++)
    // {
    //   if(this.lists[i].status === 'pending')
    //   {
    //     setInterval(() => this._ToDoService.missedStatus(i), 5000);
    //   }
    //   if(this.lists[i].status === 'done') {
    //     this.lists[i].status = 'done'
    //     }
    // }
  }


  getToDoBySearch(list: ToDo[],word: string)
  {
    if (list.length === 0) {
      return list;
    }
    const searchArray = [];
    for (let item of list)
    {
      if (item['title'] === word)
      {
        searchArray.push(item);
      }
    }
    return searchArray;
  }

  onEdit(index: number)
  {
    this.editMode = true;
    this.index = index;
    this.list = this.lists[index];
    this.listForm.patchValue({
      title: this.list.title,
      description: this.list.description,
      status : this.list.status,
      createdAt : this.list.createdAt,
      deadline : this.list.deadline
    })

  }

  onUpdate()
  {
    this._ToDoService.updateList(this.index, this.listForm.value);
    this.lists = this._ToDoService.getToDos();
    this._ToDoService.insertedList.subscribe(result => {
      this.lists = result;
    })
    this.editMode = false;
  }

  toggleVisibility(e:any,index:number){
    this.marked= e.target.checked;
    if (this.marked == true) {
      this._ToDoService.doneStatus(index)
    }
    else
    {
      this._ToDoService.pendingStatus(index)
    }
  }

  onDelete(index: number)
  {
    this._ToDoService.onDeleteToDo(index);
    this.lists = this._ToDoService.getToDos();
    this._ToDoService.insertedList.subscribe(result => {
      this.lists = result;
    })
  }


  getColor() {
    let color = 'blue';
    if (this.listForm.value.status === 'pending') {
      color = 'blue';
    }
    if (this.listForm.value.status === 'done') {
      color = 'green';
    }
    if (this.listForm.value.status === 'missed') {
      color = 'red';
    }
    return color;
  }

}
