export enum Status {
  pending, done, missed
}

export interface ToDo{
  id: number;
  title : string;
  description : string;
  status : Status;
  createdAt : Date;
  updatedAt : Date;
  deadline : Date;
  complete : boolean;
}
