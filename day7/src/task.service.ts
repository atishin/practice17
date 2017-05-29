namespace TaskManager {
    export class TaskService {
        public tasks: ITask[] = [];

        public addTask(task: ITask) {
            this.tasks.push(task);
        }
    }

    MODULE.service('taskService', TaskService);
}