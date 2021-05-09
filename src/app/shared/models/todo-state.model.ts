import { Status } from "./todo.model";

export class Todo
{
  constructor(public id:number,public title:string,public description:string,public status:Status,public createdAt:Date,public updatedAt:Date,public deadline:Date,public complete:boolean){}
}
