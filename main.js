const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const width = 1200;
const height = 1200;
ctx.width = width;
ctx.height = height;

class Tree {
    constructor(Rt, Lt, value) {
        this.Node = value;
        this.Righttree = Rt;
        this.Lefttree = Lt;
    }
}
class TreeCost {
    constructor(Rt, Lt, value, cost) {
        this.Node = value;
        this.Righttree = Rt;
        this.Lefttree = Lt;
        this.Cost = cost;
    }
}

function drawNode(x, y, r, text, ctx, node) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    if(node.active === true){
        ctx.fillStyle = 'green';
        ctx.fill();
    }
    ctx.font = "20px Arial";
    ctx.strokeText(text, x - 10, y);

    ctx.stroke();
}

function drawLine(fromx, fromy, tox, toy, ctx) {
    ctx.beginPath();
    ctx.moveTo(fromx, fromy);
    ctx.lineTo(tox, toy);
    ctx.closePath();
    ctx.stroke();
}

function drawTree(rootTree, xstep, ystep, distance) {

//draw node
    if (rootTree !== null) {
        drawNode(xstep, ystep, 20, rootTree.Node, ctx, rootTree);
    }
//draw left tree
    if (rootTree.Lefttree !== null) {
        drawLine(xstep, ystep + 20, xstep - distance, ystep + 100 - 20, ctx);
        drawTree(rootTree.Lefttree, xstep - distance, ystep + 100, distance / 2 + 20);
    }
// draw right tree
    if (rootTree.Righttree !== null) {
        drawLine(xstep, ystep + 20, xstep + distance, ystep + 100 - 20, ctx);
        drawTree(rootTree.Righttree, xstep + distance, ystep + 100, distance / 2 + 20);
    }
}

tree10 = new Tree(null, null, 16);
tree11 = new Tree(null, null, 11);
tree12 = new Tree(tree11, tree10, 12);
tree17 = new Tree(null, null, 17);
tree19 = new Tree(null, null, 19);
tree18 = new Tree(tree19, tree17, 18);
tree15 = new Tree(tree18,tree12, 15);

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// 1. Breadth first search
async function bfs(node, s)
{
    let q = []
    q.unshift(node);
    while (q.length !== 0) {
        let t = q.shift();
        console.log(t);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        t.active = true;
        drawTree(tree15, 300, 100, 100);
        await  sleep(1000);
        if(t.Node === s) {
            alert("Nod gasit");
            console.log("Nodul s-a gasit");
            return;
        }
        t.active = false
        if(t.Lefttree) {
            q.push(t.Lefttree);
        }
        if(t.Righttree) {
            q.push(t.Righttree);
        }
    }
    console.log("Nodul nu s-a gasit");
    alert("Nodul nu s-a gasit");
}
//bfs(tree15,20)

// 2. Depth first search
async function dfs(node, s)
{
    let q = []
    q.unshift(node);
    while (q.length !== 0) {
        let t = q.shift();
        console.log(t);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        t.active = true;
        drawTree(tree15, 300, 100, 100);
        await  sleep(1000);
        if(t.Node === s) {
            alert("Nod gasit");
            console.log("Nodul s-a gasit");
            return;
        }
        t.active = false
        if(t.Lefttree) {
            q.unshift(t.Righttree);
        }
        if(t.Righttree) {
            q.unshift(t.Lefttree);
        }
    }
    console.log("Nodul nu s-a gasit");
    alert("Nodul nu s-a gasit");
}
//dfs(tree15,19);

// 3. Depth limited search
async function rdls(node, s, depth, limit)
{

    if(!node || depth > limit)
        return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    node.active = true;
    drawTree(tree15, 300, 100, 100);
    await  sleep(1000);
    node.active = false;
    //console.log(depth);
    if(node.Node === s){
        console.log("Nodul s-a gasit");
        alert("Nodul s-a gasit");
        return;
    }
    if(node.Lefttree)
        await rdls(node.Lefttree, s, depth+1, limit)
    if(node.Righttree)
        await rdls(node.Righttree, s, depth+1, limit)
}
//rdls(tree15, 18, 0 , 2)

// 4. Iterative deepening search
async  function ids(node, s){
    for(let i=0;i<=2;i++){
        await rdls(node, s, 0, i)

    }
}
//ids(tree15,18)

// 5. Uniform cost search
// 6. Greedy best search
// 7. A* Search
