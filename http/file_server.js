'use strict';

var fs = require('fs'),
    url = require('url'),
    path = require('path'),
    http = require('http');

var root = path.resolve(process.argv[2] || './static');

console.log('Static root dir: ' + root);

function success(response, filePath){
    response.writeHead(200);
    fs.createReadStream(filePath).pipe(response);
}
function failure(response){
    response.writeHead(404);
    response.end('<h1>404 Not Found </h1>');
}

var server = http.createServer(function(request, response){
    var pathname = url.parse(request.url).pathname;
    var filepath = path.join(root, pathname);
    fs.stat(filepath, function(err, stats){
        if(!err && stats.isFile()){
            console.log('200 ' + request.url);
            success(response, filepath);
        }else if(!err && stats.isDirectory()){
           var files = fs.readdir(filepath, (err, files)=>{
               console.log(files);
               files = files.filter((x) =>{
                   return x === 'index.html' || 'x' === 'default.html'
               });

               if(files){
                   success(response, path.join(filepath, files[0]));
               }else{
                   failure(response);
               }

           })
        }else{
           console.log('404 ' + request.url);
            failure(response);
        }
    });
});

server.listen(8080);
console.log('Server is running at http://127.0.0.1:8080/');