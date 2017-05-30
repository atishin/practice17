namespace App {

    export interface IUserModel {
        login: string;
        password: string;
    }

    export class LoginComponent {

        constructor(private authService: TaskManager.AuthService) {}

        public user: IUserModel = {
            login: '',
            password: ''
        }

        public login() {
            console.log(this.user);
            this.authService.SignIn(this.user.login, this.user.password).then(token => {
                window.location.assign('/index.html');
            });
        }
    }
    LoginComponent.$inject = ['tmAuthService'];

    export const LoginComponentDefinition: ng.IComponentOptions = {
        controller: LoginComponent,
        templateUrl: '/src/app/auth/login.template.html'
    }

    MODULE.component('tmLogin', LoginComponentDefinition);
}