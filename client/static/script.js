var storeApp = angular.module('storeApp', ['ngRoute']);
storeApp.config(function($routeProvider){
	$routeProvider
	.when('/',{
		templateUrl: '/partials/dashboard.html'
	})
	.when('/products',{
		templateUrl: '/partials/products.html'
	})
	.when('/orders',{
		templateUrl: '/partials/orders.html'
	})
	.when('/customers',{
		templateUrl: '/partials/customers.html'
	})
	.when('/settings',{
		templateUrl: '/partials/settings.html'
	})
	.otherwise({
		redirectTo: '/'
	});
})

storeApp.factory('storeAppFactory', function($http){
	var factory = {};
	factory.getCustomers = function(callback){
		$http.get('/customers').success(function(output){
			customers = output;
			callback(customers);
		})
	}
	factory.addCustomer = function(info, callback){
		$http.post('/add_customer', info).success(function(){
			callback(customers);
		})
	}
	factory.removeCustomer = function(id, callback){
		$http.post('/remove_customer', id).success(function(){
			callback();
		})
	}
	factory.getOrders = function(callback){
		$http.get('/orders').success(function(output){
			orders = output;
			callback(orders);
		})
	}
	factory.addOrder = function(info, callback){
		$http.post('/add_order', info).success(function(){
			callback(orders);
		})
	}
	factory.removeOrder = function(id, callback){
		$http.post('/remove_order', id).success(function(){
			callback();
		})
	}
  factory.getProducts = function(callback){
    $http.get('/products').success(function(output){
      products = output;
      callback(products)
    })
  }
  factory.addProduct = function(info, callback){
    $http.post('/add_product', info).success(function(){
      callback(products);
    })
  }
	return factory;
})

storeApp.controller('customersController', function($scope, storeAppFactory){
	storeAppFactory.getCustomers(function(data){
		$scope.customers = data;
	})
	// $scope.addCustomer = function(){
	// 	storeAppFactory.addCustomer($scope.newCustomer, function(){
	// 		storeAppFactory.getCustomers(function(data){
	// 			$scope.customers = data;
	// 		})
	// 		$scope.newCustomer = {};
	// 	})
	// }
	$scope.removeCustomer = function(id){
	  	storeAppFactory.removeCustomer(id, function(){
	  		storeAppFactory.getCustomers(function(data){
	  			$scope.customers = data;
	  		});
	  	})
	}
	$scope.addCustomer = function(isValid){
		if(isValid){
			storeAppFactory.addCustomer($scope.newCustomer, function(){
				storeAppFactory.getCustomers(function(data){
					$scope.customers = data;
				})
				$scope.newCustomer = {};
			})
		}
	}
})
storeApp.controller('ordersController', function($scope, storeAppFactory){
	storeAppFactory.getCustomers(function(data){
		$scope.customers = data;
	})
	storeAppFactory.getOrders(function(data){
		$scope.orders = data;
	})
  storeAppFactory.getProducts(function(data){
    $scope.products = data;
  })
	$scope.addOrder = function(){
		storeAppFactory.addOrder($scope.newOrder, function(){
			storeAppFactory.getOrders(function(data){
				$scope.orders = data;
			});
		})
	}
	$scope.removeOrder = function(id){
		storeAppFactory.removeOrder(id, function(){
			storeAppFactory.getOrders(function(data){
				$scope.orders = data;
			});
		})
	}
})
storeApp.controller('productsController', function($scope, storeAppFactory){
  storeAppFactory.getProducts(function(data){
    $scope.products = data;
  })
  $scope.addProduct = function(){
    storeAppFactory.addProduct($scope.newProduct, function(){
      storeAppFactory.getProducts(function(data){
        $scope.products = data;
      })
    })
  }
  // $scope.search = function(){
  //   var pfilter = $scope.searchp.name;
  //   var showAll = 0 === pfilter.length;
  //   angular.forEach($scope.products, function(product){
  //     if(showAll){
  //       product.filtered = false;
  //     }
  //     else{
  //       product.filtered = (product.name.indexOf(pfilter) === -1)
  //     }
  //   })
  // }
})
storeApp.controller('dashboardController', function($scope, storeAppFactory){
  storeAppFactory.getCustomers(function(data){
    $scope.customers = data;
  })
  storeAppFactory.getOrders(function(data){
    $scope.orders = data;
  })
  storeAppFactory.getProducts(function(data){
    $scope.products = data;
  })
  $scope.plimit = 5;
  $scope.showMoreP = function(){
    $scope.plimit = $scope.products.length
  }
  $scope.showLessP = function(){
    $scope.plimit = 5;
  }
  $scope.olimit = 3;
  $scope.showMoreO = function(){
    $scope.olimit = $scope.orders.length
  }
  $scope.showLessO = function(){
    $scope.olimit = 3;
  }
  $scope.climit = 3;
  $scope.showMoreC = function(){
    $scope.climit = $scope.orders.length
  }
  $scope.showLessC = function(){
    $scope.climit = 3;
  }
  // var el = document.getElementById("showp");
  // if($scope.plimit < 5){
  //   el.innerHTML = '<a href="" ng-click="showMoreP()">show more...</a>';
  // }
  // else{
  //   el.innerHTML = '<a href="" ng-click="showLessP()">show less...</a>';
  // }
})