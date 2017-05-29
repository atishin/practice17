var TaskManager;
(function (TaskManager) {
    var TaskService = (function () {
        function TaskService($cookies) {
            this.$cookies = $cookies;
            this.tasks = [];
            this.getTasks();
        }
        TaskService.prototype.getTasks = function () {
            this.tasks = this.$cookies.getObject('tasks');
            if (this.tasks == undefined || this.tasks == null) {
                this.tasks = [];
                this.saveTasks();
            }
        };
        TaskService.prototype.saveTasks = function () {
            this.$cookies.putObject('tasks', this.tasks);
        };
        TaskService.prototype.addTask = function (task) {
            this.tasks.push(task);
            this.saveTasks();
        };
        return TaskService;
    }());
    TaskManager.TaskService = TaskService;
    TaskService.$inject = ['$cookies'];
    TaskManager.MODULE.service('taskService', TaskService);
})(TaskManager || (TaskManager = {}));
