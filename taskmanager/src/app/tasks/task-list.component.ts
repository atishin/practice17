namespace App {

    export class TaskFormDialogController {

        public projects: TaskManager.IProject[] = [];
        public task: Partial<TaskManager.ITask> = {};
        public statuses: TaskManager.ITaskStatus[] = [];
        public projectId: number;
        public set projectIdBinding(value: number) {

        }

        constructor(private $mdDialog: ng.material.IDialogService, private taskService: TaskManager.TaskService, private projectService: TaskManager.ProjectService) {
            this.projectService.GetProjects().then(projects => {
                this.projects = projects;
            });
            this.taskService.GetStatuses().then(statuses => this.statuses = statuses);
        }

        public create() {
            this.taskService.Create(this.task).then(task => this.$mdDialog.hide(task));
        }


    }
    TaskFormDialogController.$inject = ['$mdDialog', 'tmTaskService', 'tmProjectService'];

    export class TaskListComponent {

        constructor(private taskService: TaskManager.TaskService, private $mdDialog: ng.material.IDialogService) {}

        public projectVal: TaskManager.IProject;
        public tasks: TaskManager.ITask[];
        public set project(value: TaskManager.IProject) {
            this.projectVal = value;
            if (this.projectVal) {
                this.taskService.GetTasks(this.projectVal.Id).then(tasks => {
                    this.tasks = tasks;
                });
            }
        }

        public addTask() {
            this.$mdDialog.show({
                templateUrl: '/src/app/tasks/task-list.dialog.html',
                controller: TaskFormDialogController,
                clickOutsideToClose: true,
                escapeToClose: true,
                focusOnOpen: true,
                hasBackdrop: true,
                controllerAs: '$ctrl'
            }).then((task: TaskManager.ITask) => {
                if (task && this.projectVal && this.projectVal.Id == task.ProjectId) {
                    this.tasks.push(task);
                }
            });
        }

    }
    TaskListComponent.$inject = ['tmTaskService', '$mdDialog'];
    export const TaskListComponentDefinitions: ng.IComponentOptions = {
        controller: TaskListComponent,
        templateUrl: '/src/app/tasks/task-list.template.html',
        bindings: {
            project: '<'
        }
    }

    MODULE.component('tmTaskList', TaskListComponentDefinitions);
}