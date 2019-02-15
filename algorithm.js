// 1. 排序算法（冒泡排序、选择排序、计数排序、快速排序、插入排序、归并排序）
//https://www.cnblogs.com/onepixel/articles/7674659.html
var arr = [9, 1, 2, 5, 3, 6, 7, 4];

function swap(arr, i, j) {
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

function bubbleSort(arr) {
    var len = arr.length;
    for (var i = 0; i < len; i++) {
        for (var j = 0; j < len - i - 1; j++) {
            if (arr[i] > arr[j]) {
                swap(arr, i, j);
            }
        }
    }
    return arr;
}

// console.log(bubbleSort(arr));

function selectSort(arr) {
    var len = arr.length;
    var minIndex;
    for (var i = 0; i < len; i++) {
        minIndex = i;
        for (var j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        if (i != minIndex) {
            swap(arr, i, j);
        }
    }
    return arr;
}

// console.log(selectSort(arr));

function quickSort(arr, left, right) {

}


console.log(quickSort(arr));

function insertSort() {

}

function mergeSort() {

}

function countSort() {

}

function cardinalitySort() {

}

function bucketSort(){

}

// 2. 二分查找法
function binarySearch() {

}

//KMP算法

// 3. 翻转二叉树
