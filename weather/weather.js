const request=require('request');

var forecastAPI= (latitude,longitude,callback) => {

  request({
    url:`https://api.darksky.net/forecast/efc2418fe7e5a9b2587a15a916909c1c/${latitude},${longitude}`,
    json:true
  }, (error,response,body) => {
      if(error) {
          callback("Unable to connect");
      } else if(response.statusCode===400) {
          callback("Invalid Address");
      } else if(response.statusCode===200) {
          callback(undefined, {
            Temperature: body.currently.temperature,
            apparentTemperature: body.currently.apparentTemperature
          });
      }
  });
};

module.exports.forecastAPI=forecastAPI;
