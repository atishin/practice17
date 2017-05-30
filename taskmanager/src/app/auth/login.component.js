var App;
(function (App) {
    var LoginComponent = (function () {
        function LoginComponent(authService) {
            this.authService = authService;
            this.user = {
                login: '',
                password: ''
            };
        }
        LoginComponent.prototype.login = function () {
            console.log(this.user);
            this.authService.SignIn(this.user.login, this.user.password).then(function (token) {
                window.location.assign('/index.html');
            });
        };
        return LoginComponent;
    }());
    App.LoginComponent = LoginComponent;
    LoginComponent.$inject = ['tmAuthService'];
    App.LoginComponentDefinition = {
        controller: LoginComponent,
        templateUrl: '/src/app/auth/login.template.html'
    };
    App.MODULE.component('tmLogin', App.LoginComponentDefinition);
})(App || (App = {}));
