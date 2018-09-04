const request=require('request');
const yargs=require('yargs');
const geocode=require('./geocode/geocode.js');
const forecast=require('./weather/weather.js');

const argv=yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'provide address',
      string:true
    }
  })
  .help()
  .alias('help','h')
  .argv;

geocode.geocodeAddress(argv.a, (errorMessage, results) => {
  if(errorMessage) {
    console.log(errorMessage);
  } else {
    var latitude=results.Latitude;
    var longitude=results.Longitude;
    forecast.forecastAPI(latitude,longitude,(errorMessage,weatherResults)=>{
      if(errorMessage){
        console.log(errorMessage);
      } else {
        console.log(JSON.stringify(weatherResults,undefined,2));
      }
    });
  }
});
