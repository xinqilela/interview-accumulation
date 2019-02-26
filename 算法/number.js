/*
* 大数相加
* 大数相乘
* */

function Add(a, b) {
    var lenA = a.length
    var lenB = b.length
    var len = lenA > lenB ? lenA : lenB
    if (lenA > lenB) {
        for (var i = 0; i < lenA - lenB; i++) {
            b = '0' + b
        }
    } else {
        for (var i = 0; i < lenB - lenA; i++) {
            a = '0' + a
        }
    }
    var arrA = a.split('')
    var arrB = b.split('')
    var arr = []
    for (i = 0; i < len; i++) {
        arr.push(parseInt(arrA[i]) + parseInt(arrB[i]))
    }
    for (i = arr.length - 1; i >= 0; i--) {
        if (arr[i] >= 10) {
            arr[i] -= 10
            arr[i - 1] = parseInt(arr[i - 1]) + 1
        }
    }
    return arr.join('')
}

// console.log(Add('1111111111111111111', '111111111111111111111111111'));

//111111112222222222222222222
