/**
 * Created by Administrator on 2019/2/18 0018.
 */

/*
 * 数组转化为链表
 * */

function Node(value, next) {
    this.value = value;
    this.next = next;
}

function arrayToLink(arr) {
    var head = new Node('head', null);
    if (Array.isArray(arr)) {
        var p = head;
        for (var i = 0; i < arr.length; i++) {
            var current = new Node(arr[i], null);
            p.next = current;
            p = p.next;
        }
    }
    return head;
}

function printLink(link) {
    var p = link;
    p = p.next;
    while (p) {
        console.log(p.value);
        p = p.next;
    }
}

/*var link = arrayToLink([]);
 console.log(JSON.stringify(link));
 printLink(link);*/

/*
 * 比较2棵树是否相同
 * */
function TreeNode(value, children) {
    this.value = value;
    this.children = children;
}

function Tree() {
    this.root = null;
}

Tree.prototype.insert = function () {

};

var isEqualTree = function (tree1, tree2) {
    if (tree1.value == tree2.value && !tree1.children && !tree2.children) {
        return true;
    }
    if ((!tree1 && tree2) || (tree1 && !tree2) ||
        (!tree1.children && tree2.children) || (tree1.children && !tree2.children)) {
        return false;
    }
    if (tree1.value !== tree2.value || tree1.children.length != tree2.children.length) {
        return false;
    }
    for (var i = 0; i < tree1.children.length; i++) {
        if(!isEqualTree(tree1.children[i], tree2.children[i])){
            return false;
        }
    }
    return true;
}

var tree1={value:1,children:[{value:2,children:null},{value:3,children:[{value:4,children:null}]}]};
var tree2={value:1,children:[{value:2,children:null},{value:8,children:[{value:4,children:null}]}]};
console.log(isEqualTree(tree1,tree2));