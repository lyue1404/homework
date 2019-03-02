//http缓存分为两种  强制缓存（首页没法强制缓存） 对比缓存
let http = require('http');
let mime = require('mime');
let url = require('url');
let path = require('path');
let fs = require('fs');

http.createServer(function(req,res){
    let {pathname} = url.parse(req.url, true);
    let abs = path.join(__dirname, pathname);
    fs.stat(path.join(__dirname,pathname),(err,stat) => {
        if(err) {
            res.statusCode = 404;
            res.end('Not Found');
            return;
        }
        if(stat.isFile()) {
            fs.createReadStream(abs).pipe(res);
        }
    })
}).listen(3000);