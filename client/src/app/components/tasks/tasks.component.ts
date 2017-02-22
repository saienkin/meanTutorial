import { Component } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../../Task';

@Component({
  moduleId: module.id,
  selector: 'tasks',
  templateUrl: `./tasks.component.html`
})
export class TasksComponent  {
    tasks: Task[];
    title: string;

    constructor(private taskService:TaskService){
        this.taskService.getTasks()
            .subscribe(tasks => {
                this.tasks = tasks;
                // console.log(tasks);
            })
    }

    addTask(event:any){
        event.preventDefault();
        var newTask = {
            _id : '',
            title : this.title,
            isDone: false
        }

        this.taskService.addTask(newTask)
            .subscribe(tasks => {
                this.tasks.push(newTask);
                this.title='';
            })
    }

    deleteTask(id:any){

        this.taskService.deleteTask(id)
            .subscribe(date => {
                if(date.n == 1){
                    for(var i = 0; i < this.tasks.length; i++){
                        if(this.tasks[i]._id == id){
                            this.tasks.splice(i,1);
                        }
                    }
                }
            });
    }

    updateStatus(task:Task){
        var _task:Task =  {
            _id : task._id,
            title : task.title,
            isDone : !task.isDone
        }

        this.taskService.updateStatus(_task).subscribe(data =>{
            task.isDone = !task.isDone;
        })
    }
}