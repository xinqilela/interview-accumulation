/**
 * Created by Administrator on 2019/2/18 0018.
 */
function searchTarget(array, target) {
    var rows = array.length;
    var cols = array[0].length;
    var i = rows - 1;
    var j = 0;
    while (i >= 0 && j < cols) {
        if (target == array[i][j]) {
            return true;
        } else if (target < array[i][j]) {
            i--;
        } else {
            j++;
        }
    }
    return false;
}
// console.log(searchTarget([[2, 4, 6], [4, 6, 8], [6, 8, 10]], 0));