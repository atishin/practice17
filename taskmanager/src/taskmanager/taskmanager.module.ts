namespace TaskManager {

    export interface ITokenData {
        access_token: string;
        expires_in: number;
        token_type: string;
        userId: string;
        userName: string;
        '.issued': string;
        '.expires': string;
    }

    export class StorageService {
        getItem<T>(key: string) {
            const rawItem = localStorage.getItem(key);
            if (!rawItem) {
                return null;
            }
            return JSON.parse(rawItem) as T;
        }

        setItem(key: string, item: any) {
            localStorage.setItem(key, JSON.stringify(item));
        }

        removeItem(key: string) {
            localStorage.removeItem(key);
        }
    }

    export const API_URL = 'http://final-tm.azurewebsites.net'

    export class AuthService {


        constructor(private storage: StorageService, private $http: ng.IHttpService) { }

        public IsAuthenticated(): boolean {
            const token = this.storage.getItem<ITokenData>('token');
            console.log(token);
            if (!token) {
                return false;
            }
            return true;
        }

        public SignIn(login: string, password: string) {
            const promise = this.$http.post<ITokenData>(`${API_URL}/Token`, `userName=${login}&password=${password}&grant_type=password`).then(r => r.data);
            promise.then(data => {
                this.storage.setItem('token', data);
                return data;
            });
            return promise;
        }

        public SignOut() {
            this.storage.removeItem('token');
        }

        public GetUserId() {
            const token = this.storage.getItem<ITokenData>('token');
            return token.userId;
        }


    }
    AuthService.$inject = ['tmStorageService', '$http'];

    export interface IApplicationUser {
        Id: string;
        UserName: string;
    }

    export interface ITask {
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

    export interface IMessage {
        Id: number;
        Text: string;
        MessageTime: Date;
        ProjectChatId: number;
        UserId: string;
        ProjectChat: IProjectChat;
        User: IApplicationUser;
    }

    export interface ITaskStatus {
        Id: Number;
        StatusText: string;
        Tasks: ITask[];
    }

    export interface IProjectChat {
        Id: number;
        Project: IProject;
        Messages: IMessage[];
    }

    export interface IProject {

        Id: number;
        Title: string;
        Description: string;
        ManagerId: string;
        Manager: IApplicationUser;
        Tasks: ITask[];
        ProjectChat: IProjectChat;
    }

    export class ProjectService {
        constructor(private auth: AuthService, private $http: ng.IHttpService, private $q: ng.IQService) { }

        public GetProjects(): ng.IPromise<IProject[]> {
            const defered = this.$q.defer();
            if (!this.auth.IsAuthenticated()) {
                defered.reject('Not authorized');
            } else {
                this.$http.get<any>(`${API_URL}/odata/OProjects`).then(r => r.data).then(data => defered.resolve(data.value));
            }
            return defered.promise;
        }

        public Create(project: Partial<IProject>): ng.IPromise<IProject> {
            const defered = this.$q.defer();
            if (!this.auth.IsAuthenticated()) {
                defered.reject('Not authorized');
            } else {
                delete project.Manager;
                delete project.ProjectChat;
                delete project.Tasks;
                project.ManagerId = this.auth.GetUserId();
                this.$http.post<any>(`${API_URL}/odata/OProjects`, project).then(r => r.data).then(data => defered.resolve(data));
            }
            return defered.promise;
        }
    }
    ProjectService.$inject = ['tmAuthService', '$http', '$q'];

    export const MODULE = angular.module('taskmanager', []);

    MODULE.service('tmStorageService', StorageService);
    MODULE.service('tmAuthService', AuthService);
    MODULE.service('tmProjectService', ProjectService);



}