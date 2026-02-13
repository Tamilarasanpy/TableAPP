const round = (num) => Number(num.toFixed(2));

export const buildOriginalMap = (nodes, map = {}) => {
  nodes.forEach((node) => {
    map[node.id] = node.value;
    if (node.children) {
      buildOriginalMap(node.children, map);
    }
  });
  return map;
};

export const calculateVariance = (value, originalValue) => {
  if (!originalValue) return 0;
  return round(((value - originalValue) / originalValue) * 100);
};

export const recalculateTotals = (node) => {
  if (!node.children) return node;

  node.children = node.children.map(recalculateTotals);

  const subtotal = node.children.reduce(
    (sum, child) => sum + child.value,
    0
  );

  node.value = round(subtotal);
  return node;
};

export const calculateGrandTotal = (tree) =>
  round(tree.reduce((sum, row) => sum + row.value, 0));

export const distributeToLeaves = (node, newValue) => {
  if (!node.children) {
    node.value = round(newValue);
    return node;
  }

  const total = node.children.reduce(
    (sum, child) => sum + child.value,
    0
  );

  node.children = node.children.map((child) => {
    const ratio = total === 0 ? 0 : child.value / total;
    return distributeToLeaves(child, newValue * ratio);
  });

  node.value = round(newValue);
  return node;
};

export const updateNode = (nodes, id, updater) =>
  nodes.map((node) => {
    if (node.id === id) {
      return updater({ ...node });
    }

    if (node.children) {
      return {
        ...node,
        children: updateNode(node.children, id, updater)
      };
    }

    return node;
  });
