angular.module('waitstaff-calc', [])
  .controller('calcCtrl', function($scope) {
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
            $scope.data.totals.mealCount++;
            $scope.data.totals.tipTotal += this.tipAmount;
            $scope.data.totals.historicalTipPercentages.push(this.tipPercentage);
            console.log($scope.data.totals.historicalTipPercentages);
            $scope.data.totals.calcAverageTip($scope.data.totals.historicalTipPercentages);
            this.clear();
          }
        }
      },
      totals: {
        tipTotal: 0,
        mealCount: 0,
        historicalTipPercentages: [],
        averageTip: 0,
        calcAverageTip: function(array) {
          console.log("Starting average tip function...");
          // If I don't cast total as a number, it fails later. Why?
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
  });