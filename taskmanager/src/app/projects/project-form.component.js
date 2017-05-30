var App;
(function (App) {
    var ProjectFormComponent = (function () {
        function ProjectFormComponent(projectService) {
            this.projectService = projectService;
            this.project = {};
        }
        ProjectFormComponent.prototype.$onInit = function () {
            console.log(this.onProjectCreate);
        };
        ProjectFormComponent.prototype.create = function () {
            var _this = this;
            this.projectService.Create(this.project).then(function (project) { return _this.onProjectCreate({ project: project }); });
        };
        return ProjectFormComponent;
    }());
    App.ProjectFormComponent = ProjectFormComponent;
    ProjectFormComponent.$inject = ['tmProjectService'];
    App.ProjectFormComponentDefinition = {
        templateUrl: '/src/app/projects/project-form.template.html',
        controller: ProjectFormComponent,
        bindings: {
            onProjectCreate: '&',
            onProjectCancel: '&'
        }
    };
    App.MODULE.component('tmProjectForm', App.ProjectFormComponentDefinition);
})(App || (App = {}));
