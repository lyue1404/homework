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