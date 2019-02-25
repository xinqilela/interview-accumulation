/*
* 1.二叉树的下一个节点        √
* 2.对称的二叉树              √
* 3.重建二叉树                √
* 4.把二叉树打印成多行        √
* 5.按之字形打印二叉树        √
* 6.序列化二叉树              √
*       序列化指的是遍历二叉树为字符串；所谓反序列化指的是依据字符串重新构造成二叉树。
    依据前序遍历序列来序列化二叉树，因为前序遍历序列是从根结点开始的。当在遍历二叉树时碰到Null指针时，
    这些Null指针被序列化为一个特殊的字符“#”。另外，结点之间的数值用逗号隔开。
* 7.二叉搜索树的第k个节点     √
* 8.数据流中的中位数          √
* 9.树的子结构                √
* 10.二叉搜索树的后序遍历序列  √
* 11.二叉树中和为某一值的路径  √
* 12.二叉搜索树与双向链表      √
* 12.二叉搜索树与双向链表      √
* 13.二叉树的深度              √
* 14.平衡二叉树                √
*        它是一棵空树或它的左右两个子树的高度差的绝对值不超过1，并且左右两个子树都是一棵平衡二叉树。
* */

/* function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
} */
function TreeNode(val) {
    this.val = val;
    this.left=null;
    this.right=null;
}
var arr =[];

function Serialize(pRoot)
{
    if(pRoot==null){
        arr.push('#');
        return;
    }
    arr.push(pRoot.val);
    Serialize(pRoot.left);
    Serialize(pRoot.right);
    return arr.join(',');
}
function Deserialize(s)
{
    if(!s||s.length<=0){
        return null;
    }
    var rootVal = s.shift();
    var root = null;
    if(typeof rootVal=='number'){
        root = new TreeNode(rootVal);
        root.left = Deserialize(s);
        root.right = Deserialize(s);
    }
    return root;
}
var tree = Deserialize([1,2,'#','#',3,'#','#']);
console.log(Serialize(tree));