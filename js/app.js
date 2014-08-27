angular.module('maid', ['gear','ui.bootstrap'])
    .controller('bookCtrl', function ($scope, $timeout) {
        $scope.option = {};
        $scope.option.bedrooms = [0,1,2,3,4,5];
        $scope.option.bathrooms = [0,1,2,3,4,5];
        $scope.option.frequency = ['One Time', 'Weekly', 'Bi-Weekly', 'Monthly'];
        $scope.option.extras = ['Inside Fridge', 'Inside Oven', 'Inside Cabinets', 'Interior Windows', 'Deep Cleaning', 'Wet Wipe Window Blinds'];
        $scope.bedroom = 0;
        $scope.bathroom = 0;
        $scope.frequency = 'One Time';
        $scope.extras = [];

        $scope.charges = {
            bedroom: {
                '0': 20,
                '1': 30,
                '2': 40,
                '3': 50,
                '4': 60,
                '5': 70
            },
            bathroom: {
                '0': 20,
                '1': 30,
                '2': 40,
                '3': 50,
                '4': 60,
                '5': 70
            },
            extras: {
                'Inside Fridge': 10,
                'Inside Oven': 10,
                'Inside Cabinets': 15,
                'Interior Windows': 5,
                'Deep Cleaning': 30,
                'Wet Wipe Window Blinds': 35
            }
        };

        $scope.discounts = {
            frequency: {
                'One Time': 0,
                'Weekly': 15,
                'Bi-Weekly': 10,
                'Monthly': 5
            }
        };

        $scope.priceHints = {};
        $scope.discountHints = {};
        $scope.popHint = function (type, selection) {
            if ($scope.charges[type]) {
                if (!$scope.priceHints[type]) {
                    $scope.priceHints[type] = {};
                }
                $scope.priceHints[type][selection] = true;
                $timeout(function () {
                    delete $scope.priceHints[type][selection];
                }, 2000);
            }

            if ($scope.discounts[type]) {
                if (!$scope.discountHints[type]) {
                    $scope.discountHints[type] = {};
                }
                $scope.discountHints[type][selection] = true;
                $timeout(function () {
                    delete $scope.discountHints[type][selection];
                }, 2000);
            }
        };

        $scope.toggleExtra = function (extra) {
            if ($scope.isExtraChosen(extra)) {
                _.pull($scope.extras, extra);
            }
            else {
                $scope.extras.push(extra);
            }
        };

        $scope.isExtraChosen = function (extra) {
            return _.contains($scope.extras, extra);
        };


        $scope.countTotal = function (bedroom, bathroom, frequency, extras) {
            var total = 0;
            var bedroomCharge = parseInt($scope.charges.bedroom[bedroom], 10);
            var bathroomCharge = parseInt($scope.charges.bathroom[bathroom], 10);
            var frequencyDiscount = $scope.discounts.frequency[frequency];

            var extraCharge = 0;
            angular.forEach(extras, function (extra) {
                extraCharge += $scope.charges.extras[extra];
            });

            total = (bedroomCharge + bathroomCharge + extraCharge) * ((100-frequencyDiscount)/100);

            return total.toFixed(2);
        };

        $scope.step = 'cleaning';
        $scope.setStep = function (step) {
            $scope.step = step;
        };

        $scope.minDate = new Date();
        $scope.date = new Date();
        $scope.time = new Date();
        $scope.time.setMinutes(0);
    })
    .controller('checkoutCtrl', function ($scope) {
    });