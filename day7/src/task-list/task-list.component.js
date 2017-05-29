var TaskManager;
(function (TaskManager) {
    var TaskListComponent = (function () {
        function TaskListComponent(taskService) {
            this.taskService = taskService;
        }
        //public tasks: ITask[] = [];
        TaskListComponent.prototype.$onInit = function () {
            // for (let i = 0; i < 10; i ++) {
            //     this.tasks.push({
            //         id: i,
            //         text: `Task #${i + 1}`,
            //         finished: false
            //     });
            // }
        };
        TaskListComponent.prototype.finishTask = function (task) {
            task.finished = true;
        };
        return TaskListComponent;
    }());
    TaskManager.TaskListComponent = TaskListComponent;
    TaskListComponent.$inject = ['taskService'];
    TaskManager.TaskListComponentDefinition = {
        controller: TaskListComponent,
        templateUrl: '/src/task-list/task-list.template.html'
    };
    TaskManager.MODULE.component('tmTaskList', TaskManager.TaskListComponentDefinition);
})(TaskManager || (TaskManager = {}));
