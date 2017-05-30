var App;
(function (App) {
    var TaskFormDialogController = (function () {
        function TaskFormDialogController($mdDialog, taskService, projectService) {
            var _this = this;
            this.$mdDialog = $mdDialog;
            this.taskService = taskService;
            this.projectService = projectService;
            this.projects = [];
            this.task = {};
            this.statuses = [];
            this.projectService.GetProjects().then(function (projects) {
                _this.projects = projects;
            });
            this.taskService.GetStatuses().then(function (statuses) { return _this.statuses = statuses; });
        }
        Object.defineProperty(TaskFormDialogController.prototype, "projectIdBinding", {
            set: function (value) {
            },
            enumerable: true,
            configurable: true
        });
        TaskFormDialogController.prototype.create = function () {
            var _this = this;
            this.taskService.Create(this.task).then(function (task) { return _this.$mdDialog.hide(task); });
        };
        return TaskFormDialogController;
    }());
    App.TaskFormDialogController = TaskFormDialogController;
    TaskFormDialogController.$inject = ['$mdDialog', 'tmTaskService', 'tmProjectService'];
    var TaskListComponent = (function () {
        function TaskListComponent(taskService, $mdDialog) {
            this.taskService = taskService;
            this.$mdDialog = $mdDialog;
        }
        Object.defineProperty(TaskListComponent.prototype, "project", {
            set: function (value) {
                var _this = this;
                this.projectVal = value;
                if (this.projectVal) {
                    this.taskService.GetTasks(this.projectVal.Id).then(function (tasks) {
                        _this.tasks = tasks;
                    });
                }
            },
            enumerable: true,
            configurable: true
        });
        TaskListComponent.prototype.addTask = function () {
            var _this = this;
            this.$mdDialog.show({
                templateUrl: '/src/app/tasks/task-list.dialog.html',
                controller: TaskFormDialogController,
                clickOutsideToClose: true,
                escapeToClose: true,
                focusOnOpen: true,
                hasBackdrop: true,
                controllerAs: '$ctrl'
            }).then(function (task) {
                if (task && _this.projectVal && _this.projectVal.Id == task.ProjectId) {
                    _this.tasks.push(task);
                }
            });
        };
        return TaskListComponent;
    }());
    App.TaskListComponent = TaskListComponent;
    TaskListComponent.$inject = ['tmTaskService', '$mdDialog'];
    App.TaskListComponentDefinitions = {
        controller: TaskListComponent,
        templateUrl: '/src/app/tasks/task-list.template.html',
        bindings: {
            project: '<'
        }
    };
    App.MODULE.component('tmTaskList', App.TaskListComponentDefinitions);
})(App || (App = {}));
