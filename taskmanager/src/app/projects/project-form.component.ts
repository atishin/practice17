namespace App {
    export class ProjectFormComponent implements ng.IOnInit {
        constructor(private projectService: TaskManager.ProjectService) {}
        
        public project: Partial<TaskManager.IProject> = {};

        public onProjectCreate: ({project: IProject}) => {}

        public $onInit() {
            console.log(this.onProjectCreate)
        }

        create() {
            this.projectService.Create(this.project).then(project => this.onProjectCreate({ project }));
        }
    }
    ProjectFormComponent.$inject = ['tmProjectService'];

    export const ProjectFormComponentDefinition: ng.IComponentOptions = {
        templateUrl: '/src/app/projects/project-form.template.html',
        controller: ProjectFormComponent,
        bindings: {
            onProjectCreate: '&',
            onProjectCancel: '&'
        }
    }

    MODULE.component('tmProjectForm', ProjectFormComponentDefinition);
}