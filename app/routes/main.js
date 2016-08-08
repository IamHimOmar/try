app.config(function($stateProvider,$urlRouterProvider){
  $urlRouterProvider.otherwise("/");
    $stateProvider
          .state('home',{
            url: '/',
            templateUrl: 'html/components/login.html'
          })
          .state('hello',{
            url: '/hello',
            templateUrl: 'html/components/hello.html'
          })
          .state('dashboard',{
            url: '/dashboard',
            templateUrl: 'html/components/dashboard.html'
          })
          .state('balance',{
            url: '/balance',
            templateUrl: 'html/components/balance.html'
          })
})
