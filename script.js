function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}

function deserialize(arr) {
  if (!arr || arr.length === 0) return null;
  const root = new TreeNode(arr[0]);
  const queue = [root];
  let i = 1;
  while (queue.length > 0 && i < arr.length) {
    const current = queue.shift();
    if (arr[i] !== null) {
      current.left = new TreeNode(arr[i]);
      queue.push(current.left);
    }
    i++;
    if (i < arr.length && arr[i] !== null) {
      current.right = new TreeNode(arr[i]);
      queue.push(current.right);
    }
    i++;
  }
  return root;
}

function isSubtree(root, subRoot) {
  if (subRoot === null) return true;
  if (root === null) return false;

  if (isSameTree(root, subRoot)) {
    return true;
  }

  return isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot);
}

function isSameTree(root, subRoot) {
  if (root === null && subRoot === null) {
    return true;
  }

  if ((root && subRoot === null) || (root === null && subRoot)) {
    return false;
  }

  if (root.val !== subRoot.val) {
    return false;
  }
  return (
    isSameTree(root.left, subRoot.left) && isSameTree(root.right, subRoot.right)
  );
}

document.getElementById("submit").addEventListener("click", function() {
  const rootString = document.getElementById("rootInput").value.trim();
  const subRootString = document.getElementById("subrootinput").value.trim();

  const rootArr = rootString.split(",").map(val => parseInt(val));
  const subRootArr = subRootString.split(",").map(val => parseInt(val));

  const root = deserialize(rootArr);
  const subRoot = deserialize(subRootArr);

  const outputDiv = document.getElementById("output");

  if (!root || !subRoot) {
    outputDiv.textContent = "false";
  } else {
    const result = isSubtree(root, subRoot);
    outputDiv.textContent = result ? "true" : "false";
  }
});
