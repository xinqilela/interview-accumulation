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