/*Config Query
 * If the response of query is different with the sample,
 * The output in index.html and other files should be changed too,
 * to display correct value
 * */

var CONFIG_QUERIES = {
    FIND_PROJECT: "<query><find><project><projName eq='FarmSystem'/></project></find></query>",
    FIND_MCU: "<Query><Find><MCUSensorModel><sensorID ne=''/></MCUSensorModel></Find></Query>",
    FIND_TEMP: "<Query><Find><TempSensorModel><TempSensorID ne=''/></TempSensorModel></Find></Query>",
    FIND_HUM: "<Query><Find><HumiditySensorModel><HumSensorID ne=''/></HumiditySensorModel></Find></Query>",
    FIND_AMB: "<Query><Find format='version,known'><AmbianceSensorModel><AmbSensorId ne=''/></AmbianceSensorModel></Find></Query>",
    FIND_SOIL: "<Query><Find format='version,known'><SoilMoistureSensorModel><SoilMoistureID ne=''/></SoilMoistureSensorModel></Find></Query>",
    INIT_MCU1: "<Query><DeleteAll format='version,current'><MCUSensorModel><sensorId ne=''/></MCUSensorModel></DeleteAll><Save format='version,current'><MCUSensorModel><PerifParams><Peripheral>serial</Peripheral><Baudrate>9600</Baudrate><InterfacePort>/dev/ttyUSB1</InterfacePort><Interface>serial</Interface><Format>ascii</Format><Operation>receive</Operation><UniqueId>76522</UniqueId><Payload>$Null()</Payload></PerifParams><SensorData>$Null()</SensorData><InitSubscribers>false</InitSubscribers><Threshold>",
    INIT_MCU2: "</Threshold></MCUSensorModel></Save></Query>",
    INIT_VALVE: "<Query><DeleteAll format='version,current'><FlowControlModel><FCId ne=''/></FlowControlModel></DeleteAll><Save format='version,current'><FlowControlModel><Peripheral>serial</Peripheral><Baudrate>9600</Baudrate><InterfacePort>/dev/ttyUSB0</InterfacePort><Interface>serial</Interface><Format>ascii</Format><Operation>transmit</Operation><UniqueId>76522</UniqueId><Payload>0</Payload></FlowControlModel></Save></Query>",
    INIT_SENSORS: "<Query><DeleteAll format='version,current'><TempSensorModel><TempSensorId ne=''/></TempSensorModel></DeleteAll><DeleteAll format='version,current'><HumiditySensorModel><HumSensorId ne=''/></HumiditySensorModel></DeleteAll><DeleteAll format='version,current'><AmbianceSensorModel><AmbSensorId ne=''/></AmbianceSensorModel></DeleteAll><DeleteAll format='version,current'><SoilMoistureSensorModel><SoilMoistureID ne=''/></SoilMoistureSensorModel></DeleteAll><Create><TempSensorModel><TempValueInC>0</TempValueInC><TempValueInF>0</TempValueInF></TempSensorModel></Create><Create><HumiditySensorModel><HumidityValue>0</HumidityValue></HumiditySensorModel></Create><Create><AmbianceSensorModel><AmbianceValue>0</AmbianceValue></AmbianceSensorModel></Create><Create><SoilMoistureSensorModel><SoilMoistureValue>0</SoilMoistureValue></SoilMoistureSensorModel></Create></Query>",
    INIT_SUBSCRIBERS: "<Query><Find format='version'><MCUSensorModel><SensorId ne=''/></MCUSensorModel></Find><SetResponseData><key>Message.Value.Find.Result.MCUSensorModel.InitSubscribers.Value</key><value>true</value></SetResponseData><Update><from>Result</from><Include>$Response.Message.Value.Find</Include></Update></Query>",
    SUBSCRIPTION_QUERY: "<Query><Storage>TqlSubscription</Storage><Save><TqlSubscription><Label>SmartFarm</Label><sid>11</sid><Topic>*Atomiton.Sensor.MCUSensorModel*</Topic></TqlSubscription></Save></Query>"
};
