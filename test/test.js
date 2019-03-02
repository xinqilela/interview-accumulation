async function func() {
    var a = await setTimeout(()=>{console.log('a')},20);
    var b = await setTimeout(()=>{console.log('b')},6);
}
func();