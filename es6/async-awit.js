var fetch = require("fetch").fetchUrl;
/**
 * Created by Administrator on 2019/2/18 0018.
 */
const fs = require('fs');
const readFile = function (fileName) {
    return new Promise((resolve,reject)=>{
        fs.readFile(fileName,(error,data)=>{
            if(error) return reject(error);
            resolve(data);
        });
    })
}

const asyncReadFile = async function () {
    const f1 = await readFile('aa.txt');
    const f2 = await readFile('bb.txt');
    console.log(f1.toString());
    console.log(f2.toString());
    return f1;
}

// asyncReadFile().then((value)=>{
//     console.log(value);
// });

function timeout(ms) {
    return new Promise((resolve,reject)=>{
        setTimeout(resolve,ms);
    });
}

async function asyncPrint(value,ms) {
    await timeout(ms);
    console.log(value);
}

// asyncPrint('hello',5000);

async function f() {
    // return 'hello word';
    // throw new Error('出错了!');
    return await 123;
}

// f().then((val)=>{
//     console.log(val);
// }).catch((e)=>{
//     console.log(e);
// });

/*
* async函数返回的 Promise 对象，必须等到内部所有await命令后面的 Promise 对象执行完，才会发生状态改变，
除非遇到return语句或者抛出错误。也就是说，只有async函数内部的异步操作执行完，才会执行then方法指定的回调函数。
* */
/*
* await:
*     命令后面是一个 Promise 对象，返回该对象的结果
*     命令后面是一个thenable对象（即定义then方法的对象），那么await会将其等同于 Promise 对象
*     命令后面不是 Promise 对象,也不是thenable对象，就直接返回对应的值。
* */
class Sleep {
    constructor(timeout) {
        this.timeout = timeout;
    }
    then(resolve, reject) {
        const startTime = Date.now();
        setTimeout(
            () => resolve(Date.now() - startTime),
            this.timeout
        );
    }
}

// (async()=>{
//     const actualTime = await new Sleep(1000);
//     console.log(actualTime);
// })();

// 任何一个await语句后面的 Promise 对象变为reject状态，那么整个async函数都会中断执行。
// 若希望即使前一个异步操作失败，也不要中断后面的异步操作。这时可以将第一个await放在try...catch结构里面,
// 也可以在await后面的 Promise 对象再跟一个catch方法，处理前面可能出现的错误。
async function aaa() {
    // try{
    //     await Promise.reject('出错了');
    // }catch(e){
    // }
    await Promise.reject('出错了').catch(console.log)
    const a = await Promise.resolve('hello');
    console.log(a);
}
// aaa();

//错误处理:如果await后面的异步操作出错，那么等同于async函数返回的 Promise 对象被reject。

async function bbb() {
    try {
        await new Promise(function (resolve, reject) {
            throw new Error('出错了');
        });
    } catch(e) {
    }
    return await('hello world');
}

// bbb().then(console.log).catch(console.log);

//继发请求
async function dbFunc(db){
    let docs = [{}, {}, {}];
    for(let doc of docs){
        await db.post(doc);
    }
}
//并发请求
async function dbFuc(db) {
    let docs = [{}, {}, {}];
    let promises = docs.map((doc) => db.post(doc));
    let results = await Promise.all(promises);
    console.log(results);
}

//esm模块加载器支持顶层await，即await命令可以不放在 async 函数里面，直接使用
// const res = await fetch('google.com');
// console.log(await res.text());


//async原理:将 Generator 函数和自动执行器，包装在一个函数里。
async function fn(args) {
}
// 等同于
function fn(args) {
    return spawn(function* () {
    });
}
function spawn(genF) {
    return new Promise(function(resolve, reject) {
        const gen = genF();
        function step(nextF) {
            let next;
            try {
                next = nextF();
            } catch(e) {
                return reject(e);
            }
            if(next.done) {
                return resolve(next.value);
            }
            Promise.resolve(next.value).then(function(v) {
                step(function() { return gen.next(v); });
            }, function(e) {
                step(function() { return gen.throw(e); });
            });
        }
        step(function() { return gen.next(undefined); });
    });
}


// 依次远程读取一组 URL，然后按照读取的顺序输出结果。
// 继发
async function logInOrder(urls) {
    for (const url of urls) {
        const response = await fetch(url);
        console.log(await response.text());
    }
}
//并发
async function logInOrder(urls) {
    // 并发读取远程URL
    const textPromises = urls.map(async url => {
        const response = await fetch(url);
        return response.text();
    });
    // 按次序输出
    for (const textPromise of textPromises) {
        console.log(await textPromise);
    }
}

// 读取文件的传统写法与异步遍历器写法的差异
function main1(inputFilePath) {
    const readStream = fs.createReadStream(
        inputFilePath,{encoding:'utf-8',highWaterMark:1024}
    );
    readStream.on('data',(chunk)=>{
        console.log('>>>',chunk);
    });
    readStream.on('end',()=>{
        console.log('### done ###');
    });
}
// node10支持异步遍历接口
async function main2(inputFilePath) {
    const readStream = fs.createReadStream(
        inputFilePath,{encoding:'utf-8',highWaterMark:1024}
    );
    for await(const chunk of readStream){
        console.log('>>>',chunk);
    }
    console.log('### done ###');
}

// main1('aa.txt');
// main2('aa.txt');

// 异步generator函数：返回一个异步遍历器
async function* gen() {
    yield 'hello';
}
const genObj = gen();
// genObj.next().then(x => console.log(x));
