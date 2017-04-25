'use strict';

var http = require('http');
var url = require('url');


function start(route, handle) {
    function onRequest(request, response) {
        // var postData = "";
        var pathname = url.parse(request.url).pathname;
        console.log("Request for " + pathname +" received.");
         route(handle, pathname, response, request);
        // request.setEncoding("utf8");
        // request.addListener('data', function(postDataChuck){
        //     postData += postDataChuck;
        //     console.log("Received POST data chuck '" + postDataChuck + "'.");
        // });
        // request.addListener("end", function(){
        //     console.log("end");
        //     route(handle, pathname, response, postData);
        // });
    }

    http.createServer(onRequest).listen(8888);
    console.log("Server has started.");
}
exports.start = start;