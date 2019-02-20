/*
* 1.二叉树的下一个节点
* 2.对称的二叉树
* 3.重建二叉树
* 4.把二叉树打印成多行
*
* */

function Print(pRoot) {
   var result = [];
   if(pRoot==null){
       return result;
   }
   // var stao
}

var root = {
    val: 1,
    left: {
        val: 2,
        left: {
            val: 4,
            left: null,
            right: null
        },
        right: {
            val: 5,
            left: null,
            right: null
        }
    },
    right: {
        val: 3,
        left: {
            val: 6,
            left: null,
            right: null
        },
        right: {
            val: 7,
            left: null,
            right: null
        }
    }
};

console.log(Print(root));