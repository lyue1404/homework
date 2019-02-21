// 1. buffer string 互转
let  buffer = Buffer.from('二进制流');
let str = buffer.toString('utf-8');

//  2.copy
const b1 = Buffer.from('前');
const b2 = Buffer.from('端');
let  career = Buffer.alloc(6);

b1.copy(career,0,0,3);
b2.copy(career,3,0,3);

// 3.concat
/********************   Buffer.concat    ***************************/
Buffer.concat = function(args) {
    let str = '';
    args.forEach(arg => {
        str += arg.toString('utf8');
    })
    return Buffer.from(str);
}
/*******************************************************************/

const b1 = Buffer.from('前');
const b2 = Buffer.from('端');
let career = Buffer.concat([b1,b2]);

console.log('career',career.toString('utf8'));
