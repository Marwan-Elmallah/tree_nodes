class Node {
    constructor(name, parent = null) {
        this.name = name;
        this.parent = parent;
        this.left = null;
        this.right = null;
        this.isActive = false;
        this.LeftCount = 0;
        this.RightCount = 0;
        this.points = 0;
    }
}

const buildTree = (name, root, plan) => {
    // Implementation for building the tree
    if (!root) {
        root = new Node(name + "1");
    }
    newNode2 = new Node(root, name + "2");
    root.left = newNode2;
    newNode3 = new Node(root, name + "3");
    root.right = newNode3;
    newNode4 = new Node(newNode2, name + "4");
    newNode2.left = newNode4;
    newNode5 = new Node(newNode2, name + "5");
    newNode2.right = newNode5;
    newNode6 = new Node(newNode3, name + "6");
    newNode3.left = newNode6;
    newNode7 = new Node(newNode3, name + "7");
    newNode3.right = newNode7;

    switch (plan) {
        case "Single":
            root.isActive = true;
            break;
        case "Triple":
            root.isActive = true;
            newNode2.isActive = true;
            newNode3.isActive = true;
            break;
        case "VIP":
            root.isActive = true;
            newNode2.isActive = true;
            newNode3.isActive = true;
            newNode4.isActive = true;
            newNode5.isActive = true;
            newNode6.isActive = true;
            newNode7.isActive = true;
        default:
            break;
    }
    CalculateNodes(root);

    return { root, newNode2, newNode3, newNode4, newNode5, newNode6, newNode7 };
};


const printTree = (node) => {
    if (!node) return;
    console.log(`Node: ${node.name}, Active: ${node.isActive}, LeftCount: ${node.LeftCount}, RightCount: ${node.RightCount}, Points: ${node.points}`);
    printTree(node.left);
    printTree(node.right);
};

const CalculateNodes = (node) => {
    if (!node) return { left: 0, right: 0, total: 0 };

    // Recursively calculate counts for left and right subtrees
    const left = CalculateNodes(node.left);
    const right = CalculateNodes(node.right);

    // Update this node's counts with total active nodes in each subtree
    node.LeftCount = left.total;
    node.RightCount = right.total;

    // Calculate points for this node
    node.points = 0;
    if (node.isActive) {
        node.points = 1; // Base point for being active

        // Bonus points for balanced active nodes
        if (node.LeftCount === node.RightCount && node.LeftCount > 0) {
            node.points += 1; // Additional point for balance
        }
    }

    // Calculate total active nodes including this node
    const currentNodeCount = node.isActive ? 1 : 0;
    const totalActive = left.total + right.total + currentNodeCount;

    return {
        left: left.total,
        right: right.total,
        total: totalActive
    };
};

// Example usage:
const tree = buildTree("Root", null, "VIP");

// printTree(tree.root);

// const tree2 = buildTree("Root2", tree.newNode7, "Triple");

// Update counts for the original tree after adding the new tree
CalculateNodes(tree.root);

printTree(tree.root);
// printTree(tree2.root);
