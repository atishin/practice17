var App;
(function (App) {
    var TaskListComponent = (function () {
        function TaskListComponent() {
        }
        Object.defineProperty(TaskListComponent.prototype, "project", {
            set: function (value) {
                this.projectVal = value;
            },
            enumerable: true,
            configurable: true
        });
        TaskListComponent.prototype.$onChanges = function (onChangesObj) {
            if ('project' in onChangesObj && !onChangesObj['project'].isFirstChange()) {
                this.project = onChangesObj['project'].currentValue;
            }
        };
        return TaskListComponent;
    }());
    App.TaskListComponent = TaskListComponent;
    App.TaskListComponentDefinitions = {
        controller: TaskListComponent,
        templateUrl: '/src/app/tasks/task-list.template.html',
        bindings: {
            project: '<'
        }
    };
    App.MODULE.component('tmTaskList', App.TaskListComponentDefinitions);
})(App || (App = {}));
