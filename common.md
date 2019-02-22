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
  1> 直接改变exports的值，不会影响module.exports；改变exports的属性值，module.export也会跟着更新对应的属性值。
  note: 若module.exports为引用类型的值，通过赋值，exports得到的是指向module.exports数据堆中存放地址的指针，改变exports，只是让exports栈中的值不再为上个指针，所以不会影响module.exports的值。
eg:
module = {
  exports: {}
}
var exports = module.exports
