namespace TaskManager {
    export class TaskService {

        constructor(public $cookies: ng.cookies.ICookiesService) {
            this.getTasks();
        }

        public tasks: ITask[] = [];

        public getTasks() {
            this.tasks = this.$cookies.getObject('tasks');
            if (this.tasks == undefined || this.tasks == null) {
                this.tasks = [];
                this.saveTasks(); 
            }
        }

        public saveTasks() {
            this.$cookies.putObject('tasks', this.tasks);
        }

        public addTask(task: ITask) {
            this.tasks.push(task);
            this.saveTasks();
        }
    }

    TaskService.$inject = ['$cookies'];

    MODULE.service('taskService', TaskService);
}