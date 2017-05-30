var App;
(function (App) {
    var ProjectListComponent = (function () {
        function ProjectListComponent(projectService) {
            this.projectService = projectService;
            this.selectedProject = null;
            this.isProjectFormActive = false;
        }
        ProjectListComponent.prototype.$onInit = function () {
            var _this = this;
            this.projectService.GetProjects().then(function (projects) {
                console.log(projects);
                _this.projects = projects;
            });
        };
        ProjectListComponent.prototype.onProjectCreate = function (project) {
            this.projects.push(project);
            this.isProjectFormActive = false;
        };
        ProjectListComponent.prototype.onProjectCancel = function () {
            this.isProjectFormActive = false;
        };
        ProjectListComponent.prototype.addProject = function () {
            this.isProjectFormActive = true;
        };
        ProjectListComponent.prototype.selectProject = function (project) {
            this.selectedProject = project;
        };
        return ProjectListComponent;
    }());
    App.ProjectListComponent = ProjectListComponent;
    ProjectListComponent.$inject = ['tmProjectService'];
    App.ProjectListComponentDefinition = {
        templateUrl: '/src/app/projects/project-list.template.html',
        controller: ProjectListComponent
    };
    App.MODULE.component('tmProjectList', App.ProjectListComponentDefinition);
})(App || (App = {}));
