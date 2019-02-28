/*
 1.二维数组中的查找                         √
 2.旋转数组的最小数字                       √
 3.调整数组顺序使奇数位于偶数前面           √
 4.数组中出现次数超过一半的数字             √
 5.连续子数组的最大和                       √
 6.把数组排成最小的数                       √
 7.数组中的逆序对                           ???
 8.数字在排序数组中出现的次数               √
 9.数组中只出现一次的数字                   √
 10.数组中重复的数字                        √
 11.构建乘积数组                            √
 12.数组乱序                                √
* */

function shuffle(arr) {
    return arr.sort((a, b) => {
        return Math.random() - 0.5;
    });
}

// console.log(shuffle([1, 2, 3, 4, 5, 6, 7]));
function InversePairs(data) {
    var len = data.length;
    if (len <= 1) {
        return 0;
    }
    var count = 0;
    mergeSort(data, 0, len - 1, [], count);
    return count % 1000000007;
}

function mergeSort(arr, start, end, tmp, count) {
    if (start >= end) return;
    var mid = Math.floor((start + end) / 2);
    mergeSort(arr, start, mid, tmp, count);
    mergeSort(arr, mid + 1, end, tmp, count);
    merge(arr, start, mid, end, tmp, count);
}

function merge(arr, start, mid, end, tmp, count) {
    var i = start;
    var j = mid + 1;
    var k = 0;
    while (i >=start && j >) {
        if (arr[i] < arr[j]) {
            tmp[k++] = arr[i++];
        } else {
            tmp[k++] = arr[j++];
        }
        count++;
    }
    while (i <= mid) {
        tmp[k++] = arr[i++];
    }
    while (j <= end) {
        tmp[k++] = arr[j++];
    }
    var m = 0;
    while (m < tmp.length) {
        arr[start++] = tmp[m++];
    }
}

console.log(InversePairs([1, 2, 3, 4, 5, 6, 7, 0]));