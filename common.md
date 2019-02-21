common.js
1.服务端模块化规范（同步加载模块）；
2.核心 reuqire方法：
  1>. 创建一个对象Module_cache（缓存模块），key为模块的绝对路径，value为对应模块内容的字符串;
  2>. 加载一个模块时（Module._load）
      a.取出文件后缀，若无，以.js(.json次之)补，相对路径转绝对路径，读取文件；
      b.Module.wrap包裹文件，使其成为字符串（自执行函数）；
      c.使用runInthisContext执行对应字符串，即函数执行；
      d.函数运行，将各模块的this替换为{}。
3.exports与module.exports
http://javascript.ruanyifeng.com/nodejs/module.html
var module = {exports:{id: 1,name: 'file'}};
var exports = module.exports;
exports = {};
console.log(module.exports,exports);