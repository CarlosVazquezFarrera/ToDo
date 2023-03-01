export class Task {
  constructor(text: string){
    this.id = crypto.randomUUID();
    this.completed = false;
    this.text = text;
  }
  public id: string;
  public text: string;
  public completed: boolean;
}
