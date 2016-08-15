angular.module('SmartFarmUIApp').service('QueryService', function ($http, $rootScope) {
    return {
        discoverSmartFarmEndpoint: discoverSmartFarmEndpoint,
        findMCU: findMCU,
	initMCU: initMCU,
	initValve: initValve,
	initOtherSensors: initOtherSensors,
	initSubscribers: initSubscribers,
        findHumSensor: findHumSensor,
        findTempSensor: findTempSensor,
        findAmbSensor: findAmbSensor,
        findSoilSensor: findSoilSensor
    }

    function discoverSmartFarmEndpoint() {
        var findProjectQuery = CONFIG_QUERIES.FIND_PROJECT;
        return $http.post(TQLSmartFarmEngine, findProjectQuery).then(function (response) {
            var x2js = new X2JS();
            var jsonObj = x2js.xml_str2json(response.data);
    	    console.log("****************************************************************Query Service Data\n");
	    console.log(response.data);
            var findProjectEndpointsQuery = "<GetProjectEndPoints><ProjectSysId>" + jsonObj.Find.Result.Project.SysId + "</ProjectSysId></GetProjectEndPoints>";
            return $http.post(TQLSmartFarmEngine, findProjectEndpointsQuery).then(function (response) {
                var x2js = new X2JS();
                var endpointsJson = x2js.xml_str2json(response.data);
                return endpointsJson;
            });
        });
    }

    function findMCU(endpointURL) {
        var query = CONFIG_QUERIES.FIND_MCU;
        $rootScope.logs += "\nQuery:\n" + query;
        return $http.post(endpointURL, query).then(function (response) {
            var x2js = new X2JS();
            var jsonObj = x2js.xml_str2json(response.data);
            return jsonObj;
        });
    }

    function initMCU(endpointURL, thresh) {
        var query = CONFIG_QUERIES.INIT_MCU1 + thresh + CONFIG_QUERIES.INIT_MCU2;
        $rootScope.logs += "\nQuery:\n" + query;
        return $http.post(endpointURL, query).then(function (response) {
            var x2js = new X2JS();
            var jsonObj = x2js.xml_str2json(response.data);
            return jsonObj;
        });
    }

    function initValve(endpointURL) {
        var query = CONFIG_QUERIES.INIT_VALVE;
        $rootScope.logs += "\nQuery:\n" + query;
        return $http.post(endpointURL, query).then(function (response) {
            var x2js = new X2JS();
            var jsonObj = x2js.xml_str2json(response.data);
            return jsonObj;
        });
    }
    
    function initOtherSensors(endpointURL) {
        var query = CONFIG_QUERIES.INIT_SENSORS;
        $rootScope.logs += "\nQuery:\n" + query;
        return $http.post(endpointURL, query).then(function (response) {
            var x2js = new X2JS();
            var jsonObj = x2js.xml_str2json(response.data);
            return jsonObj;
        });
    }
    
    function initSubscribers(endpointURL) {
        var query = CONFIG_QUERIES.INIT_SUBSCRIBERS;
        $rootScope.logs += "\nQuery:\n" + query;
        return $http.post(endpointURL, query).then(function (response) {
            var x2js = new X2JS();
            var jsonObj = x2js.xml_str2json(response.data);
            return jsonObj;
        });
    }


    function findHumSensor(endpointURL) {
        var query = CONFIG_QUERIES.FIND_TEMP;
        $rootScope.logs += "\nQuery:\n" + query;
        return $http.post(endpointURL, query).then(function (response) {
            var x2js = new X2JS();
            var jsonObj = x2js.xml_str2json(response.data);
            return jsonObj;
        });
    }

    function findTempSensor(endpointURL) {
        var query = CONFIG_QUERIES.FIND_HUM;
        $rootScope.logs += "\nQuery:\n" + query;
        return $http.post(endpointURL, query).then(function (response) {
            var x2js = new X2JS();
            var jsonObj = x2js.xml_str2json(response.data);
            return jsonObj;
        });
    }

    function findAmbSensor(endpointURL) {
        var query = CONFIG_QUERIES.FIND_TEMP;
        $rootScope.logs += "\nQuery:\n" + query;
        return $http.post(endpointURL, query).then(function (response) {
            var x2js = new X2JS();
            var jsonObj = x2js.xml_str2json(response.data);
            return jsonObj;
        });
    }

    function findSoilSensor(endpointURL) {
        var query = CONFIG_QUERIES.FIND_HUM;
        $rootScope.logs += "\nQuery:\n" + query;
        return $http.post(endpointURL, query).then(function (response) {
            var x2js = new X2JS();
            var jsonObj = x2js.xml_str2json(response.data);
            return jsonObj;
        });
    }


});
