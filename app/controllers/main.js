app.controller('TestController', ['$scope','$http',function($scope,$http){
    $scope.foo = "foo";
    $scope.person = "new person"

    $scope.test = function(){
      var userData = {name:$scope.name};
      console.log(userData.name);
      $http.post("/src/api/user",userData)
        .success(function(data){
          console.log(data);
        })
    }
}]);


app.controller('LoginController', ['$scope','$http','$location','SharedResources',function($scope,$http,$location,sr){
    $scope.Login = function(){
      var userData = {id:$scope.userName};
      $http.post("/connect",userData)
        .success(function(data){
          if (data == "SUCESS"){
            sr.setUserID($scope.userName);
            window.location.hash = '#/dashboard';
            $location.path('/dashboard.html');
          }
          else {
            alert("DOESNT EXIST");
          }
        })
    }
}]);

app.controller('BankController', ['$scope','$http','$location','Bank','SharedResources',function($scope,$http,$location,Bank,sr){
      $scope.balance = sr.getBalance();
      var userData = {id:sr.getUserID()};
      Bank.getHistory(userData).success(function(data){
        $scope.history = data;
      })
}]);

app.controller('SidebarController',['$scope','$http','$location','SharedResources','Bank',function($scope,$http,$location,sr,Bank){

    $scope.CheckBalance = function(){
        userData = {'id': sr.getUserID()};
        Bank.checkBalance(userData).success(function(data){
          window.location.hash = '#/balance';
          $location.path('/balance.html');
          sr.setBalance(data[0].balance)
        })
    }
    $scope.Withdraw = function(){
      // TODOO
        alert("NOTICE ME Withdraw")
    }
    $scope.Transfer = function(){
      // TODOO
        alert("NOTICE ME Transfer")
    }
}])
