app.controller("HomeCtrl", function($scope, $http){
    $scope.announcements =[];

    $http.get("data/announcements.js").then(function (response){
        var list = response.data || [];

        list.sort(function(a, b){
            if (a.priority !== b.priority){
                return a.priority - b.priority;
            }
            return a.title.localeCompare(b.title);
        });

        $scope.announcements = list.slice(0, 3);
    }, function(){
        $scope.announcements = [];
    });
});

app.controller("AboutCtrl", function($scope){
    $scope.about = {
        headline: "Local pizza. Big heart. Maple Glen.",
        body1: "Maple Glen Pizza has been a go-to spot for families, students, and hungry humans for years. We keep it simple: fresh ingredients, friendly service, and pizza that hits every time.",
        body2: "Whether you're grabbing a quick slice or feeding a whole crew, we'll get you taken care of. Come for the food, stay because we remembered your name."
    };
});

app.controller("MenuCtrl", function($scope, $http){
    $scope.sections = [];
    $scope.activeSection = "all";
    $scope.searchText = "";

    $http.get("data/menu.js").then(function (response) {
        $scope.sections = response.data.sections || [];
    }, function(){
        $scope.sections = [];
    });

    $scope.setSection = function(sectionId){
        $scope.activeSection = sectionId;
    };

    $scope.sectionVisible = function(section){
        return($scope.activeSection === "all" || section.id === $scope.activeSection);
    };

    $scope.matchesSearch = function(item){
        if(!$scope.searchText) return true;
        var q = $scope.searchText.toLowerCase();
        var name = (item.name || "").toLowerCase();
        var desc = (item.desc || "").toLowerCase();

        return name.includes(q) || desc.includes(q);
    };
});

app.controller("OrderCtrl", function ($scope){
    $scope.prices = {
        bases: {
            plain: 12.99,
            glutenFree: 15.49,
            white: 13.99
        },
        toppings: {
            pepperoni: 1.50,
            sausage: 1.50,
            mushrooms: 1.00,
            onions: 0.75,
            peppers: 0.75,
            olives: 1.00,
            jalapenos: 0.75,
            extraCheese: 1.75
        }
    };

    $scope.order = {
        name: "",
        email: "",
        phone: "",
        base: "plain",
        toppings: {},
        notes: "",
        cardNumber: "",
        expDate: "",
        cvv: ""
    };

    $scope.submitted = false;
    $scope.confirmation = false;

    $scope.toppingsKeys = Object.keys($scope.prices.toppings);

    $scope.baseCost = function (){
        return $scope.prices.bases[$scope.order.base] || 0;
    };

    $scope.toppingsCost = function (){
        var total = 0;
        $scope.toppingsKeys.forEach(function(t){
            if($scope.order.toppings[t]){
                total += $scope.prices.toppings[t];
            }
        });
        return total;
    };

    $scope.totalCost = function(){
        return $scope.baseCost() + $scope.toppingsCost();
    };

    $scope.submitOrder = function(form){
        $scope.submitted = true;

        if (form.$invalid) {
            $scope.confirmation = false;
            return;
        }

        $scope.confirmation = true;
    };
});

app.controller("ContactCtrl", function ($scope, $http){
    $scope.phone = "(215) 542-7720";
    $scope.address = "641 Welsh Road, Maple Glen, PA 19002";

    $scope.hours = [];

    $http.get("data/hours.js").then(function (response){
        $scope.hours = response.data || [];
    }, function (){
        $scope.hours = [];
    });

    $scope.mapsUrl =
    "https://www.google.com/maps/dir/?api=1&destination=" +
    encodeURIComponent($scope.address);
});
