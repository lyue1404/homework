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
            let md5 = crypto.createHash('md5');
            let rs = fs.createReadStream(abs);
            let arr = [];//先写入响应头 再写入响应体
            rs.on('data', function(data){
                md5.update(data);
                arr.push(data);
            })
            //eatg 的方式比较靠谱，不能对大文件进行etag  文件的大型+文件的最后修改时间 组成 etag
            rs.on('end',function(){
                let etag  = md5.digest('base64');
                //pwa 缓存  离线  网络不通也可以缓存起来  caches api
                if(req.headers['if-none-match'] == etag) {
                    res.statusCode = 304;
                    res.end();
                    return;
                }
                res.setHeader('Etag', etag);
                //If-None-Match 浏览器 Etag 服务器
                res.end(Buffer.concat(arr));
            })
        }
        //全部使用  如果浏览器  访问服务器  会先加一个强制缓存  强制缓存 5s
        // 过了5s 会再发请求  对比缓存 last-modified 再判断etag 如果都成了 返回304 强制缓存5s
        //如果有变化再返回新的文件  304 = last-modified + etag
    })
}).listen(3000);