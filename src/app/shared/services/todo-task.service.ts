import { TodoTask } from './../todo-task.module';


export class TodoTaskService {

    constructor() { }


    taskArray: TodoTask[] = [
        new TodoTask( 1, 'Learn Angular 4', false),
        new TodoTask( 2, 'How to tell which card stores which tasks?', false),
        new TodoTask( 3, 'How to find oldest tasks?', false),
        new TodoTask( 4, 'What is the problem with task group in todo cards?', false),
        new TodoTask( 5, 'Binding to the data property: card & task', false), 
        new TodoTask( 6, 'Create custom directive - event: \'enter pressed \'  ', false),        
    ]

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
