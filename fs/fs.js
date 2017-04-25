'use strict';

var fs = require('fs');

//读文件

//异步读文件
fs.readFile('sample.txt', 'utf-8', function (err, data) {
    if (err) {
        console.log(err);
    } else {
        console.log(data);
    }
});


//同步读文件
try {
    var data = fs.readFileSync('sample.txt', 'utf-8');
    console.log(data);
} catch (error) {

}

//当读取二进制文件时，不传入文件编码时，回调函数的data参数将返回一个Buffer对象
fs.readFile('sample.txt', function (err, data) {
    if (err) {
        console.log(err);
    } else {
        console.log(data);
        //Buffer -> String
        var text = data.toString('utf-8');
        console.log(text);
        //String -> Buffer
        var buf = new Buffer(text, 'utf-8');
        console.log(buf);
        console.log(data.length + ' bytes');
    }
});

//写文件
//异步写文件
var data = 'Hello, Node.js';
fs.writeFile('output.txt', data, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log('ok.');
    }
});
//同步写文件
var data = 'Hello, Node.js';
fs.writeFileSync('output.txt', data);

//文件信息stat
//异步文件读取文件信息
fs.stat('sample.txt', function (err, stat) {
    if (err) {
        console.log(err);
    } else {
        // 是否是文件:
        console.log('isFile: ' + stat.isFile());
        // 是否是目录:
        console.log('isDirectory: ' + stat.isDirectory());
        if (stat.isFile()) {
            // 文件大小:
            console.log('size: ' + stat.size);
            // 创建时间, Date对象:
            console.log('birth time: ' + stat.birthtime);
            // 修改时间, Date对象:
            console.log('modified time: ' + stat.mtime);
        }
    }
});
//同步读取文件信息
try {
    var statOfFile = fs.statSync('sample.txt');
    console.log('isFile: ' + statOfFile.isFile());
    console.log('isDirectory: ' + statOfFile.isDirectory());
    if (statOfFile.isFile()) {
        console.log('size: ' + statOfFile.size);
        console.log('birth time: ' + statOfFile.birthtime);
        console.log('modified time: ' + statOfFile.mtime);
    }
} catch (error) {
    console.log(error);
}
