var TaskManager;
(function (TaskManager) {
    var StorageService = (function () {
        function StorageService() {
        }
        StorageService.prototype.getItem = function (key) {
            var rawItem = localStorage.getItem(key);
            if (!rawItem) {
                return null;
            }
            return JSON.parse(rawItem);
        };
        StorageService.prototype.setItem = function (key, item) {
            localStorage.setItem(key, JSON.stringify(item));
        };
        StorageService.prototype.removeItem = function (key) {
            localStorage.removeItem(key);
        };
        return StorageService;
    }());
    TaskManager.StorageService = StorageService;
    TaskManager.API_URL = 'http://final-tm.azurewebsites.net';
    var AuthService = (function () {
        function AuthService(storage, $http) {
            this.storage = storage;
            this.$http = $http;
        }
        AuthService.prototype.IsAuthenticated = function () {
            var token = this.storage.getItem('token');
            console.log(token);
            if (!token) {
                return false;
            }
            return true;
        };
        AuthService.prototype.SignIn = function (login, password) {
            var _this = this;
            var promise = this.$http.post(TaskManager.API_URL + "/Token", "userName=" + login + "&password=" + password + "&grant_type=password").then(function (r) { return r.data; });
            promise.then(function (data) {
                _this.storage.setItem('token', data);
                return data;
            });
            return promise;
        };
        AuthService.prototype.SignOut = function () {
            this.storage.removeItem('token');
        };
        AuthService.prototype.GetUserId = function () {
            var token = this.storage.getItem('token');
            return token.userId;
        };
        return AuthService;
    }());
    TaskManager.AuthService = AuthService;
    AuthService.$inject = ['tmStorageService', '$http'];
    var ProjectService = (function () {
        function ProjectService(auth, $http, $q) {
            this.auth = auth;
            this.$http = $http;
            this.$q = $q;
        }
        ProjectService.prototype.GetProjects = function () {
            var defered = this.$q.defer();
            if (!this.auth.IsAuthenticated()) {
                defered.reject('Not authorized');
            }
            else {
                this.$http.get(TaskManager.API_URL + "/odata/OProjects").then(function (r) { return r.data; }).then(function (data) { return defered.resolve(data.value); });
            }
            return defered.promise;
        };
        ProjectService.prototype.Create = function (project) {
            var defered = this.$q.defer();
            if (!this.auth.IsAuthenticated()) {
                defered.reject('Not authorized');
            }
            else {
                delete project.Manager;
                delete project.ProjectChat;
                delete project.Tasks;
                project.ManagerId = this.auth.GetUserId();
                this.$http.post(TaskManager.API_URL + "/odata/OProjects", project).then(function (r) { return r.data; }).then(function (data) { return defered.resolve(data); });
            }
            return defered.promise;
        };
        return ProjectService;
    }());
    TaskManager.ProjectService = ProjectService;
    ProjectService.$inject = ['tmAuthService', '$http', '$q'];
    var TaskService = (function () {
        function TaskService(auth, $http, $q) {
            this.auth = auth;
            this.$http = $http;
            this.$q = $q;
        }
        TaskService.prototype.GetTasks = function (projectId) {
            var defered = this.$q.defer();
            if (!this.auth.IsAuthenticated()) {
                defered.reject('Not authorized');
            }
            else {
                this.$http.get(TaskManager.API_URL + "/odata/OProjectTasks?$expand=TaskStatus&$filter=ProjectId eq " + projectId)
                    .then(function (r) { return r.data; }, defered.reject).then(function (data) { return defered.resolve(data.value); });
            }
            return defered.promise;
        };
        TaskService.prototype.GetTask = function (id) {
            var defered = this.$q.defer();
            if (!this.auth.IsAuthenticated()) {
                defered.reject('Not authorized');
            }
            else {
                this.$http.get(TaskManager.API_URL + "/odata/OTaskStatus(" + id + ")").then(function (r) { return r.data; }, defered.reject);
            }
            return defered.promise;
        };
        TaskService.prototype.SetStatus = function (taskId, statusId) {
            var _this = this;
            var defered = this.$q.defer();
            if (!this.auth.IsAuthenticated()) {
                defered.reject('Not authorized');
            }
            else {
                this.GetTask(taskId).then(function (task) {
                    delete task.ClosedByUser;
                    delete task.Project;
                    delete task.TaskStatus;
                    task.TaskStatusId = statusId;
                    _this.$http.put(TaskManager.API_URL + "/odata/OTaskStatus(" + taskId + ")", task).then(function (r) { return defered.resolve(r.data); }, defered.reject);
                }, defered.reject);
            }
            return defered.promise;
        };
        TaskService.prototype.GetStatuses = function () {
            var defered = this.$q.defer();
            if (!this.auth.IsAuthenticated()) {
                defered.reject('Not authorized');
            }
            else {
                this.$http.get(TaskManager.API_URL + "/odata/OTaskStatus").then(function (r) { return r.data; }, defered.reject).then(function (data) { return defered.resolve(data.value); });
            }
            return defered.promise;
        };
        TaskService.prototype.Create = function (task) {
            var defered = this.$q.defer();
            if (!this.auth.IsAuthenticated()) {
                defered.reject('Not authorized');
            }
            else {
                delete task.ClosedByUser;
                delete task.Project;
                delete task.TaskStatus;
                task.StartDate = new Date();
                this.$http.post(TaskManager.API_URL + "/odata/OProjectTasks", task).then(function (r) { return r.data; }, defered.reject).then(function (data) { return defered.resolve(data); });
            }
            return defered.promise;
        };
        return TaskService;
    }());
    TaskManager.TaskService = TaskService;
    TaskService.$inject = ['tmAuthService', '$http', '$q'];
    TaskManager.MODULE = angular.module('taskmanager', []);
    TaskManager.MODULE.service('tmStorageService', StorageService);
    TaskManager.MODULE.service('tmAuthService', AuthService);
    TaskManager.MODULE.service('tmProjectService', ProjectService);
    TaskManager.MODULE.service('tmTaskService', TaskService);
})(TaskManager || (TaskManager = {}));
