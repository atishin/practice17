namespace TaskManager {
    export class TaskListComponent {

        constructor(public taskService: TaskService) {}

        //public tasks: ITask[] = [];

        public $onInit() {
            // for (let i = 0; i < 10; i ++) {
            //     this.tasks.push({
            //         id: i,
            //         text: `Task #${i + 1}`,
            //         finished: false
            //     });
            // }
        }

        public finishTask(task: ITask) {
            task.finished = true;
        } 

    }
    TaskListComponent.$inject = ['taskService']

    export const TaskListComponentDefinition: ng.IComponentOptions = {
        controller: TaskListComponent,
        template: 
`
    <div class="task-item" ng-repeat="task in $ctrl.taskService.tasks" ng-class="{finished: task.finished}">
        <span>{{ task.text }}</span>
        <button ng-click="$ctrl.finishTask(task)">Finish</button>
    </div>
`
    }

    MODULE.component('tmTaskList', TaskListComponentDefinition);
}