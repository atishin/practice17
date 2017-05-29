var TaskManager;
(function (TaskManager) {
    var TaskFormComponent = (function () {
        function TaskFormComponent(taskService) {
            this.taskService = taskService;
        }
        TaskFormComponent.prototype.initTask = function () {
            this.task = {
                id: TaskFormComponent.newId++,
                text: '',
                finished: false
            };
        };
        TaskFormComponent.prototype.create = function () {
            this.taskService.addTask(this.task);
            this.initTask();
        };
        return TaskFormComponent;
    }());
    TaskFormComponent.newId = 0;
    TaskManager.TaskFormComponent = TaskFormComponent;
    TaskFormComponent.$inject = ['taskService'];
    TaskManager.TaskFormComponentDefinition = {
        controller: TaskFormComponent,
        template: "\n    <input ng-model=\"$ctrl.task.text\">\n    <button ng-click=\"$ctrl.create()\">Create</button>\n"
    };
    TaskManager.MODULE.component('tmTaskForm', TaskManager.TaskFormComponentDefinition);
})(TaskManager || (TaskManager = {}));
