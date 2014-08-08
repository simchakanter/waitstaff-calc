var wcApp = angular.module('wcApp', ['ngRoute']);

wcApp.config(function($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: '../views/home.html',
    controller: 'calcCtrl'
  })
  .when('/new-meal', {
    templateUrl: '../views/new-meal.html',
    controller: 'calcCtrl'
  })
  .when('/my-earnings', {
    templateUrl: '../views/my-earnings.html',
    controller: 'calcCtrl'
  })
  .otherwise({
    redirectTo: '/'
  });
});

wcApp.controller('calcCtrl', function($scope, CalculatorService) {
  $scope.calculator = CalculatorService;
  $scope.data = {
    submitAttempted: false,
    meal: {
      basePrice: "",
      taxRate: "",
      tipPercentage: "",
      subTotal: "",
      tipAmount: "",
      mealTotal: 0,
      clear: function() {
        this.basePrice = "";
        this.taxRate = "";
        this.tipPercentage = "";
      },
      submit: function() {
        if ($scope.mealForm.$invalid) {
          console.log("The form was tested as invalid");
          return false;
        } else {
          $scope.data.submitAttempted = false;
          this.subTotal = this.basePrice + (this.basePrice * this.taxRate / 100);
          this.tipAmount = this.basePrice * this.tipPercentage / 100;
          this.mealTotal = this.subTotal + this.tipAmount;
          $scope.calculator.totals.mealCount++;
          $scope.calculator.totals.tipTotal += this.tipAmount;
          $scope.calculator.totals.historicalTipPercentages.push(this.tipPercentage);
          console.log($scope.calculator.totals.historicalTipPercentages);
          $scope.calculator.totals.calcAverageTip($scope.calculator.totals.historicalTipPercentages);
          this.clear();
        }
      }
    }
  };
});

wcApp.service('CalculatorService',function(){
  var service = {
    totals: {
      tipTotal: 0,
      mealCount: 0,
      historicalTipPercentages: [],
      averageTip: 0,
      calcAverageTip: function(array) {
        console.log("Starting average tip function...");
        // If I don't cast total as a number, it fails later. Why?
        // Because the string concatenate + is higher precedence than addition
        var total = 0;
        for (var x = 0; x < array.length; x++) {
          total += array[x];
        }
        this.averageTip = total / array.length;
      },
      reset: function() {
        this.tipTotal = 0;
        this.mealCount = 0;
        this.historicalTipPercentages = [];
        this.averageTip = 0;
      }
    }
  };
  return service;
});