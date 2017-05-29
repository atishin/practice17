namespace TaskManager {
    export class TaskFormComponent {
        
        constructor(public taskService: TaskService) {}
        
        public static newId = 0;

        public task: ITask;

        public initTask() {
            this.task = {
                id: TaskFormComponent.newId ++,
                text: '',
                finished: false
            }
        }

        public create() {
            this.taskService.addTask(this.task);
            this.initTask();
        }
    }
    TaskFormComponent.$inject = ['taskService']

    export const TaskFormComponentDefinition: ng.IComponentOptions = {
        controller: TaskFormComponent,
        template: 
`
    <input ng-model="$ctrl.task.text">
    <button ng-click="$ctrl.create()">Create</button>
`
    }

    MODULE.component('tmTaskForm', TaskFormComponentDefinition);
}