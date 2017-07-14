import { TodoTask } from './../todo-task.module';


export class TodoTaskService {

    constructor() { }


    taskArray: TodoTask[] = []

    addNewTask( description:string, checked?: boolean ){
        let id: number              = this.getTaskID();
        let taskDescription: string = description;
        let checkedStatus: boolean  = this.getCheckedStatus(checked);

        let newTask: TodoTask = new TodoTask( id, taskDescription, checkedStatus );
        this.taskArray.unshift( newTask );
    }

    getTasks(): TodoTask[] {
        return this.taskArray;
    }


    getTaskID():number {
        return this.taskArray.length;
    }
    getCheckedStatus( checked: boolean ): boolean{
        let checkStatus:boolean = checked ? checked : false;
        return checkStatus;
    }

    // EDITS
    onTaskStatusChange( taskID: number, taskStatus: boolean ){
        for( let i = 0; i < this.taskArray.length; i++ ){
            if( this.taskArray[i]['id'] === taskID ){
                this.taskArray[i]['checked'] = taskStatus;
                // push checked elements to the back of an array?
            }
        }
    }
   
}
