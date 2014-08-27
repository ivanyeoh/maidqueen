angular.module('admin', ['ngRoute'])
    .controller('adminCtrl', function ($scope) {
        $scope.$on('$routeChangeStart', function(next, current) {
            $scope.path = current.originalPath;
        });
    })
    .controller('roomServicesCtrl', function ($scope) {
        $scope.extras = [
            {
                name: 'Inside Fridge'
            },
            {
                name: 'Inside Oven'
            },
            {
                name: 'Inside Cabinets'
            },
            {
                name: 'Interior Windows'
            },
            {
                name: 'Deep Cleaning'
            },
            {
                name: 'Wet Wipe Window Blinds'
            }
        ];
        $scope.addExtra = function () {
            $scope.extras.unshift({
                name: ''
            })
        };
    })
    .controller('postCodeCtrl', function ($scope) {
        $scope.postcodes = [
            {
                name: '50000'
            },
            {
                name: '40150'
            }
        ];
        $scope.postcodeStreet = {
            '47600': {
                postoffice: 'Subang Jaya',
                location: 'Jalan Subang 1 USJ 1, Jalan TP 1 - TP 5, Jalan TP 1/1A - TP 1/1D, Jalan TP 3/1, Jalan TP 3/2, Pangsapuri Seri Nipah, Persiaran Kewajipan, Persiaran Mulia, Persiaran Subang 1, Persiaran Subang Permai, Pusat Perdagangan Subang Mas, Pusat Perniagaan USJ 10, Taman Industri Subang, Taman Perindustrian UEP, Taman Pinggiran USJ, Taman Subang Mewah'
            },
            '47500': {
                postoffice: 'Subang Jaya',
                location: 'Persiaran Wangsa Baiduri, Petaling Jaya - PJS 7, 9 & 11, Pinggiran USJ, PJS 7,9,11 (Bandar Sunway), Subang Avenue, Subang Height, Subang Hi-Tech Industrial Park, Subang Jaya - Seksyen SS 12 - 19, Subang Parkhomes Condo, Sungai Penaga Industrial Park, Suria Tower (Saujana Residency), Taman Industri Subang, Taman Mutiara Subang, Taman Sunway South Quay'
            },
            '40150': {
                postoffice: 'Shah Alam',
                location: 'Desa Subang Permai, Jalan Batu Tiga Subang, Jalan Kampung Melayu Subang, Jalan Merbau (Kampung Melayu Subang), Jalan PKNS (Kampung Melayu Subang), Jalan Pusara Aman (Kampung Melayu Subang), Jalan Subang (Batu 1/4), Jalan Subang Indah, Jalan Subang Indah (1 - 10), Jalan Subang Perdana, Jalan Subang Permai (U6/1 - U6/8), Jalan Subang Permai (U6/2A - U6/2B), Jalan Subang Permai G U6/G, Jalan Subang Permai Utama, Jalan Tembusu (Kampung Melayu Subang), Kampung Baru Cina Subang, Kampung Baru Subang, Kampung Melayu Subang, Kampung Seri Subang, Pekan Subang'
            },
            '50000': {
                postoffice: 'Kuala Lumpur',
                location: 'Bangunan Bangkok Bank, Jalan Balai Polis, Jalan Bandar, Jalan Cheng Lock, Jalan Hang Lekir, Jalan Hang Naadim, Jalan Panggung, Jalan Petaling, Jalan Sang Guna, Jalan Skola, Jalan Sultan, Jalan Sultan Sulaiman, Jalan Tun H.S. Lee, Kompleks Kota Raya, Lorong Bandar 16, Lorong Hang Lekir, Lorong Madras, Lorong Panggung, Lorong Sang Guna, Lorong Sultan'
            }
        };
        $scope.addPostcode = function () {
            $scope.postcodes.unshift({
                name: ''
            });
        };
    })
    .controller('orderCtrl', function ($scope, $timeout) {
        function randomDate () {
            var d = new Date();
            d.setDate((new Date()).getDate()+parseInt(Math.random()*100, 10));

            return d;
        }

        $scope.currentTab = 'new';
        $scope.setTab = function (tab) {
            $scope.currentTab = tab;
        };

        $scope.removeOrder = function (order){
            order.$deleted = true;

            $timeout(function () {
                order.status = 'Settled';
                delete order.$deleted;
                $scope.settled.push(order);
                _.pull($scope.orders, order);
            }, 700);
        };
        $scope.removeSettle = function (order){
            order.$deleted = true;

            $timeout(function () {
                order.status = 'new';
                delete order.$deleted;
                $scope.orders.push(order);
                _.pull($scope.settled, order);
            }, 700);
        };

        $scope.settled = [];

        $scope.orders = [
            {
                customer: 'Aaron Lim',
                mobile_number: '0129994033',
                placed_date: new Date(),
                cleaning_date: randomDate(),
                address: '33 Jalan Selangor, 39855 Klang Lama, Kuala Lumpur',
                payment_status: 'Paid',
                status: 'New'
            },
            {
                customer: 'Jenny Tan',
                mobile_number: '0132294039',
                placed_date: new Date(),
                cleaning_date: randomDate(),
                address: '50, Jalan 6/116B, Kuchai Entrepreneurs\' Park, Off Jalan Kuchai Lama, 58200 Kuala Lumpur',
                payment_status: 'Paid',
                status: 'New'
            },
            {
                customer: 'Mohammad Ali',
                mobile_number: '0111112022',
                placed_date: new Date(),
                cleaning_date: randomDate(),
                address: '289 Jalan Klang Lama, 58000 Kuala Lumpur, Malaysia',
                payment_status: 'Paid',
                status: 'New'
            },
            {
                customer: 'Mickey Teoh',
                mobile_number: '0129994033',
                placed_date: new Date(),
                cleaning_date: randomDate(),
                address: 'C-08-30, Kompleks Rimbun Scott Garden 289, Jalan Kelang Lama Kuala Lumpur',
                payment_status: 'Paid',
                status: 'New'
            }
        ];
    })
    .config(function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/pricing/room-services', {
                templateUrl: 'room-services.html',
                controller: 'roomServicesCtrl'
            })
            .when('/pricing/postcode', {
                templateUrl: 'postcode.html',
                controller: 'postCodeCtrl'
            })
            .when('/order', {
                templateUrl: 'order.html',
                controller: 'orderCtrl'
            })
            .otherwise({
                redirectTo: '/order'
            });
    });
