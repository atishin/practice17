var TaskManager;
(function (TaskManager) {
    var TaskService = (function () {
        function TaskService() {
            this.tasks = [];
        }
        TaskService.prototype.addTask = function (task) {
            this.tasks.push(task);
        };
        return TaskService;
    }());
    TaskManager.TaskService = TaskService;
    TaskManager.MODULE.service('taskService', TaskService);
})(TaskManager || (TaskManager = {}));
