import { Task } from '../models/task';
import { FilterTaskPipe } from './filter-task.pipe';

const task1 = new Task("1");
task1.completed = true;
const task2 = new Task("2");
const task3 = new Task("3");
const task4 = new Task("4");
const tasks = [
  task1,
  task2,
  task3,
  task4
];


describe('FilterTaskPipe', () => {
  const pipe = new FilterTaskPipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return only completed tasks', () => {
    const completedTask = pipe.transform(tasks);
    expect(completedTask.length).toBe(3);
  });


  it('should return only uncompleted tasks', () => {
    const completedTask = pipe.transform(tasks, true);
    expect(completedTask.length).toBe(1);
  });
});
