// 1. 排序算法（冒泡排序、选择排序、插入排序;快速排序、归并排序、希尔排序、堆排序）
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

function partition(a, low, high) {
    var pivotkey = a[low];
    while (low < high) {
        while (low < high && a[high] >= pivotkey) {
            high--;
        }
        a[low] = a[high];
        while (low < high && a[low] <= pivotkey) {
            low++;
        }
        a[high] = a[low];
    }
    a[low] = pivotkey;
    return low;
}
function quickSort(arr, begin, end) {
    if (begin >= end) {
        return;
    }
    var pivot = partition(arr, begin, end);
    quickSort(arr, begin, pivot - 1);
    quickSort(arr, pivot + 1, end);
    return arr;
}
// console.log(quickSort(arr, 0, arr.length - 1));

function insertSort(a) {
    for (var i = 1; i < a.length; i++) {
        if (arr[i] > arr[i - 1]) {
            continue;
        }
        var tmp = a[i];
        arr[i] = arr[i - 1];
        for (var j = i - 1; j > 0 && arr[j-1] > tmp; j--) {
            arr[j] = arr[j - 1];
        }
        arr[j] = tmp;
    }
    return a;
}
console.log(insertSort(arr));

//希尔排序
function shellSort(arr, increaments) {
    var arrLen = arr.length;
    var increaLen = increaments.length;
    for (var i = 0; i < increaLen; i++) {
        for (var j = increaments[i]; j < arrLen; j++) {
            if (arr[j] > arr[j - increaments[i]]) {
                continue;
            }
            var tmp = arr[j];
            arr[j] = arr[j - increaments[i]];
            for (var k = j - increaments[i]; k > 0 && arr[k - increaments[i]] > tmp; k -= increaments[i]) {
                arr[k] = arr[k - increaments[i]];
            }
            arr[k] = tmp;
        }
    }
    return arr;
}
// console.log('shellSort', shellSort(arr, [1, 3, 5]));

function mergeSort(arr, left, right) {
    //递归结束条件
    if (right - left <= 1) {
        if (arr[left] > arr[right]) swap(arr, left, right);
        return;
    }
    var mid = Math.floor((left + right) / 2);
    //分表
    mergeSort(arr, left, mid - 1);
    mergeSort(arr, mid, right);
    //合并
    var tmpArr = [],
        sLeft = left,
        sRight = mid;
    var i = 0;
    while (sLeft <= mid - 1 && sRight <= right) {
        if (arr[sLeft] < arr[sRight]) tmpArr[i++] = arr[sLeft++];
        else tmpArr[i++] = arr[sRight++];
    }
    while (sLeft <= mid - 1) {
        tmpArr[i++] = arr[sLeft++];
    }
    while (sRight <= right) {
        tmpArr[i++] = arr[sRight++];
    }
    for (var i = 0; i < tmpArr.length; i++) {
        arr[i + left] = tmpArr[i];
    }
    return arr;
}

// console.log(mergeSort(arr, 0, arr.length - 1));

//将待排数组调整为大顶堆（a(i)>a(2i)&&a(i)>a(2i+1)）
function heapAdjust(arr, i, n) {
    var tmp;
    var child;
    for (tmp = arr[i]; 2 * i + 1 < n; i = child) {
        child = 2 * i + 1;
        if (child != n - 1 && arr[child + 1] > arr[child]) {
            child++;
        }
        if (tmp < arr[child]) {
            arr[i] = arr[child];
        } else {
            break;
        }
    }
    arr[i] = tmp;
}
function heapSort(arr) {
    var len = arr.length;
    for (var i = Math.floor(len / 2); i >= 0; i--) {
        heapAdjust(arr, i, len);
    }
    for (var i = len - 1; i > 0; i--) {
        swap(arr, 0, i);
        heapAdjust(arr, 0, i);
    }
    return arr;
}
// console.log(heapSort(arr));

// 2. 二分查找法:只对有序的数据集有效
function binarySearch(arr, number) {
    var left = 0,
        right = arr.length - 1;
    while (left <= right) {
        var mid = Math.floor((left + right) / 2);
        if (number == arr[mid]) {
            return mid;
        } else if (number > arr[mid]) {
            left = mid + 1;
        } else if (number < arr[mid]) {
            right = mid - 1;
        }
    }
    return -1;
}
// console.log(binarySearch([1, 2, 3, 4, 5, 6, 6, 7, 8, 9], 7));

//KMP算法
function kmpGetStrPartMatchValue(str) {
    var prefix = [];
    var suffix = [];
    var partMatch = [];
    for (var i = 0, j = str.length; i < j; i++) {
        var newStr = str.substring(0, i + 1);
        if (newStr.length == 1) {
            partMatch[i] = 0;
        } else {
            for (var k = 0; k < i; k++) {
                //取前缀
                prefix[k] = newStr.slice(0, k + 1);
                suffix[k] = newStr.slice(-k - 1);
                if (prefix[k] == suffix[k]) {
                    partMatch[i] = prefix[k].length;
                }
            }
            if (!partMatch[i]) {
                partMatch[i] = 0;
            }
        }
    }
    return partMatch;
}

function KMP(sourceStr, searchStr) {
    //生成匹配表
    var part = kmpGetStrPartMatchValue(searchStr);
    var sourceLength = sourceStr.length;
    var searchLength = searchStr.length;
    var result;
    var i = 0;
    var j = 0;
    for (; i < sourceStr.length; i++) { //最外层循环，主串
        //子循环
        for (var j = 0; j < searchLength; j++) {
            //如果与主串匹配
            if (searchStr.charAt(j) == sourceStr.charAt(i)) {
                //如果是匹配完成
                if (j == searchLength - 1) {
                    result = i - j;
                    break;
                } else {
                    //如果匹配到了，就继续循环，i++是用来增加主串的下标位
                    i++;
                }
            } else {
                //在子串的匹配中i是被叠加了
                if (j > 1 && part[j - 1] > 0) {
                    i += (i - j - part[j - 1]);
                } else {
                    //移动一位
                    i = (i - j)
                }
                break;
            }
        }
        if (result || result == 0) {
            break;
        }
    }
    if (result || result == 0) {
        return result
    } else {
        return -1;
    }
}

var s = "BBC ABCDAB ABCDABCDABDE";
var t = "ABCDABD";

// console.log(KMP(s, t));

// 3. 二叉查找树：特殊的二叉树，相对较小的值保存在左节点中，较大的值保存在右节点中
function Node(data, left, right) {
    this.left = left;
    this.right = right;
    this.data = data;
    this.show = () => {
        return this.data
    }
}
function BST() {
    this.root = null //初始化,root为null
}
BST.prototype.insert = function (data) {
    var node = new Node(data, null, null);
    if (this.root === null) {
        this.root = node
    } else {
        var current = this.root;
        var parent;
        while (true) {
            parent = current;
            if (data < current.data) {
                current = current.left; //到左子树
                if (current === null) {  //如果左子树为空，说明可以将node插入在这里
                    parent.left = node;
                    break;  //跳出while循环
                }
            } else {
                current = current.right;
                if (current === null) {
                    parent.right = node;
                    break;
                }
            }
        }
    }
};
BST.prototype.preOrder = function (node) {
    if (node != null) {
        // console.log(node.show());
        this.preOrder(node.left);
        this.preOrder(node.right);
    }
};
BST.prototype.inOrder = function (node) {
    if (node != null) {
        this.inOrder(node.left);
        // console.log(node.show());
        this.inOrder(node.right);
    }
};
BST.prototype.postOrder = function (node) {
    if (node != null) {
        this.postOrder(node.left);
        this.postOrder(node.right);
        // console.log(node.show());
    }
};
//非递归遍历借助栈
BST.prototype.unRecurPreOrder = function (node) {
    var stack = [];
    var p = node;
    while (p != null || stack.length > 0) {
        while (p != null) {
            // console.log(p.data);
            stack.push(p);
            p = p.left;
        }
        if (stack.length > 0) {
            p = stack.pop();
            p = p.right;
        }
    }
};
BST.prototype.unRecurInOrder = function (node) {
    var stack = [];
    var p = node;
    while (p != null || stack.length > 0) {
        while (p != null) {
            stack.push(p);
            p = p.left;
        }
        if (stack.length > 0) {
            p = stack.pop();
            // console.log(p.data);
            p = p.right;
        }
    }
};
BST.prototype.unRecurPostOrder = function (node) {
    var stack = [];
    var cur;                      //当前结点
    var pre = null;                 //前一次访问的结点
    stack.push(node);
    while (stack.length > 0) {
        cur = stack[stack.length - 1];
        if (
            (cur.left == null && cur.right == null) ||
            (pre != null && (pre == cur.left || pre == cur.right))
        ) {
            // console.log(cur.data);  //如果当前结点没有孩子结点或者孩子节点都已被访问过
            stack.pop();
            pre = cur;
        }
        else {
            if (cur.right != null)
                stack.push(cur.right);
            if (cur.left != null)
                stack.push(cur.left);
        }
    }
};
//层次遍历借助队列
BST.prototype.levelOrder = function (node) {
    if (!node) {
        throw new Error('Empty Tree')
    }
    var que = [];
    que.push(node);
    while (que.length !== 0) {
        node = que[0];
        que.shift();
        console.log(node.data);
        if (node.left) que.push(node.left);
        if (node.right) que.push(node.right);
    }
};
BST.prototype.getMax = function () {
    var current = this.root;
    while (current != null) {
        current = current.right;
    }
    reutrn
    current.data;
};
BST.prototype.getMin = function () {
    var current = this.root;
    while (current != null) {
        current = current.left;
    }
    return current.data;
};
BST.prototype.isExist = function (value) {
    var current = this.root;
    while (current != null) {
        if (current.data == value) {
            return true;
        } else {
            if (value < current.data) {
                current = current.left;
            } else {
                current = current.right;
            }
        }
    }
    return false;
};
BST.prototype.invertTree = function (root) {
    if (root == null) {
        return null;
    }
    root.left = this.invertTree(root.left);
    root.right = this.invertTree(root.right);
    var tmp = root.left;
    root.left = root.right;
    root.right = tmp;
    return root;
};
/*
 *                               56
 *                    22                     81
 *             10            30        77            92
 * */

var tree = new BST();
tree.insert(56);
tree.insert(22);
tree.insert(81);
tree.insert(10);
tree.insert(30);
tree.insert(77);
tree.insert(92);
// tree.preOrder(tree.root);
// console.log('--');
// tree.unRecurPreOrder(tree.root);
// console.log('-------------');
// tree.inOrder(tree.root);
// console.log('--');
// tree.unRecurInOrder(tree.root);
// console.log('-------------');
// tree.postOrder(tree.root);
// console.log('--');
// tree.unRecurPostOrder(tree.root);
// console.log(tree.isExist(100));
// tree.invertTree(tree.root);
// tree.preOrder(tree.root);
// tree.levelOrder(tree.root);
