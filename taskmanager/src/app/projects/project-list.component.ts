namespace App {
    export class ProjectListComponent implements ng.IOnInit {

        constructor(private projectService: TaskManager.ProjectService) {}
        
        public projects: TaskManager.IProject[];

        public selectedProject: TaskManager.IProject = null;

        public isProjectFormActive = false;


        public $onInit() {
            this.projectService.GetProjects().then(projects => {
                console.log(projects);
                this.projects = projects
            });
        }

        public onProjectCreate(project: TaskManager.IProject) {
            this.projects.push(project);
            this.isProjectFormActive = false;
        }

        public onProjectCancel() {
            this.isProjectFormActive = false;
        }

        public addProject() {
            this.isProjectFormActive = true;
        }

        public selectProject(project: TaskManager.IProject) {
            this.selectedProject = project;
        }
    }
    ProjectListComponent.$inject = ['tmProjectService'];

    export const ProjectListComponentDefinition: ng.IComponentOptions = {
        templateUrl: '/src/app/projects/project-list.template.html',
        controller: ProjectListComponent
    }

    MODULE.component('tmProjectList', ProjectListComponentDefinition);
}