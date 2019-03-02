//http缓存分为两种  强制缓存（首页没法强制缓存） 对比缓存
let http = require('http');
let mime = require('mime');
let url = require('url');
let path = require('path');
let fs = require('fs');
let crypto = require('crypto');
//第一次访问我的时候  我给你设置一个头  last-modified 最后修改的时间 8：00
// 你再请求我的时候 你带上上次给你的时间  8：00  10：00 返回新的文件
http.createServer(function(req,res){
    let {pathname} = url.parse(req.url, true);
    console.log(pathname);
    //js css 文件 每次更改了 就重新请求  对比缓存




    //强制缓存  这个东西 有的文件设置上了 可能会导致内容是老内容
    // res.setHeader('Cache-Control','max-age=10');
    // res.setHeader('Expires',new Date(Date.now()+10000).toGMTString());

    let abs = path.join(__dirname, pathname);
    fs.stat(path.join(__dirname,pathname),(err,stat) => {
        if(err) {
            res.statusCode = 404;
            res.end('Not Found');
            return;
        }
        if(stat.isFile()) {
            let ctime = stat.ctime.toUTCString();
            //if-modified-since是浏览器自己携带的，如果服务器设置过last-modified,那么下次请求就会带上这个头
            //缺陷：如果文件没改，时间却变了   时间精确到秒 可能会有问题

            //Etag 实体内容 他是根据文件内容  算出一个位于的值  md5
            if(req.headers['if-modified-since'] == stat.ctime.toUTCString()) {
                res.statusCode = 304;
                res.end();
                return;
            }
            res.setHeader('Last-Modified', ctime);//If-Modified-Since
            fs.createReadStream(abs).pipe(res);
        }
    })
}).listen(3000);