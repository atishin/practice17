var App;
(function (App) {
    App.MODULE = angular.module('app', [TaskManager.MODULE.name, 'ngMaterial']);
})(App || (App = {}));
