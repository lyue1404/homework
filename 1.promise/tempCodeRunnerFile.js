const Promise = require('./promise');

const p = new Promise(() => {
    console.log('start');
    throw new Eerror('出错了');
})
p.then(
    value => 100,
    e => console.log(e)
).catch(value => {
    console.log(value);
}).then(
    value => console.log('success',value),
    e => console.log('error',e)
)