import { useState, useMemo } from "react";
import {
  recalculateTotals,
  updateNode,
  distributeToLeaves,
  buildOriginalMap
} from "../utils/hierarchyUtils";

/**
 * Custom hook for managing hierarchical data with allocation capabilities
 * @param {Array} initialData - The initial hierarchical data structure to manage
 * @returns {Object} An object containing:
 *   @returns {Array} rows - The current state of hierarchical rows
 *   @returns {Function} allocatePercent - Function to allocate a percentage increase to a node's value
 *   @returns {Function} allocateValue - Function to allocate a specific value to a node
 *   @returns {Map} originalMap - A map of original values built from initialData
 * 
 * @example
 * const { rows, allocatePercent, allocateValue, originalMap } = useHierarchy(initialData);
 * allocatePercent(nodeId, 10); // Increase node value by 10%
 * allocateValue(nodeId, 500); // Set node value to 500
 */


export const useHierarchy = (initialData) => {
  const [rows, setRows] = useState(initialData);

  // Build original values map only once
  const originalMap = useMemo(
    () => buildOriginalMap(initialData),
    [initialData]
  );

  const allocatePercent = (id, percent) => {
    const updated = updateNode(rows, id, (node) => {
      const newValue = node.value + (node.value * percent) / 100;

      if (node.children) {
        return distributeToLeaves(node, newValue);
      }

      return { ...node, value: newValue };
    });

    setRows(updated.map(recalculateTotals));
  };

  const allocateValue = (id, value) => {
    const updated = updateNode(rows, id, (node) => {
      if (node.children) {
        return distributeToLeaves(node, value);
      }

      return { ...node, value };
    });

    setRows(updated.map(recalculateTotals));
  };

  return {
    rows,
    allocatePercent,
    allocateValue,
    originalMap
  };
};
