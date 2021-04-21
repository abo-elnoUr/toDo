export interface ToDo{
  title : string;
  description : string;
  status : string;
  createdAt : Date;
  updatedAt ?: Date;
  deadline ?: Date;
}
