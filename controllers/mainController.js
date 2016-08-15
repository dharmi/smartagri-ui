angular.module('SmartFarmUIApp', [])
    .controller('mainController', function ($rootScope, $scope, $timeout, QueryService) {
        $scope.mcu = "";
        $scope.httpEndpoint = "";
        $scope.wsEndpoint = "";
	$scope.threshold = 650;
	$rootScope.logs = "";
	
	$scope.updateThreshold = function() {
	    QueryService.initMCU($scope.httpEndpoint, $scope.threshold).then(function (response) {
		$rootScope.logs += "\nInitMCU Response: \n" + JSON.stringify(response);
		QueryService.initSubscribers($scope.httpEndpoint).then(function (response) {
		    $rootScope.logs += "\nInitSubcribers Response: \n" + JSON.stringify(response);
		});
	    });
	}
	
	$scope.initEquipment = function() {
	    QueryService.initValve($scope.httpEndpoint).then(function (response) {
		$rootScope.logs += "\nInitValve Response: \n" + JSON.stringify(response);
	    });
	    QueryService.initMCU($scope.httpEndpoint, $scope.threshold).then(function (response) {
		$rootScope.logs += "\nInitMCU Response: \n" + JSON.stringify(response);
	    });
	    QueryService.initOtherSensors($scope.httpEndpoint).then(function (response) {
		$rootScope.logs += "\nInitOtherSensors Response: \n" + JSON.stringify(response);
	    });
	}

	
	$scope.initSubscription = function() {
	    QueryService.initSubscribers($scope.httpEndpoint).then(function (response) {
		$rootScope.logs += "\nInitSubcribers Response: \n" + JSON.stringify(response);
	    });
	}
	
        $scope.findMCU = function () {
            $rootScope.logs += "\n====Start Find MCU";
            QueryService.findMCU($scope.httpEndpoint).then(function (response) {
                $scope.mcu = response.Find.Result.MCUSensorModel;
                $rootScope.logs += "\nFound:";
                $rootScope.logs += "\nThis: " + JSON.stringify($scope.mcu);
 		$scope.mcu.SmartFarmName = "A Monkey's Farmhouse";
		//$rootScope.logs += "Here: " + $scope.mcu;
                console.log($scope.mcu);

                // subscribe to ws
                $scope.openSocket(subscriptionQuery);
            });
        };

        // subscribe to websocket to observe the changes in humidity value
        $scope.openSocket = function (Query) {

            if ("WebSocket" in window) {
                console.log("WebSocket is supported by your Browser!");
                // Opening a WebSocket
                var ws = new WebSocket($scope.wsEndpoint);
                $rootScope.logs += "\n\n====WS opened:";
                ws.onopen = function () {
                    // Web Socket is connected, send data using send()
                    ws.send(Query);
                    console.log("Message is sent...");

                };

                ws.onmessage = function (evt) {
                    //Getting subscribed message over evt.data
                    var notifiedMsg = evt.data;
                    //Converting subscribed XML message to JSON
                    var x2js = new X2JS();
                    var notifiedJSON = x2js.xml_str2json(notifiedMsg);
                    if (angular.isDefined(notifiedJSON.TqlNotification)) {
                        angular.forEach(notifiedJSON.TqlNotification.Update, function (obj, key) {
                            angular.forEach(obj, function (notificationObj) {
                                $rootScope.logs += "\n\n====WS new Message:\n";
                                $rootScope.logs += "\n" + JSON.stringify(notificationObj);
				console.log(notificationObj._Value);
				var sdata = notificationObj._Known;
				var sensorToken = sdata.split("#");
				var sval_temp = sensorToken[0].split(":");
				var sval_hum = sensorToken[2].split(":");
				var sval_amb = sensorToken[3].split(":");
				var sval_soil = sensorToken[4].split(":");
                                $scope.mcu.SensorData = notificationObj._Known;
                                $scope.mcu.IntTemp = sval_temp[1];
                                $scope.mcu.IntHum = sval_hum[1];
                                $scope.mcu.IntAmb = sval_amb[1];
                                $scope.mcu.IntSoil = sval_soil[1];
                                $scope.mcu.ExternalEnv.Time = notificationObj._Timestamp;
                                $scope.$apply();
                            });
                        });
                    }
                };

                ws.onclose = function () {
                    // WebSocket is closed.
                    console.log("Connection is closed...");
                };
            }
            else {
                // The browser doesn't support WebSocket
                alert("WebSocket NOT supported by your Browser!");
            }
        }

        var subscriptionQuery = CONFIG_QUERIES.SUBSCRIPTION_QUERY;
	
        $scope.replaceIPWithHostName = function () {
            $scope.wsEndpoint = $scope.wsEndpoint.replace(/:.*?\:/, '://' + SmartFarmHostName + ':');
            $scope.httpEndpoint = $scope.httpEndpoint.replace(/:.*?\:/, '://' + SmartFarmHostName + ':');
        };

        QueryService.discoverSmartFarmEndpoint().then(function (data) {
	    console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++Main Controller Data\n");
	    console.log(data);
            angular.forEach(data.Find.projectEndpointMap.DataMap, function (obj) {
                if (obj.Value.indexOf("ws:") > -1) {
                    $scope.wsEndpoint = obj.Value;
                } else if (obj.Value.indexOf("http:") > -1 || obj.Value.indexOf("https:") > -1) {
                    $scope.httpEndpoint = obj.Value;
                }
            });
            $scope.replaceIPWithHostName();
            $scope.findMCU();
        });

        $scope.$watch(function () {
            return $rootScope.logs;
        }, function () {
            $timeout(function () {
                var textarea = document.getElementById('logs');
                textarea.scrollTop = textarea.scrollHeight;
            });

        });
    }
);
