/// <reference types="angular" />
/// <reference types="angular-animate" />
declare namespace TaskManager {
    interface ITokenData {
        access_token: string;
        expires_in: number;
        token_type: string;
        userId: string;
        userName: string;
        '.issued': string;
        '.expires': string;
    }
    class StorageService {
        getItem<T>(key: string): T;
        setItem(key: string, item: any): void;
        removeItem(key: string): void;
    }
    const API_URL = "http://final-tm.azurewebsites.net";
    class AuthService {
        private storage;
        private $http;
        constructor(storage: StorageService, $http: ng.IHttpService);
        IsAuthenticated(): boolean;
        SignIn(login: string, password: string): angular.IPromise<ITokenData>;
        SignOut(): void;
        GetUserId(): string;
    }
    interface IApplicationUser {
        Id: string;
        UserName: string;
    }
    interface ITask {
        Id: number;
        Title: string;
        Description: string;
        StartDate: Date;
        EndDate: Date;
        ClosedByUserId: string;
        ProjectId: number;
        TaskStatusId: number;
        ClosedByUser: IApplicationUser;
        Project: IProject;
        TaskStatus: ITaskStatus;
    }
    interface IMessage {
        Id: number;
        Text: string;
        MessageTime: Date;
        ProjectChatId: number;
        UserId: string;
        ProjectChat: IProjectChat;
        User: IApplicationUser;
    }
    interface ITaskStatus {
        Id: Number;
        StatusText: string;
        Tasks: ITask[];
    }
    interface IProjectChat {
        Id: number;
        Project: IProject;
        Messages: IMessage[];
    }
    interface IProject {
        Id: number;
        Title: string;
        Description: string;
        ManagerId: string;
        Manager: IApplicationUser;
        Tasks: ITask[];
        ProjectChat: IProjectChat;
    }
    class ProjectService {
        private auth;
        private $http;
        private $q;
        constructor(auth: AuthService, $http: ng.IHttpService, $q: ng.IQService);
        GetProjects(): ng.IPromise<IProject[]>;
        Create(project: Partial<IProject>): ng.IPromise<IProject>;
    }
    class TaskService {
        private auth;
        private $http;
        private $q;
        constructor(auth: AuthService, $http: ng.IHttpService, $q: ng.IQService);
        GetTasks(projectId: number): ng.IPromise<ITask[]>;
        GetTask(id: number): ng.IPromise<ITask>;
        SetStatus(taskId: number, statusId: number): angular.IPromise<{}>;
        GetStatuses(): ng.IPromise<ITaskStatus[]>;
        Create(task: Partial<ITask>): ng.IPromise<ITask>;
    }
    const MODULE: angular.IModule;
}
