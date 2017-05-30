namespace App {
    export class TaskListComponent implements ng.IOnChanges {
        
        public projectVal: TaskManager.IProject;
        public tasks: TaskManager.ITask[];
        public set project(value: TaskManager.IProject) {
            this.projectVal = value;
        }

        $onChanges(onChangesObj: angular.IOnChangesObject): void {
            if ('project' in onChangesObj && !onChangesObj['project'].isFirstChange()) {
                this.project = onChangesObj['project'].currentValue;
            }
        }

    }
    export const TaskListComponentDefinitions: ng.IComponentOptions = {
        controller: TaskListComponent,
        templateUrl: '/src/app/tasks/task-list.template.html',
        bindings: {
            project: '<'
        }
    }

    MODULE.component('tmTaskList', TaskListComponentDefinitions);
}