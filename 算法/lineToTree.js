function lineToTree(datas, key) {
    let result = [];
    let tree = {};
    let parent_id;
    let root = null;
    let id = key ? key : 'id';
    datas.forEach((item, i) => {
        tree[item[id]] = item;
    });
    datas.forEach((item, i) => {
        let obj = item;
        if (!obj.parent) {
            root = tree[obj[id]]
        } else {
            parent_id = obj.parent;
            if (!tree[parent_id]['children']) {
                if (tree[parent_id]) {
                    tree[parent_id].children = [];
                }
            }
            tree[parent_id] && tree[parent_id].children.push(tree[obj[id]])
        }
        if (root && result.indexOf(root) < 0) {
            result.push(root);
        }
    });
    return result;
};

var line = [
    {
        id: 1,
        value: '111',
        parent: null
    },
    {
        id: 2,
        value: '222',
        parent: null
    }, {
        id: 3,
        value: '333',
        parent: 1
    },
    {
        id: 4,
        value: '444',
        parent: 2
    }
];

var tree = lineToTree(line);
console.log(JSON.stringify(tree));
