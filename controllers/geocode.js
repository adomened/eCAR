var https = require('https');

exports.geocode = function(query, cb){

        var options = {
                hostname: 'maps.googleapis.com',
                path: '/maps/api/geocode/json?address=' +
                        encodeURIComponent(query) + '&sensor=false',
        };

        https.request(options, function(res){
                var data = '';
                res.on('data', function(chunk){
                        data += chunk;
                });
                res.on('end', function(){
                        data = JSON.parse(data);
                        if(data.results.length){
                                cb(null, data.results[0].geometry.location);
                        } else {
                                cb("No results found.", null);
                        }
                });
        }).end();
};

// https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=YOUR_API_KEY

exports.reverseGeocode = function(query, cb){
  var options = {
    hostname: 'maps.googleapis.com',
    path: `/maps/api/geocode/json?latlng=${query.lat},${query.long}&key=${process.env.KEY_GOOGLE_GEOCODE}`,
  };

  https.request(options, function(res){
    var data = '';
    res.on('data', function(chunk){
      data += chunk;
    });
    res.on('end', function(){
      data = JSON.parse(data);
      // console.log({data});
      if(data.results.length){
        cb(null, data); // data.results[0].geometry.location
      } else {
        cb("No results found.", null);
      }
    });
  }).end();
};
