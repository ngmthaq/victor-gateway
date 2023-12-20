import { BaseModel } from "./base.model";

export class Todo extends BaseModel {
  public userId: number;
  public id: number;
  public title: string;
  public completed: boolean;

  public constructor(userId: number, id: number, title: string, completed: boolean) {
    super();
    this.userId = userId;
    this.id = id;
    this.title = title;
    this.completed = completed;
  }
}
