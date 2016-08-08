app.factory('Bank', ['$http',function($http) {
		return {
			getHistory : function(userData) {
				return $http.post('/getHistory',userData);
			},
      checkBalance : function(userId){
        return $http.post('/checkBalance',userId)
      }
		}
}]);

app.factory('SharedResources',['$http',function($http){
    var userId;
    var balance;
    return{
      getUserID : function(){
        return userId;
      },
      setUserID : function(userID){
        userId = userID
      },
      getBalance : function(){
        return balance;
      },
      setBalance: function(Balance){
        balance = Balance;
      }
    }
}])
